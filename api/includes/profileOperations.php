<?php

$app->get('/get_UserMatch', 'getUserMatch');
$app->get('/get_Buddies', 'getBuddies');
$app->get('/get_forumsOther/:id', 'getforumsOther');
$app->post('/add_GTKYRequest', 'addGTKYRequest');
$app->get('/check_GTKYRequest/:id', 'checkGTKYRequest');
$app->post('/add_AbuseUser', 'addAbuseUser');
$app->get('/check_AbuseUser/:id', 'checkAbuseUser');
$app->get('/get_UserSendedGTKY', 'getUserSendedGTKY');
$app->get('/accept_GTKY/:id', 'acceptGTKY');
$app->get('/reject_GTKY/:id', 'rejectGTKY');


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

function getBuddies() {
 
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
      // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

  $sqlForums = "SELECT db.*,dbu.DiscussionBoardId FROM `DiscussionBoardUsers` as dbu inner join DiscussionBoard as db ON dbu.DiscussionBoardId = db.DiscussionBoardId WHERE dbu.UserId = :user_id";
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

  $user['friends']=$wine;
  $user['forum']=$wineForums;
  echo json_encode($user);

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


     $message =  'Friend request from ' . $fname . ' ' . $lname . 'is waiting for your approval.';
     // print $message;
  
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

function checkGTKYRequest($id) {
   $user_id  = getUserId();
   
  $sql = "select * from Buddies where BuddyId = :id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("id",  $id );
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
     $db = null;
       echo json_encode($wine);
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
   // $user_id  = getUserId();
   
  $sql = " update Buddies SET Status = 1 where SenderId =:id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("id", $id);
    $stmt->execute();
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
