<?php

$app->get('/get_UserMatch', 'getUserMatch');
$app->post('/add_GTKYRequest', 'addGTKYRequest');
$app->get('/check_GTKYRequest/:id', 'checkGTKYRequest');

function getUserMatch() {
 
  // print_r( $user );
  $user_id  = getUserId();
   
  $sql = "select * from users where user_id Not IN(select user_id from users where user_id=:user_id)";
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


     $message =  'Friend request from ' . $fname . ' ' . $lname . 'is waiting for your approval. <a href="#">View Request</a>';
     // print $message;
  
   $cmtDateTime=  date("Y-m-d") ;
   $status  = 0;
  
  $sql = "Insert into Buddies (SenderId,BuddyId,Status,AddedDate) values (:SenderId,:BuddyId,:Status,:AddedDate)";
  $sqlSN = "Insert into SystemNotification (userId,Message,ViewStatus,AddedDate) values (:userId,:Message,:ViewStatus,:AddedDate)";
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
    $stmtSN->execute();


    echo 'true';
    //$app->redirect('login.html');
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
 }

 function checkGTKYRequest($id) {
 

  $user_id  = getUserId();
   
  $sql = "select * from Buddies where BuddyId = :id and Status = 0";
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
?>

