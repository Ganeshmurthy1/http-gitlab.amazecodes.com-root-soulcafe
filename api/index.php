<?php

require 'Slim/Slim.php';

$app = new Slim();
$app->get('/users/:id', 'getUsers');
$app->post('/add_user', 'addUser');
$app->post('/add_education', 'addEducation');
$app->post('/add_contact', 'addContact');
$app->post('/add_currentposition', 'addCurrentPosition');
$app->post('/add_pastposition', 'addPastPosition');
$app->get('/usersAll/:id', 'getAllUsers');


$app->run();

function getUsers($id) {
	$sql = "select user_id FROM users where fb_id = :id ORDER BY user_id";
	try {
		$db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $wine = $stmt->fetchObject();
        $db = null;
        echo json_encode($wine);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getAllUsers($id) {
  $sql = "select * FROM users where user_id = :id ORDER BY user_id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function addUser() {
	$request = Slim::getInstance()->request();
	$user = json_decode($request->getBody());
	
	$sql = "select user_id FROM users where mobile = :mobile ORDER BY user_id";
	
	  $db = getConnection();
	  $stmt = $db->prepare($sql);
	  $stmt->bindParam("mobile", $user->mobile);
	  $stmt->execute();
	  $wine = $stmt->fetchObject();
	  $db = null;
	  if(!isset($wine->user_id)) {    
	 
    	$sql = "INSERT INTO users (fb_id, first_name, last_name, email, gender, birthdate, hometown, location, relationship_status, mobile) VALUES (:fb_id, :first_name, :last_name, :email, :gender, :birthdate, :hometown, :location, :relationship_status, :mobile)";
    	try {
    		$db = getConnection();
    		$stmt = $db->prepare($sql);  
    		$stmt->bindParam("fb_id", $user->id);
    		$stmt->bindParam("first_name", $user->first_name);
    		$stmt->bindParam("last_name", $user->last_name);
    		$stmt->bindParam("email", $user->email);
    		$stmt->bindParam("gender", $user->gender);
    		$stmt->bindParam("birthdate", $user->birthday);
    		$stmt->bindParam("hometown", $user->hometown->name);
    		$stmt->bindParam("location", $user->location->name);
    		$stmt->bindParam("relationship_status", $user->relationship_status);
    		$stmt->bindParam("mobile", $user->mobile);
    		$stmt->execute();
    		echo 'true';
    		//$app->redirect('login.html');
    	} catch(PDOException $e) {
    		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    	}
	  }
	  else {
	    echo 'Mobile number already exist';
	  }
}

function addEducation() {
	$request = Slim::getInstance()->request();
	$user = json_decode($request->getBody());
	// print_r( $user );
	
	foreach($user as $obj) {
	$sql = "INSERT INTO education (schoolName, fieldOfStudy, endDate, startDate,user_id) VALUES (:schoolName, :fieldOfStudy, :endDate, :startDate,:user_id)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("schoolName", $obj->schoolName);
		$stmt->bindParam("fieldOfStudy", $obj->fieldOfStudy);
		$stmt->bindParam("endDate", $obj->endDate);
		$stmt->bindParam("startDate", $obj->startDate);
		$stmt->bindParam("user_id", $obj->user_id);
		$stmt->execute();
		
		//$app->redirect('login.html');
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}

}
echo 'true';
}

function addContact() {
	$request = Slim::getInstance()->request();
	$user = json_decode($request->getBody());
	// print_r( $user );
	
	foreach($user as $obj) {
	$sql = "INSERT INTO phone (phoneNumber, phoneType,user_id) VALUES (:phoneNumber, :phoneType,:user_id)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("phoneNumber", $obj->phoneNumber);
		$stmt->bindParam("phoneType", $obj->phoneType);
		$stmt->bindParam("user_id", $obj->user_id);
		$stmt->execute();
		
		//$app->redirect('login.html');
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}

}
echo 'true';
}

function addCurrentPosition() {
	$request = Slim::getInstance()->request();
	$user = json_decode($request->getBody());
	// print_r( $user );
	
	foreach($user as $obj) {
		if (isset($obj->month) and isset($obj->year)){
			$sDate = $obj->month . '-' . $obj->year;
		}
	$sql = "INSERT INTO currentPosition (company, startDate, title,user_id) VALUES (:company, :startDate, :title,:user_id)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("company", $obj->company);
		$stmt->bindParam("startDate", $sDate);
		$stmt->bindParam("title", $obj->title); 
		$stmt->bindParam("user_id", $obj->user_id);
		$stmt->execute();
		
		//$app->redirect('login.html');
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}

}
echo 'true';
}

function addPastPosition() {
	$request = Slim::getInstance()->request();
	$user = json_decode($request->getBody());
	// print_r( $user );
	
	foreach($user as $obj) {
		if (isset($obj->smonth) and isset($obj->syear)){
			$sDate = $obj->smonth . '-' . $obj->syear;
		}
		if (isset($obj->emonth) and isset($obj->eyear)){
			$eDate =  $obj->emonth . '-' . $obj->eyear;
		}
		
		
	$sql = "INSERT INTO pastPosition (company, startDate, endDate, title,user_id) VALUES (:company, :startDate, :endDate, :title,:user_id)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("company", $obj->company);
		$stmt->bindParam("startDate", $sDate);
		$stmt->bindParam("endDate",$eDate);
		$stmt->bindParam("title", $obj->title); 
		$stmt->bindParam("user_id", $obj->user_id);
		$stmt->execute();
		
		//$app->redirect('login.html');
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}

}
echo 'true';
}

function getConnection() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="123";
	$dbname="soulcafe";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>
