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
$app->get('/get_MyProfileDetails', 'getMyProfileDetails');
$app->get('/get_CommentLike/:id', 'getCommentLike');

$app->get('/get_MyLifeValues/:id', 'getMyLifeValues');

$app->post('/send_Feeling/:id', 'sendFeeling');
$app->get('/get_Feelings', 'getFeelings');
$app->post('/not_SureFeelings/:id', 'notSureFeelings');
$app->post('/not_YetFeelings/:id', 'notYetFeelings');
$app->post('/need_TimeFeelings/:id', 'needTimeFeelings');
$app->post('/accept_Feeling/:id', 'acceptFeeling');
$app->get('/history_Feeling', 'historyFeeling');

$app->get('/check_feelings_status/:id', 'checkFeeling');
$app->get('/get_Member/:id', 'getMember');
$app->get('/update_Login', 'updateLogin');
$app->get('/get_Likes', 'getLikes');
$app->post('/insert_Likes', 'insertLikes');


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
  //$j = $k/0;
  $user_id  = getUserId();
   
  $sql = "SELECT u.first_name, u.last_name, u.Picture, u.Moto,b.BuddyId FROM `Buddies` as b inner join users as u on b.BuddyId = u.user_id  WHERE b.SenderId = :user_id and b.Status = 1 and u.status = 1 Limit 0, 10";
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
  
  $sqlcount = "SELECT count(1) as total_friends FROM `Buddies` as b inner join users as u on b.BuddyId = u.user_id  WHERE b.SenderId = :user_id and b.Status = 1 and u.status=1";
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

  $sqlForums = "SELECT db.Topic,dbu.DiscussionBoardId FROM `DiscussionBoardUsers` as dbu inner join DiscussionBoard as db ON dbu.DiscussionBoardId = db.DiscussionBoardId WHERE dbu.UserId = :user_id and db.Status = 1 Limit 0, 10";
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
  
  $sqlForums = "SELECT count(1) as total_forum FROM `DiscussionBoardUsers` as dbu inner join DiscussionBoard as db ON dbu.DiscussionBoardId = db.DiscussionBoardId WHERE dbu.UserId = :user_id and db.Status = 1 Limit 0, 10";
  try {
    $dbForums = getConnection();
    $stmtForums = $dbForums->prepare($sqlForums);
    $stmtForums->bindParam("user_id",  $user_id );
    $stmtForums->execute();
    $wineForumscnt = $stmtForums->fetchObject();
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
  $user['forum_count']=$wineForumscnt->total_forum;
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
   
  $sqlForums = "SELECT db.*,dbu.DiscussionBoardId FROM `DiscussionBoardUsers` as dbu inner join DiscussionBoard as db ON dbu.DiscussionBoardId = db.DiscussionBoardId WHERE dbu.UserId = :id Limit 0,10";
  try {
    $db = getConnection();
    $stmtForums = $db->prepare($sqlForums);  
    $stmtForums->bindParam("id",  $id );
    $stmtForums->execute();
    $wineForums = $stmtForums->fetchAll(PDO::FETCH_OBJ);
    
    // echo json_encode($wineForums);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
  
  $sqlForums = "SELECT count(1) as totalForum FROM `DiscussionBoardUsers` as dbu inner join DiscussionBoard as db ON dbu.DiscussionBoardId = db.DiscussionBoardId WHERE dbu.UserId = :id";
  try {
    //$db = getConnection();
    $stmtForums = $db->prepare($sqlForums);
    $stmtForums->bindParam("id",  $id );
    $stmtForums->execute();
    $wineForumsTotal = $stmtForums->fetchObject();
  
    // echo json_encode($wineForums);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

  $sqlInt = "SELECT qa.*,qo.Answer FROM QuestionnaireAnswer as qa inner join QuestionnaireOptions as qo on qa.OptionId=qo.QoId WHERE qa.QId = 57 and qa.UserId =:user_id";
  try {
    
    $stmtInt = $db->prepare($sqlInt);  
    $stmtInt->bindParam("user_id",  $id );
    $stmtInt->execute();
    $wineInt = $stmtInt->fetchAll(PDO::FETCH_OBJ);
     $db = null;
    // echo json_encode($wineInt);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

  $sql = "select u.user_id,u.birthdate,u.Moto,u.Picture,u.first_name,u.last_name,u.location,pd.CurrentEmployment FROM users as u left join ProfessionalDetails as pd on u.user_id = pd.UserId where user_id = :id ORDER BY user_id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;
    // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

  $other['forums'] = $wineForums;
  $other['forums_total'] = $wineForumsTotal->totalForum;
  $other['intrst'] = $wineInt;
  $other['userdata'] = $wine;
  echo json_encode($other);
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
  }else{
   $message =  'Friend request from ' . $fname . ' ' . $lname . ' is waiting for your approval.';
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
   
  $sql = "SELECT b.SenderId,u.first_name,u.last_name from Buddies as b inner join users as u on b.SenderId=u.user_id where SenderId Not IN(select user_id from users where user_id=:user_id) and b.Status = 0 Order by b.AddedDate desc";
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
  $sql = " update Buddies SET Status = 1 where SenderId =:id and BuddyId = :user_id";
  $sql1 = "Insert into Buddies (SenderId,BuddyId,Status,AddedDate) values (:buddyid,:senderid,:status,:AddedDate)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt1 = $db->prepare($sql1);    
    $stmt->bindParam("id", $id);
    $stmt->bindParam("user_id", $user_id);
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
  $sql = "SELECT s.SoulId,u.Picture,u.first_name,u.last_name, u.birthdate FROM SoulMatches as s inner join users as u on s.SoulId=u.user_id WHERE s.UserId=:userId and u.status = 1 ORDER BY s.ScorePercentage DESC, s.MatchType, u.DateJoined DESC LIMIT 0, 20";
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
  
  $sqlDiss = "SELECT db.Topic,dbt.DiscussionTopicId,dbt.TopicTitle,dbt.CreatedDate,u.first_name,u.last_name,db.Image FROM DiscussionBoardUsers as dbu inner join DiscussionBoard as db on dbu.DiscussionBoardId = db.DiscussionBoardId inner join DiscussionBoardTopic as dbt on db.DiscussionBoardId=dbt.DiscussionBoardId inner join users as u on dbu.UserId=u.user_id WHERE dbu.UserId=:user_id and db.Status = 1 order by dbt.CreatedDate desc limit 0,10";
  try {
    //$db = getConnection();
    $stmtDiss = $db->prepare($sqlDiss);
    $stmtDiss->bindParam("user_id",  $user_id );
    $stmtDiss->execute();
    $wineDiss = $stmtDiss->fetchAll(PDO::FETCH_OBJ);
      
   // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

  $sqlWelCme = "SELECT LoginCount from users where user_id = :user_id";
  try {
    //$db = getConnection();
    $stmtWelCme = $db->prepare($sqlWelCme);
    $stmtWelCme->bindParam("user_id",  $user_id );
    $stmtWelCme->execute();
    $wineWelCme = $stmtWelCme->fetchAll(PDO::FETCH_OBJ);
    $db = null;
   // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  
  $result['matches'] = $wineMatches;
  $result['forum'] = $wineDiss;
  $result['login'] = $wineWelCme;
  echo json_encode($result);
  
}

function getMyProfileDetails() {
   $user_id  = getUserId();
   
  $sql = "SELECT qa.OptionId,qo.Answer FROM QuestionnaireAnswer as qa inner join QuestionnaireOptions as qo on qa.OptionId=qo.QoId WHERE qa.QId = 55 and qa.UserId =:user_id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("user_id", $user_id);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
     
   // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

   $sqlOW = "SELECT OwnWords from users  WHERE user_id =:user_id";
  try {
    
    $stmtOW = $db->prepare($sqlOW);  
    $stmtOW->bindParam("user_id", $user_id);
    $stmtOW->execute();
    $wineOW = $stmtOW->fetchObject();
     $db = null;
   // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

  $sqlL = "Select * from Likes where UserId = :user_id";
  try {
    $db = getConnection();
    $stmtL = $db->prepare($sqlL);  
    $stmtL->bindParam("user_id", $user_id );
    $stmtL->execute();
    $wineL = $stmtL->fetchObject();
    $db = null;

    if($wineL != null){
      $wineL->Text = unserialize($wineL->Text);
      $data['values'] = $wine;
      $data['ownwords'] = $wineOW;
      $data['likes'] = $wineL;
      echo json_encode($data);
       // echo json_encode($wineL);
    } else{
     $data['values'] = $wine;
      $data['ownwords'] = $wineOW;
      $data['likes'] = $wineL;
      echo json_encode($data);
    }
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }


}

function getCommentLike($id) {
   // $user_id  = getUserId();
   
  $sql = "SELECT dbl.*,u.first_name,u.last_name,u.Picture FROM DiscussionBorardLikes as dbl inner join users as u on dbl.UserId = u.user_id  WHERE CommentId = :id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("id",  $id );
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    // echo 'true';
     echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

}

function getMyLifeValues($id) {
   // $user_id  = getUserId();
   
  $sql = "SELECT qa.OptionId,qo.Answer FROM QuestionnaireAnswer as qa inner join QuestionnaireOptions as qo on qa.OptionId=qo.QoId WHERE qa.QId = 55 and qa.UserId =:id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("id",  $id );
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    // echo 'true';
     echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

}

function sendFeeling($id) {
   $user_id  = getUserId();
   $Date=  date("Y-m-d h:i:sa") ;
   $status = 0;
   $splstatus = 1;
   $message ="Feels like something special is brewing up between us";
   $link ="special-feeling-accept";
  $sql = "INSERT INTO SpecialFeeling (SenderId, RecieverId, SendedDate) VALUES (:SenderId,:RecieverId,:SendedDate)";
  $sqlM ="INSERT INTO `Messages`(`SenderId`, `UserId`, `Message`, `AddedDate`, `ViewStatus`, `Link`,`SpecialMessage`) VALUES (:SenderId,:RecieverId,:message,:SendedDate,:status, :link, :splstatus)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmtM = $db->prepare($sqlM);

    $stmt->bindParam("SenderId", $user_id);  
    $stmt->bindParam("RecieverId", $id);
    $stmt->bindParam("SendedDate", $Date);

    $stmtM->bindParam("SenderId", $user_id );  
    $stmtM->bindParam("RecieverId", $id);
    $stmtM->bindParam("message",  $message);
    $stmtM->bindParam("status", $status);
    $stmtM->bindParam("SendedDate", $Date);
    $stmtM->bindParam("link", $link);  
    $stmtM->bindParam("splstatus", $splstatus);  
    $stmt->execute();
    $stmtM->execute();
    echo 'true';
    } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

}
function getFeelings() {
   $user_id  = getUserId();
   
  $sql = "SELECT sf.SenderId,sf.Status,u.first_name,u.last_name FROM `SpecialFeeling` as sf inner join users as u on sf.SenderId = u.user_id WHERE sf.RecieverId = :user_id and sf.Status = 0";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("user_id", $user_id );
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    // echo 'true';
     echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

}

function notSureFeelings($id) {
   $user_id  = getUserId();
   $Date=  date("Y-m-d h:i:sa") ;
   $status = 0;
   $splstatus = 2;
   $message ="Not sure";
   $link ="special-feeling-history";
  $sql = "UPDATE `SpecialFeeling` SET `Status`= :splstatus WHERE SenderId = :RecieverId and RecieverId = :SenderId";
  $sqlM ="INSERT INTO `Messages`(`SenderId`, `UserId`, `Message`, `AddedDate`, `ViewStatus`, `Link`,`SpecialMessage`) VALUES (:SenderId,:RecieverId,:message,:SendedDate,:status, :link, :splstatus)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmtM = $db->prepare($sqlM);

    $stmt->bindParam("SenderId", $user_id);  
    $stmt->bindParam("RecieverId", $id);
    $stmt->bindParam("splstatus", $splstatus); 

    $stmtM->bindParam("SenderId", $user_id );  
    $stmtM->bindParam("RecieverId", $id);
    $stmtM->bindParam("message",  $message);
    $stmtM->bindParam("status", $status);
    $stmtM->bindParam("SendedDate", $Date);
    $stmtM->bindParam("link", $link);  
    $stmtM->bindParam("splstatus", $splstatus);  
    $stmt->execute();
    $stmtM->execute();
    echo 'true';
    } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
}

function notYetFeelings($id) {
   $user_id  = getUserId();
   $Date=  date("Y-m-d h:i:sa") ;
   $st = 2;
   $status = 0;
   $splstatus = 2;
   $message ="Not yet";
   $link ="special-feeling-history";
  $sql = "UPDATE `SpecialFeeling` SET `Status`= :st WHERE SenderId = :RecieverId and RecieverId = :SenderId";
  $sqlM ="INSERT INTO `Messages`(`SenderId`, `UserId`, `Message`, `AddedDate`, `ViewStatus`, `Link`,`SpecialMessage`) VALUES (:SenderId,:RecieverId,:message,:SendedDate,:status, :link, :splstatus)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmtM = $db->prepare($sqlM);

    $stmt->bindParam("SenderId", $user_id);  
    $stmt->bindParam("RecieverId", $id);
    $stmt->bindParam("st", $st); 

    $stmtM->bindParam("SenderId", $user_id );  
    $stmtM->bindParam("RecieverId", $id);
    $stmtM->bindParam("message",  $message);
    $stmtM->bindParam("status", $status);
    $stmtM->bindParam("SendedDate", $Date);
    $stmtM->bindParam("link", $link);  
    $stmtM->bindParam("splstatus", $splstatus);  
    $stmt->execute();
    $stmtM->execute();
    echo 'true';
    } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
}

function needTimeFeelings($id) {
   $user_id  = getUserId();
   $Date=  date("Y-m-d h:i:sa") ;
   $st = 3;
   $status = 0;
   $splstatus = 2;
   $message ="Need Some time";
   $link ="special-feeling-history";
  $sql = "UPDATE `SpecialFeeling` SET `Status`= :st WHERE SenderId = :RecieverId and RecieverId = :SenderId";
  $sqlM ="INSERT INTO `Messages`(`SenderId`, `UserId`, `Message`, `AddedDate`, `ViewStatus`, `Link`,`SpecialMessage`) VALUES (:SenderId,:RecieverId,:message,:SendedDate,:status, :link, :splstatus)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmtM = $db->prepare($sqlM);

    $stmt->bindParam("SenderId", $user_id);  
    $stmt->bindParam("RecieverId", $id);
    $stmt->bindParam("st", $st); 

    $stmtM->bindParam("SenderId", $user_id );  
    $stmtM->bindParam("RecieverId", $id);
    $stmtM->bindParam("message",  $message);
    $stmtM->bindParam("status", $status);
    $stmtM->bindParam("SendedDate", $Date);
    $stmtM->bindParam("link", $link);  
    $stmtM->bindParam("splstatus", $splstatus);  
    $stmt->execute();
    $stmtM->execute();
    echo 'true';
    } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
}

function acceptFeeling($id) {
   $user_id  = getUserId();
   $Date=  date("Y-m-d h:i:sa") ;
   $st = 4;
   $status = 0;
   $splstatus = 2;
   $message ="Yes I think";
   $link ="special-feeling-history";
  $sql = "UPDATE `SpecialFeeling` SET `Status`= :st WHERE SenderId = :RecieverId and RecieverId = :SenderId";
  $sqlM ="INSERT INTO `Messages`(`SenderId`, `UserId`, `Message`, `AddedDate`, `ViewStatus`, `Link`,`SpecialMessage`) VALUES (:SenderId,:RecieverId,:message,:SendedDate,:status, :link, :splstatus)";
  $sqlAF = "INSERT INTO SpecialFeeling (SenderId, RecieverId, SendedDate,`Status`) VALUES (:SenderId,:RecieverId,:SendedDate,:st)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmtM = $db->prepare($sqlM);
    $stmtAF = $db->prepare($sqlAF);

    $stmt->bindParam("SenderId", $user_id);  
    $stmt->bindParam("RecieverId", $id);
    $stmt->bindParam("st", $st); 

    $stmtM->bindParam("SenderId", $user_id );  
    $stmtM->bindParam("RecieverId", $id);
    $stmtM->bindParam("message",  $message);
    $stmtM->bindParam("status", $status);
    $stmtM->bindParam("SendedDate", $Date);
    $stmtM->bindParam("link", $link);  
    $stmtM->bindParam("splstatus", $splstatus); 

    $stmtAF->bindParam("SenderId", $user_id);  
    $stmtAF->bindParam("RecieverId", $id);
    $stmtAF->bindParam("SendedDate", $Date);
    $stmtAF->bindParam("st", $st); 


    $stmt->execute();
    $stmtM->execute();
    $stmtAF->execute();
    echo 'true';
    } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
}

function historyFeeling() {
   $user_id  = getUserId();
   
  $sql = "SELECT sf.RecieverId,sf.SenderId,sf.Status,u.first_name,u.last_name FROM `SpecialFeeling` as sf inner join users as u on sf.RecieverId = u.user_id WHERE sf.SenderId = :user_id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("user_id", $user_id );
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    // echo 'true';
    for ($i=0; $i<count($wine); $i++) {
      if ($wine[$i]->Status == 1) {
        $wine[$i]->mess = $wine[$i]->first_name . ' ' .$wine[$i]->last_name. ' says, he is Not Sure about your brewing request.';
      }else if ($wine[$i]->Status == 2){
        $wine[$i]->mess = $wine[$i]->first_name . ' ' .$wine[$i]->last_name. ' says, he Not Yet decided about your brewing request.';
      }else if ($wine[$i]->Status == 3){
        $wine[$i]->mess = $wine[$i]->first_name . ' ' .$wine[$i]->last_name. ' says, he Needs More Time to respond your brewing request.';
      }else{
        $wine[$i]->mess = $wine[$i]->first_name . ' ' .$wine[$i]->last_name. ' accepted your sweet expresso shot.';
      }
    }
       
     echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

}


function checkFeeling($id) {
  $user_id  = getUserId();
  $st = 0;
  //exit();
  
  $sql = "SELECT * FROM `Restriction` ";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
   // $stmt->bindParam("user_id", $user_id );
    $stmt->execute();
    $wineRes = $stmt->fetchObject();
    //$db = null;
    // echo 'true';
    // echo json_encode($wineRes);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  
  
  $sql = "SELECT SendedDate FROM `SpecialFeeling`  WHERE SenderId = :user_id order by SendedDate desc Limit 0, 1 ";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id", $user_id );
    $stmt->execute();
    $wine = $stmt->fetchObject();
    //$db = null;
    // echo 'true';
   // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  
  if (!empty($wine)) {
  $birthdate = date('Y-m-d', strtotime($wine->SendedDate));
  $tdate = date('Y-m-d');
  
   $diff = abs(strtotime($tdate) - strtotime($birthdate));
  
  $years = floor($diff / (365*60*60*24));
  $months = floor(($diff - $years * 365*60*60*24) / (30*60*60*24));
  $days = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24)/ (60*60*24));
 
   if($days < $wineRes->Resend){
     $st = 1;
     echo 'Ooops! You can only have one Sweet Expresso shot in a Day. '; 
   }
  }
 if($st == 0){
   
   $sql = "SELECT SendedDate FROM `SpecialFeeling`  WHERE SenderId = :user_id and RecieverId = :rid order by SendedDate desc Limit 0, 1 ";
   try {
     //$db = getConnection();
     $stmt = $db->prepare($sql);
     $stmt->bindParam("user_id", $user_id );
     $stmt->bindParam("rid", $id );
     $stmt->execute();
     $wine = $stmt->fetchObject();
     $db = null;
     // echo 'true';
     // echo json_encode($wine);
   } catch(PDOException $e) {
     echo '{"error":{"text":'. $e->getMessage() .'}}';
   }
   if (!empty($wine)) {
   $birthdate = date('Y-m-d', strtotime($wine->SendedDate));
   $tdate = date('Y-m-d');
   
   $diff = abs(strtotime($tdate) - strtotime($birthdate));
   
   $years = floor($diff / (365*60*60*24));
   $months = floor(($diff - $years * 365*60*60*24) / (30*60*60*24));
   $days = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24)/ (60*60*24));
   
     if ($days < $wineRes->ResendSame) {
       $st = 1;
       echo 'Ooops! Ysou just accepted a sweet expresso shot. Give it a day for the next.';
     }
   }
   
 }
 if($st == 0) 
 echo 'true';

}


function getMember($id) {
   // $user_id  = getUserId();
   
  $sql = "SELECT dbu.UserId,dbu.DiscussionBoardId,u.first_name,u.last_name,u.Picture FROM DiscussionBoardUsers as dbu inner join users as u on dbu.UserId = u.user_id WHERE DiscussionBoardId = :id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("id", $id );
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    // echo 'true';
     echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

}

function updateLogin() {
    $user_id  = getUserId();
   
  $sql = "Update users set LoginCount = 1 where user_id = :user_id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("user_id", $user_id );
    $stmt->execute();
    
    $db = null;
     echo 'true';
     // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

}

function getLikes() {
    $user_id  = getUserId();
   
  $sql = "Select * from Likes where UserId = :user_id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("user_id", $user_id );
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;

    if($wine != null){
      $wine->Text = unserialize($wine->Text);
       echo json_encode($wine);
    } else{
      echo json_encode($wine);
    }
    
     // echo 'true';
      
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

}

function insertLikes() {
  $request = Slim::getInstance()->request();
  $user = json_decode($request->getBody());
  //print_r($user);
  $like = serialize($user->likes);
  
  $user_id  = getUserId();

  
  $sql = "Insert into Likes (UserId,Text) values (:UserId,:text)";
  
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("UserId", $user_id);
    $stmt->bindParam("text", $like);
    $stmt->execute();
    $db = null;

     echo 'true';
    //$app->redirect('login.html');
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
 }
