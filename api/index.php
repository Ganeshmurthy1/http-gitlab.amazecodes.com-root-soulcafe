<?php

require 'Slim/Slim.php';

$app = new Slim();
$app->get('/users/:id', 'getUsers');
$app->post('/add_user', 'addUser');
$app->post('/add_education', 'addEducation');
$app->post('/add_contact', 'addContact');
$app->post('/add_currentposition', 'addCurrentPosition');
$app->post('/add_pastposition', 'addPastPosition');
$app->post('/update_user', 'updateUser');

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
	   if(is_numeric($user->mobile) and strlen($user->mobile) >= 10) {	  
	       $mobile_rand = rand(11111, 99999);
	    
        	$sql = "INSERT INTO users (fb_id, first_name, last_name, email, gender, birthdate, hometown, location, relationship_status, mobile, act_code) VALUES (:fb_id, :first_name, :last_name, :email, :gender, :birthdate, :hometown, :location, :relationship_status, :mobile, :act_code)";
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
        		$stmt->bindParam("act_code", $mobile_rand);
        		$stmt->execute();
        		
        		
        		// Get cURL resource
        		$curl = curl_init();
        		// Set some options - we are passing in a useragent too here
        		curl_setopt_array($curl, array(
        		CURLOPT_RETURNTRANSFER => 1,
        		CURLOPT_URL => 'http://bulksms.marketsolutions.co.in/sendsms?uname=thumbamon&pwd=thumbamon123&senderid=TUMBMN&to=' . $user->mobile . '&msg=Dear%20Jiby%20John,%20%20Thank%20you%20for%20your%20donation%20amount%20of%20INR.%20' .$mobile_rand . '/-%20towards%20Tithe%20Collection%20of%20MOSC%20Diocese%20of%20Thumpamon.%20Best%20Regards,%20Dio.%20Office,%20Thumpamon&route=T',
        		CURLOPT_USERAGENT => 'Jiby Sample cURL Request'
        		));
        		// Send the request & save response to $resp
        		$resp = curl_exec($curl);
        		// Close request to clear up some resources
        		curl_close($curl);
        		
        		
        		echo 'true';
        	} catch(PDOException $e) {
        		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
        	}
	   }
	   else {
	     echo 'Mobile number not valid';
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

function updateUser() {		
	$sql = "Update users SET status=1 WHERE user_id=:user_id";
      try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("user_id", $user->user_id);
        $stmt->execute();
    
        //$app->redirect('login.html');
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
echo 'true';
}

function getConnection() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="abhik123";
	$dbname="soulcafe";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>
