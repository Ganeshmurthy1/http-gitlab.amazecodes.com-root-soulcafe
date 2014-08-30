<?php 

$app->get('/users/:id', 'getUsers');
$app->post('/add_user', 'addUser');
$app->post('/verify', 'verifyUser');
$app->post('/add_education', 'addEducation');
$app->post('/add_contact', 'addContact');
$app->post('/add_currentposition', 'addCurrentPosition');
$app->post('/add_pastposition', 'addPastPosition');
$app->post('/update_user', 'updateUser');
$app->post('/saveComments', 'saveComments');
$app->post('/saveDiscussionboardabuse', 'saveDiscussionboardabuse');



$app->get('/usersAll/:id', 'checkUser', 'getAllUsers');
$app->get('/linkedinUsers/:id', 'getLinkedinUsers');
$app->get('/discussionAll', 'checkUser', 'getAllDiscussions');
$app->get('/discussionTopicAll/:DiscussionBoardId', 'getAllDiscussionsTopics');
$app->get('/discussionTopicComments/:topic', 'getdiscussionTopicComments');

$app->get('/getdiscussionListTopicName/:topicId', 'getdiscussionListTopicName');
$app->get('/getdiscussionTopicName/:topicId', 'getdiscussionTopicName');



$app->get('/setCommentLikes/:commentId', 'setCommentLikes');

function checkUser() { 
  $headers = apache_request_headers();
 // echo $headers['authorization'];
  $split = explode(' ', $headers['authorization']);
  $token = $split[1];
  $user_id  = $split[3];
  $sql = "select user_id FROM users where user_id = :user_id and access_tocken = :token";
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

function getUsers($id) {
	$sql = "select user_id,user_role FROM users where fb_id = :id ORDER BY user_id";
	try {
		$db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $wine = $stmt->fetchObject();
        $db = null;
        if($wine != false) {
          $token = bin2hex(openssl_random_pseudo_bytes(16));
          $sql = "Update users SET access_tocken=:token WHERE fb_id=:user_id";
          try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("token", $token);
            $stmt->bindParam("user_id", $id);
            $stmt->execute();
            
            $wine->token = $token;
            //echo json_encode($wine);
          } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
          }
          
        }
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


function getLinkedinUsers($id) {
  $sqlEdu = "select * FROM education where user_id = :id ORDER BY user_id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sqlEdu);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $wineEdu = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
     // echo json_encode($wineEdu);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  $sqlCp = "select * FROM currentPosition where user_id = :id ORDER BY user_id";
   try {
    $db = getConnection();
    $stmt = $db->prepare($sqlCp);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $wineCp = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  $sqlPp = "select * FROM pastPosition where user_id = :id ORDER BY user_id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sqlPp);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $winePp = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  // $merged = array_merge(Object($wineEdu),Object($wineCp),Object($winePp));
     $op = new stdClass();
     $op->edu = $wineEdu;
     $op->cp = $wineCp;
     $op->pp = $winePp;
      echo json_encode($op);
//  $obj_merged = (object) array_merge((array) $wineEdu, (array) $wineCp, (array) $winePp);
 // echo json_encode($obj_merged);
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
	       $name = $user->first_name. ' ' . $user->last_name;
	       $role = 2;
	    
        	$sql = "INSERT INTO users (fb_id, first_name, last_name, email, gender, birthdate, hometown, location, relationship_status, mobile, act_code, user_role) VALUES (:fb_id, :first_name, :last_name, :email, :gender, :birthdate, :hometown, :location, :relationship_status, :mobile, :act_code, :user_role)";
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
        		$stmt->bindParam("user_role", $role);
        		$stmt->execute();
        		
        		// $my_name = $user->first_name .'%20' . $user->last_name;
        		// // Get cURL resource
        		// $curl = curl_init();
        		// // Set some options - we are passing in a useragent too here
        		// curl_setopt_array($curl, array(
        		// CURLOPT_RETURNTRANSFER => 1,
        		// CURLOPT_URL => 'http://bulksms.marketsolutions.co.in/sendsms?uname=thumbamon&pwd=thumbamon123&senderid=TUMBMN&to=' . $user->mobile . '&msg=Dear%20' . $my_name . ',%20%20Thank%20you%20for%20your%20donation%20amount%20of%20INR.%20' .$mobile_rand . '/-%20towards%20Tithe%20Collection%20of%20MOSC%20Diocese%20of%20Thumpamon.%20Best%20Regards,%20Dio.%20Office,%20Thumpamon&route=T',
        		// CURLOPT_USERAGENT => 'Jiby Sample cURL Request'
        		// ));
        		// // Send the request & save response to $resp
        		// $resp = curl_exec($curl);
        		// // Close request to clear up some resources
        		// curl_close($curl);
        		
        		
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

function verifyUser() {
  $request = Slim::getInstance()->request();
  $user = json_decode($request->getBody());

  $sql = "select act_code FROM users where user_id = :user_id ORDER BY user_id";

  $db = getConnection();
  $stmt = $db->prepare($sql);
  $stmt->bindParam("user_id", $user->user_id);
  $stmt->execute();
  $wine = $stmt->fetchObject();
  $db = null;
  if($wine->act_code == $user->act_code) {
    
      $sql = "Update users SET status=1 WHERE user_id=:user_id";
      try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("user_id", $user->user_id);
        $stmt->execute();
        echo 'true';
        //$app->redirect('login.html');
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
  }    
  else {
    echo 'Wrong Activation Code  ';
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
	$request = Slim::getInstance()->request();
	$user = json_decode($request->getBody());
	$sql = "Update users SET linked_update=1 WHERE user_id=:user_id";
      try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("user_id", $user->user_id);
        $stmt->execute();
    	echo 'true';
        //$app->redirect('login.html');
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
}

function getAllDiscussions() {
  $sql = "select * FROM DiscussionBoard";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);;
    $db = null;
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function getAllDiscussionsTopics($DiscussionBoardId) {
  $sql = "select * FROM discussionboardtopic where DiscussionBoardId =:DiscussionBoardId";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("DiscussionBoardId", $DiscussionBoardId);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);;
    $db = null;
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}


function getdiscussionTopicComments($topic) {

   $headers = apache_request_headers();
   $split = explode(' ', $headers['authorization']);
   $user_id  = $split[3];

   $sql = "SELECT DBC.CommentDateTime, DBC.UserId, DBC.Comment ,DBC.CommentId,users.first_name, (select count(1) from discussionborardlikes DBL where DBL.CommentId=DBC.CommentId ) as likes,
(select count(1) from discussionborardlikes DBL where DBL.CommentId=DBC.CommentId and DBL.UserId=:userId or DBC.UserId=DBL.UserId) as likeflag
FROM discussionboardcomments DBC INNER JOIN users ON DBC.UserId=users.User_Id where DiscussionTopicId=:topic" ;
 try {   
    $db = getConnection();   
    $stmt = $db->prepare($sql);
    $stmt->bindParam("topic", $topic);    
    $stmt->bindParam("userId", $user_id);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);;
    $db = null;
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function setCommentLikes($commentId) {
 $headers = apache_request_headers();
   $split = explode(' ', $headers['authorization']);
   $user_id  = $split[3];

  $likeDateTime= date("Y-m-d");

  $sql = "INSERT INTO discussionborardlikes (CommentId, UserId, LikeDateTime) VALUES (:commentId, :userId, :likeDateTime)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("commentId", $commentId);
    $stmt->bindParam("userId", $user_id);
    $stmt->bindParam("likeDateTime", $likeDateTime);
   
    $stmt->execute();
    
    //$app->redirect('login.html');
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }


echo 'true';
}



function getdiscussionListTopicName($topicId) {
   $sql = "SELECT Topic from discussionboard where DiscussionBoardId=:disTopicId" ;
   try {   
      $db = getConnection();   
      $stmt = $db->prepare($sql);
      $stmt->bindParam("disTopicId", $topicId);    
      $stmt->execute();
      $wine = $stmt->fetchAll(PDO::FETCH_OBJ);;
      $db = null;
      echo json_encode($wine);
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
  }


function getdiscussionTopicName($topicId) {
   $sql = "SELECT TopicTitle from discussionboardtopic where DiscussionTopicId=:disTopicId" ;
   try {   
      $db = getConnection();   
      $stmt = $db->prepare($sql);
      $stmt->bindParam("disTopicId", $topicId);    
      $stmt->execute();
      $wine = $stmt->fetchAll(PDO::FETCH_OBJ);;
      $db = null;
      echo json_encode($wine);
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
  }


function saveComments() {   
  $request = Slim::getInstance()->request();
  $comments = json_decode($request->getBody());

   $headers = apache_request_headers();
   $split = explode(' ', $headers['authorization']);
   $user_id  = $split[3];
   $cmtDateTime=  date("Y-m-d") ;
   $IsValid=0;

    $sql = "INSERT INTO discussionboardcomments (DiscussionTopicId, UserId, Comment,CommentDateTime,IsValid) VALUES ( :topicId,:userId ,:comment ,:cmtDateTime,:IsValid )";
  try {
   $stmt = $db->prepare($sql);  
    $stmt->bindParam("topicId", $comments->topicId);
    $stmt->bindParam("userId", $user_id);
    $stmt->bindParam("comment", $comments->comment);
    $stmt->bindParam("cmtDateTime", $cmtDateTime);
       $stmt->bindParam("IsValid", $IsValid);
    $stmt->execute();
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
  }

  


  function saveDiscussionboardabuse() {   
    $request = Slim::getInstance()->request();
    $comment = json_decode($request->getBody());
    $headers = apache_request_headers();
    $split = explode(' ', $headers['authorization']);
    $user_id  = $split[3];
    $reportedDate= date("Y-m-d");
    $sql = "INSERT INTO discussionboardabuse (CommentId, ReportedBy,Comments,ReportedDate) VALUES ( :commentId,:reportedBy ,:comment ,:reportedDate )";
      try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("commentId", $comment->commenitid);
        $stmt->bindParam("reportedBy", $user_id);
        $stmt->bindParam("comment", $user->comment);
        $stmt->bindParam("reportedDate", $reportedDate);
        $stmt->execute();
       echo 'true';
        //$app->redirect('login.html');
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
    }




?>