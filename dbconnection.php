<?php

function getConnection() {
	$dbhost="50.62.209.88";
	$dbuser="soulcage";
	$dbpass="1t2fxH!6";
	$dbname="soulcafe";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

function getLoginUserId() {
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
  
  return $user_id;
  
}

?>
