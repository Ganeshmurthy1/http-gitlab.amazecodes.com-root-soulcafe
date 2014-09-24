<?php

function getConnection() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="123";
	$dbname="soul-abhik";
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
