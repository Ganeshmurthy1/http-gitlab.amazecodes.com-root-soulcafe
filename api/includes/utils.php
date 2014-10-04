<?php

function getUserId() {
  $headers = apache_request_headers();
  if (isset($headers['authorization'])) {
     $split = explode(' ', $headers['authorization']);
     $token = $split[1];
     $user_id  = $split[3];
   }
    else if (isset($headers['Authorization'])) {
      $split = explode(' ', $headers['Authorization']);
      $token = $split[1];
      $user_id  = $split[3];
    }
    //$user_id;
    return $user_id;
      
}

function checkAdmin() {
  $headers = apache_request_headers();
  // echo $headers['authorization'];
  $token = '';
  $user_id  = '';
  if (isset($headers['authorization'])) {
    $split = explode(' ', $headers['authorization']);
    $token = $split[1];
    $user_id  = $split[3];
  }
  else if (isset($headers['Authorization'])) {
    $split = explode(' ', $headers['Authorization']);
    $token = $split[1];
    $user_id  = $split[3];
  }
  $sql = "select user_id FROM AdminUser where AdminId = :user_id and access_tocken = :token";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id", $user_id);
    $stmt->bindParam("token", $token);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;
    //echo json_encode($wine);
    if($wine == false) {
      $app = Slim::getInstance();
      $app->status(401);
      $result = array("status" => "error", "message" => "You need a valid API key.");
      echo json_encode($result);
      $app->stop();

    }

  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }


  //echo json_encode($headers);

}

?>