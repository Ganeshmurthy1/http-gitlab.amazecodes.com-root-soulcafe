<?php

$app->get('/get_UserMatch', 'getUserMatch');
$app->get('/get_Buddies', 'getBuddies');
$app->get('/get_ForumUpdates', 'getForumUpdates');
$app->get('/get_forumsOther/:id', 'getforumsOther');
$app->post('/add_GTKYRequest', 'addGTKYRequest');
$app->get('/check_GTKYRequest/:id', 'checkGTKYRequest');
$app->post('/add_AbuseUser', 'addAbuseUser');
$app->get('/check_AbuseUser/:id', 'checkAbuseUser');
$app->get('/get_UserSendedGTKY', 'getUserSendedGTKY');
$app->get('/accept_GTKY/:id', 'acceptGTKY');
$app->get('/reject_GTKY/:id', 'rejectGTKY');
$app->get('/get_Buddies_All', 'getBuddiesAll');

$app->get('/get_home_data', 'getHomeData');

function getUserMatch() {
 
  // print_r( $user );
  $user_id  = getUserId();
   
  $sql = "select * from users where user_id != :user_id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("user_id",  $user_id );
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
     $db = null;
      echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
}

function getForumUpdates() {
 
  // print_r( $user );
  $user_id  = getUserId();
   
  $sql = "SELECT dbu.DiscussionBoardId,dbu.UserId,db.Topic,dbt.DiscussionTopicId,dbt.TopicTitle,dbt.CreatedDate,u.first_name,u.last_name,db.Image FROM DiscussionBoardUsers as dbu inner join DiscussionBoard as db on dbu.DiscussionBoardId = db.DiscussionBoardId inner join DiscussionBoardTopic as dbt on db.DiscussionBoardId=dbt.DiscussionBoardId inner join users as u on dbu.UserId=u.user_id WHERE dbu.UserId=:user_id order by dbt.CreatedDate desc limit 0,10";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id",  $user_id );  
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
     $db = null;
      echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
}


function getBuddies() {
 
  // print_r( $user );
  $user_id  = getUserId();
   
  $sql = "SELECT u.first_name, u.last_name, u.Picture, u.Moto,b.BuddyId FROM `Buddies` as b inner join users as u on b.BuddyId = u.user_id  WHERE b.SenderId = :user_id and b.Status = 1 Limit 0, 10";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("user_id",  $user_id );
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    // $db = null;
      // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
  
  $sqlcount = "SELECT count(1) as total_friends FROM `Buddies` as b inner join users as u on b.BuddyId = u.user_id  WHERE b.SenderId = :user_id and b.Status = 1";
  try {
   // $db = getConnection();
    $stmtCount = $db->prepare($sqlcount);
    $stmtCount->bindParam("user_id",  $user_id );
    $stmtCount->execute();
    $wineCount = $stmtCount->fetchObject();
   // $db = null;
    // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

  $sqlForums = "SELECT db.Topic,dbu.DiscussionBoardId FROM `DiscussionBoardUsers` as dbu inner join DiscussionBoard as db ON dbu.DiscussionBoardId = db.DiscussionBoardId WHERE dbu.UserId = :user_id";
  try {
    $dbForums = getConnection();
    $stmtForums = $dbForums->prepare($sqlForums);  
    $stmtForums->bindParam("user_id",  $user_id );
    $stmtForums->execute();
    $wineForums = $stmtForums->fetchAll(PDO::FETCH_OBJ);
     $db = null;
      // echo json_encode($wineForums);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

   $sqlInterest = "SELECT qa.*,qo.Answer FROM QuestionnaireAnswer as qa inner join QuestionnaireOptions as qo on qa.OptionId=qo.QoId WHERE qa.QId = 57 and qa.UserId =:user_id";
  try {
    $dbInterest = getConnection();
    $stmtInterest = $dbInterest->prepare($sqlInterest);  
    $stmtInterest->bindParam("user_id",  $user_id );
    $stmtInterest->execute();
    $wineInterest = $stmtInterest->fetchAll(PDO::FETCH_OBJ);
     $db = null;
      // echo json_encode($wineForums);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

  $user['friends']=$wine;
  $user['forum']=$wineForums;
  $user['frineds_count']=$wineCount->total_friends;
  $user['Interest']=$wineInterest;
  echo json_encode($user);

}

function getBuddiesAll() {
 
  // print_r( $user );
  $user_id  = getUserId();
   
  $sql = "SELECT u.*,b.BuddyId FROM `Buddies` as b inner join users as u on b.BuddyId = u.user_id  WHERE b.SenderId = :user_id and b.Status = 1";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("user_id",  $user_id );
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

}
function getforumsOther($id) {
 
  // print_r( $user );
  // $user_id  = getUserId();
   
  $sqlForums = "SELECT db.*,dbu.DiscussionBoardId FROM `DiscussionBoardUsers` as dbu inner join DiscussionBoard as db ON dbu.DiscussionBoardId = db.DiscussionBoardId WHERE dbu.UserId = :id";
  try {
    $dbForums = getConnection();
    $stmtForums = $dbForums->prepare($sqlForums);  
    $stmtForums->bindParam("id",  $id );
    $stmtForums->execute();
    $wineForums = $stmtForums->fetchAll(PDO::FETCH_OBJ);
     $db = null;
    echo json_encode($wineForums);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

}

function addGTKYRequest() {
  $request = Slim::getInstance()->request();
  $user = json_decode($request->getBody());
  $user_id  = getUserId();

  $sqlU = "Select first_name,last_name from users where user_id = :user_id";
    try{
      $db = getConnection();
    $stmtU = $db->prepare($sqlU);  
    $stmtU->bindParam("user_id", $user_id);
    $stmtU->execute();
    $wineU = $stmtU->fetchAll(PDO::FETCH_OBJ);
     $db = null;
     // print_r ($wineU[0]->first_name);
     $fname = $wineU[0]->first_name;
     $lname = $wineU[0]->last_name;
      // echo json_encode($wineU);
    }catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}'; 
     }

    $sqlB = "Select * from Buddies where SenderId=:senderId and BuddyId=:buddyId";
    try{
      $db = getConnection();
    $stmtB = $db->prepare($sqlB);  
    $stmtB->bindParam("senderId", $user_id);
    $stmtB->bindParam("buddyId", $user->id);
    $stmtB->execute();
    $wineB = $stmtB->fetchObject();
    $db = null;
      // echo json_encode($wineU);
    }catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}'; 
     }  

     // print_r($wineBA);

  if($wineB != false) {
    echo 'Already Present';
    exit();
  }else{
   $message =  'Friend request from ' . $fname . ' ' . $lname . 'is waiting for your approval.';
   $cmtDateTime=  date("Y-m-d") ;
   $status  = 0;
  $link = 'accept-gtky';
  $sql = "Insert into Buddies (SenderId,BuddyId,Status,AddedDate) values (:SenderId,:BuddyId,:Status,:AddedDate)";
  $sqlSN = "Insert into SystemNotification (userId,Message,ViewStatus,AddedDate,Link) values (:userId,:Message,:ViewStatus,:AddedDate,:Link)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("SenderId", $user_id);
    $stmt->bindParam("BuddyId", $user->id);
    $stmt->bindParam("Status", $status);
    $stmt->bindParam("AddedDate", $cmtDateTime);
    $stmt->execute();

    $stmtSN = $db->prepare($sqlSN);  
    $stmtSN->bindParam("userId", $user->id);
    $stmtSN->bindParam("Message", $message);
    $stmtSN->bindParam("ViewStatus", $status);
    $stmtSN->bindParam("AddedDate", $cmtDateTime);
    $stmtSN->bindParam("Link", $link);
    $stmtSN->execute();


    echo 'true';
    //$app->redirect('login.html');
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
  }
 }

function checkGTKYRequest($id) {
   $user_id  = getUserId();
   
   $sql= "select * from Buddies where SenderId=:senderId and BuddyId = :buddyId and  Status=1";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("buddyId",  $id );
    $stmt->bindParam("senderId", $user_id);
    $stmt->execute();
    $wine = $stmt->fetchObject();
     $db = null;

     if ($wine != false) {
        echo 'Send Message';
        exit();
     }else{
      $sqlGS= "select * from Buddies where SenderId=:senderId and BuddyId = :buddyId and  Status=0";
      try {
        $db = getConnection();
        $stmtGS = $db->prepare($sqlGS);  
        $stmtGS->bindParam("buddyId",  $id );
        $stmtGS->bindParam("senderId", $user_id);
        $stmtGS->execute();
        $wineGS = $stmtGS->fetchObject();
         $db = null;

         if ($wineGS != false) {
           echo 'GTKY Send';
           exit();
         }else {
          $sqlAS= "select * from Buddies where SenderId=:buddyId and BuddyId = :senderId and  Status=0";
      try {
        $db = getConnection();
        $stmtAS = $db->prepare($sqlAS);  
        $stmtAS->bindParam("buddyId",  $id );
        $stmtAS->bindParam("senderId", $user_id);
        $stmtAS->execute();
        $wineAS = $stmtAS->fetchObject();
         $db = null;

         if ($wineAS != false) {
           echo 'Accept GTKY';
           exit();
         }else{
          echo 'Say Hello';
         }

         } catch(PDOException $e) {
          echo '{"error":{"text":'. $e->getMessage() .'}}'; 
        }

         }

      } catch(PDOException $e) {
          echo '{"error":{"text":'. $e->getMessage() .'}}'; 
        }
      }

} catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

  

}

function addAbuseUser() {
  $request = Slim::getInstance()->request();
  $user = json_decode($request->getBody());
  $user_id  = getUserId();

  
   $cmtDateTime=  date("Y-m-d") ;
   $status  = 0;
  
  $sql = "Insert into ReportAbuseUser (SenderId,UserId,Message,AddedDate) values (:SenderId,:UserId,:Message,:AddedDate)";
  
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("SenderId", $user_id);
    $stmt->bindParam("UserId", $user->id);
    $stmt->bindParam("Message", $user->message);
    $stmt->bindParam("AddedDate", $cmtDateTime);
    $stmt->execute();


    echo 'true';
    //$app->redirect('login.html');
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
 }


function checkAbuseUser($id) {
   $user_id  = getUserId();
   
  $sql = "select * from ReportAbuseUser where UserId = :id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("id",  $id );
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
     $db = null;

     if($wine == null){
     echo '1';
     }else{
      echo '0';
     }
      // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

}

function getUserSendedGTKY() {
   $user_id  = getUserId();
   
  $sql = "SELECT b.SenderId,u.first_name,u.last_name from Buddies as b inner join users as u on b.SenderId=u.user_id where SenderId Not IN(select user_id from users where user_id=:user_id) and b.Status = 0";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("user_id",$user_id );
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
     $db = null;

   echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

}

function acceptGTKY($id) {
    $user_id  = getUserId();
    $cmtDateTime=  date("Y-m-d") ;
   $status = 1;
  $sql = " update Buddies SET Status = 1 where SenderId =:id";
  $sql1 = "Insert into Buddies (SenderId,BuddyId,Status,AddedDate) values (:buddyid,:senderid,:status,:AddedDate)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt1 = $db->prepare($sql1);    
    $stmt->bindParam("id", $id);
    $stmt1->bindParam("senderid", $id);
    $stmt1->bindParam("buddyid", $user_id);
    $stmt1->bindParam("status", $status);
    $stmt1->bindParam("AddedDate", $cmtDateTime);

    $stmt->execute();
    $stmt1->execute();
    echo 'true';
      // echo json_encode($wine);
  }catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

}

function rejectGTKY($id) {
   $user_id  = getUserId();
   
  $sql = "delete from Buddies where SenderId =:id and Status=0";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("id",  $id );
    $stmt->execute();
    echo 'true';
      // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

}

function getHomeData() {
  $user_id  = getUserId();
  $sql = "SELECT s.SoulId,u.Picture,u.first_name,u.last_name, u.birthdate FROM SoulMatches as s inner join users as u on s.SoulId=u.user_id WHERE s.UserId=:userId";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("userId", $user_id);
    $stmt->execute();
    $wineMatches = $stmt->fetchAll(PDO::FETCH_OBJ);
    //$db = null;
    
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  
  $sqlDiss = "SELECT db.Topic,dbt.DiscussionTopicId,dbt.TopicTitle,dbt.CreatedDate,u.first_name,u.last_name,db.Image FROM DiscussionBoardUsers as dbu inner join DiscussionBoard as db on dbu.DiscussionBoardId = db.DiscussionBoardId inner join DiscussionBoardTopic as dbt on db.DiscussionBoardId=dbt.DiscussionBoardId inner join users as u on dbu.UserId=u.user_id WHERE dbu.UserId=:user_id order by dbt.CreatedDate desc limit 0,10";
  try {
    //$db = getConnection();
    $stmtDiss = $db->prepare($sqlDiss);
    $stmtDiss->bindParam("user_id",  $user_id );
    $stmtDiss->execute();
    $wineDiss = $stmtDiss->fetchAll(PDO::FETCH_OBJ);
    $db = null;
   // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  
  $result['matches'] = $wineMatches;
  $result['forum'] = $wineDiss;
  echo json_encode($result);
  
}
