<?php

$app->post('/admin_login', 'checkAdminLogin');
$app->get('/admin_get_all_users', 'adminGetAllUsers');
$app->get('/admin_get_blocked_users', 'adminGetBlockedUsers');

$app->get('/admin_activate_user/:id', 'adminActivateUser');
$app->get('/admin_deactivate_user/:id', 'adminDeactivateUser');

$app->get('/admin_get_all_message', 'adminGetAllMessage');

$app->get('/get_total_sys_message/:id', 'getTotalSysMessage');
$app->get('/get_total_message/:id', 'getTotalMessage');
$app->get('/get_total_forum_message/:id', 'getTotalForumMessage');

$app->get('/sys_mark_message', 'sysMarkMessage');
$app->get('/mark_message', 'MarkMessage');

function checkAdminLogin() {
  $request = Slim::getInstance()->request();
  $user = json_decode($request->getBody());
  //$user_id  = getUserId();
 
  $sqlU = "Select AdminId,FullName,Role from AdminUser where Uname = :username and Password = :password";
  try{
    $db = getConnection();
    $stmtU = $db->prepare($sqlU);
    $stmtU->bindParam("username", $user->user_name);
    $stmtU->bindParam("password", $user->password);
    $stmtU->execute();
    $wineU = $stmtU->fetchObject();
    $db = null;
    //print_r ($wineU);
    if($wineU != false) {
      $token = bin2hex(openssl_random_pseudo_bytes(16));
      $sql = "Update AdminUser SET access_tocken=:token WHERE Uname = :username";
      try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("token", $token);
        $stmt->bindParam("username", $user->user_name);
        $stmt->execute();
      
        $wineU->token = $token;
        //echo json_encode($wine);
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
      echo json_encode($wineU);
    }
    else {
      echo 'false';
    }
  }catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  } 
}


function adminGetAllUsers() {

  $sql = "SELECT * from users where status=1";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    // $stmt->bindParam("id", $id);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    //echo $total = $wine->'count(1)';

    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  //echo json_encode($wine);
}

function adminGetBlockedUsers() {

  $sql = "SELECT * from users where status=0";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    // $stmt->bindParam("id", $id);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    //echo $total = $wine->'count(1)';

    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  //echo json_encode($wine);
}

function adminActivateUser($id) {
  $sql = "Update users SET status=1 WHERE user_id=:id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    echo 'true';
    //echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

}

function adminDeactivateUser($id) {
  $sql = "Update users SET status=0 WHERE user_id=:id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    echo 'true';
    //echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

}

function adminGetAllMessage() {

  $sql = "SELECT ru.*, u.first_name as sender, us.first_name as user from ReportAbuseUser ru JOIN users u on ru.SenderId=u.user_id JOIN users us on ru.UserId=us.user_id where ru.status=0 order by AddedDate desc";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    // $stmt->bindParam("id", $id);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    //echo $total = $wine->'count(1)';

    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  //echo json_encode($wine);
}

function getTotalSysMessage($id) {

  $sql = "SELECT count(1) as total from SystemNotification where userId=:user_id and ViewStatus=0 order by AddedDate desc";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id", $id);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;
    //echo $total = $wine->'count(1)';

    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  //echo json_encode($wine);
}

function getTotalMessage($id) {

  $sql = "SELECT count(1) as total from Messages where UserId=:user_id and ViewStatus=0 order by AddedDate desc";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id", $id);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;
    //echo $total = $wine->'count(1)';

    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  //echo json_encode($wine);
}

function getTotalForumMessage($id) {

  $sql = "SELECT count(1) as total from ForumNotification where userId=:user_id and ViewStatus=0 order by AddedDate desc";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id", $id);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;
    //echo $total = $wine->'count(1)';

    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  //echo json_encode($wine);
}

function sysMarkMessage() {
  $user_id  = getUserId();
  
  $sql = "SELECT * from SystemNotification where userId=:user_id and ViewStatus=0 order by AddedDate desc";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id", $user_id);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    //echo $total = $wine->'count(1)';
  
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  
  
  $sql = "Update SystemNotification SET ViewStatus=1 WHERE userId=:id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $user_id);
    $stmt->execute();
    //echo 'true';
    //echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

}

function MarkMessage() {
  $user_id  = getUserId();

  $sql = "SELECT Message as mes from Messages where UserId=:user_id and ViewStatus=0 order by AddedDate desc";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id", $user_id);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    //echo $total = $wine->'count(1)';

    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }


    $sql = "Update Messages SET ViewStatus=1 WHERE userId=:id";
    try {
      $db = getConnection();
      $stmt = $db->prepare($sql);
      $stmt->bindParam("id", $user_id);
      $stmt->execute();
      //echo 'true';
      //echo json_encode($wine);
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

  }