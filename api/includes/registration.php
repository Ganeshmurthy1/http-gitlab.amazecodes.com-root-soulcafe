<?php 

$app->get('/users/:id', 'getUsers');
$app->post('/add_user', 'addUser');
$app->post('/verify', 'verifyUser');
$app->post('/add_education', 'addEducation');
$app->post('/add_contact', 'addContact');
$app->post('/add_currentposition', 'addCurrentPosition');
$app->post('/add_pastposition', 'addPastPosition');
$app->post('/update_user', 'updateUser');
$app->get('/join_discussion/:id', 'joinDiscussion');

$app->get('/get_DiscussionListStatus', 'getDiscussionListStatus');
$app->get('/usersAll/:id', 'checkUser', 'getAllUsers');
$app->get('/linkedinUsers/:id', 'getLinkedinUsers');
$app->post('/add_linkedinData', 'addlinkedinData');

$app->get('/getProffesionaldetails/:id', 'checkUser', 'get_Proffesionaldetails');
$app->post('/saveDiscussionBoardAbuse','checkUser', 'save_DiscussionBoardAbuse');
$app->get('/discussionAll', 'checkUser','checkUser', 'getAllDiscussions');
$app->get('/discussionTopicAll/:DiscussionBoardId','checkUser', 'getAllDiscussionsTopics');
$app->get('/discussionTopicComments/:topic','checkUser', 'getdiscussionTopicComments');
$app->get('/getdiscussionListTopicName/:topicId', 'checkUser','getdiscussionListTopicName');
$app->get('/getdiscussionTopicName/:topicId','checkUser', 'getdiscussionTopicName');
$app->get('/setCommentLikes/:commentId','checkUser', 'setCommentLikes');


$app->post('/saveComments','checkUser','saveComments');

$app->post('/add_topic', 'checkUser', 'AddTopic');

$app->get('/deleteComment/:commentId','checkUser', 'deleteComment');
$app->get('/get_Profile_Detail','checkUser', 'getProfileDetail');
$app->post('/add_User_Discussion', 'checkUser', 'addUserDiscussion');
$app->get('/get_Total_Members/:DiscussionBoardId','checkUser', 'getTotalMembers');
$app->get('/remove_User/:DiscussionBoardId','checkUser', 'removeUser');
$app->get('/get_Total_Comments/:DiscussionBoardId','checkUser', 'getTotalComments');
$app->get('/user_Joined/:DiscussionBoardId','checkUser', 'userJoined');
$app->post('/update_Rating', 'checkUser', 'updateRating');
$app->get('/get_Rating/:topicId', 'checkUser','getRating');
$app->get('/get_Picture/:id', 'checkUser','getPicture');
$app->get('/get_ProfilePictures/:DiscussionBoardId','checkUser', 'getProfilePictures');
$app->get('/get_PicturesComments/:topicId','checkUser', 'getPicturesComments');
$app->post('/update_Profile_Detail', 'checkUser', 'updateProfileDetail');
$app->get('/get_TotalMemberFromAllDiscussion','checkUser', 'getTotalMemberFromAllDiscussion');

function checkUser() { 
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
      
          $sql = "INSERT INTO users (fb_id, first_name, last_name, email, gender, birthdate, hometown, location, relationship_status, mobile, act_code, user_role,Picture) VALUES (:fb_id, :first_name, :last_name, :email, :gender, :birthdate, :hometown, :location, :relationship_status, :mobile, :act_code, :user_role,:Picture)";
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
            $stmt->bindParam("Picture", $user->pic->data->url);
            
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


function getAllDiscussions() {

  $user_id  = getUserId();
  $sql = "select * ,(select count(1) from DiscussionBoardUsers DBU where DBU.DiscussionBoardId=DB.DiscussionBoardId and DBU.UserId=:user ) as flag FROM DiscussionBoard DB where Status=1";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);

    $stmt->bindParam("user", $user_id);

    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);;
    $db = null;
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function getAllDiscussionsTopics($DiscussionBoardId) {
  $sql = "select * FROM DiscussionBoardTopic where DiscussionBoardId =:DiscussionBoardId and Status=1";
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

   $user_id  = getUserId();

   $sql = "SELECT DBC.CommentDateTime, DBC.UserId, DBC.Comment ,DBC.CommentId,users.first_name, (select count(1) from DiscussionBorardLikes DBL where DBL.CommentId=DBC.CommentId ) as likes,
(select count(1) from DiscussionBorardLikes DBL where DBL.CommentId=DBC.CommentId and DBL.UserId=:userId ) as likeflag ,(select count(1) from DiscussionBoardComments DSB where DSB.CommentId=DBC.CommentId and DSB.UserId=:userId ) as deleteflag
FROM DiscussionBoardComments DBC INNER JOIN users ON DBC.UserId=users.User_Id where DiscussionTopicId=:topic and DBC.IsValid = 1 and DBC.profane=0" ;
 try {   
    $db = getConnection();   
    $stmt = $db->prepare($sql);
    $stmt->bindParam("topic", $topic);    
    $stmt->bindParam("userId", $user_id);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function setCommentLikes($commentId) {
  $user_id  = getUserId();
  $likeDateTime= date("Y-m-d");

    $sqlUsr = "SELECT first_name,last_name from users where user_id =:user_id";
    try {
      $db = getConnection();
      $stmtUsr = $db->prepare($sqlUsr);
      $stmtUsr->bindParam("user_id",$user_id);
      $stmtUsr->execute();
      $wineUsr = $stmtUsr->fetchAll(PDO::FETCH_OBJ);
      $db = null;
    //echo $total = $wine->'count(1)';
     // echo json_encode($wineUsr);
       $fname = $wineUsr[0]->first_name;
        $lname = $wineUsr[0]->last_name;
      // echo 'true';
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

   $viewstatus = 0;
   
   $sqlCommentUser = "SELECT UserId,Comment,DiscussionTopicId from DiscussionBoardComments where CommentId = :commentid";
    try {
      $db = getConnection();
      $stmtCommentUser = $db->prepare($sqlCommentUser);
      $stmtCommentUser->bindParam("commentid", $commentId);
      $stmtCommentUser->execute();
      $wineCUser = $stmtCommentUser->fetchAll(PDO::FETCH_OBJ);
      $db = null;
    //echo $total = $wine->'count(1)';
     // echo json_encode($wineUser);
       // print_r($wineCUser);
      // echo 'true';
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

    foreach($wineCUser as $obj) {
      $comment = $obj->Comment;
      $id = $obj->DiscussionTopicId;
      $link = 'discussion?id='.$id;
      $message = $fname.' '.$lname.' has liked your comment "'.$comment.'".';
        $sqlFN = "INSERT INTO ForumNotification (UserId,Message,ViewStatus,AddedDate,Link) VALUES (:UserId, :Message, :ViewStatus, :AddedDate, :Link)";
    try {
      $db = getConnection();
      $stmtFN = $db->prepare($sqlFN);
      $stmtFN->bindParam("UserId", $obj->UserId);
      $stmtFN->bindParam("Message", $message);
      $stmtFN->bindParam("ViewStatus", $viewstatus);
      $stmtFN->bindParam("AddedDate", $likeDateTime);
      $stmtFN->bindParam("Link", $link);
      $stmtFN->execute();


      // echo 'true';
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
    }

  $sql = "INSERT INTO DiscussionBorardLikes (CommentId, UserId, LikeDateTime) VALUES (:commentId, :userId, :likeDateTime)";
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
   $sql = "SELECT Topic from DiscussionBoard where DiscussionBoardId=:disTopicId" ;
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
   $sql = "SELECT TopicTitle from DiscussionBoardTopic where DiscussionTopicId=:disTopicId" ;
   try {   
      $db = getConnection();   
      $stmt = $db->prepare($sql);
      $stmt->bindParam("disTopicId", $topicId);    
      $stmt->execute();
      $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
      $db = null;
      echo json_encode($wine);
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
  }


function saveComments() {   
  $request = Slim::getInstance()->request();
  $comments = json_decode($request->getBody());

  $user_id  = getUserId();
  $cmtDateTime=  date("Y-m-d") ;
  $IsValid=1;
  $SeqNo=1;
  
  $profane = 0;
  $bwb = new BWB();
  $ok = $bwb->has_bad_words($comments->comment);
  if ($ok) {
    $profane = 1;
    echo 'profane';
  }
  
  $comment_santized = $bwb->sanitizeString($comments->comment);
  
    $sqlUsr = "SELECT first_name,last_name from users where user_id =:user_id";
    try {
      $db = getConnection();
      $stmtUsr = $db->prepare($sqlUsr);
      $stmtUsr->bindParam("user_id",$user_id);
      $stmtUsr->execute();
      $wineUsr = $stmtUsr->fetchAll(PDO::FETCH_OBJ);
      $db = null;
    //echo $total = $wine->'count(1)';
     // echo json_encode($wineUsr);
       $fname = $wineUsr[0]->first_name;
        $lname = $wineUsr[0]->last_name;
      // echo 'true';
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

    $viewstatus = 0;
    
    $sqlTopicUser = "SELECT distinct dbc.UserId,dbc.DiscussionTopicId,dbt.TopicTitle from DiscussionBoardComments as dbc inner join DiscussionBoardTopic as dbt on dbc.DiscussionTopicId = dbt.DiscussionTopicId where dbc.DiscussionTopicId =:topicid";
    try {
      $db = getConnection();
      $stmtTopicUser = $db->prepare($sqlTopicUser);
      $stmtTopicUser->bindParam("topicid", $comments->topicId);
      $stmtTopicUser->execute();
      $wineTopicUser = $stmtTopicUser->fetchAll(PDO::FETCH_OBJ);
      $db = null;
    //echo $total = $wine->'count(1)';
     // echo json_encode($wineUser);
      // print_r($wineUser);
      // echo 'true';
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

    foreach($wineTopicUser as $obj) {
      $tname = $obj->TopicTitle;
      $id = $obj->DiscussionTopicId;
      $link = 'discussion?id='.$id;
      $message = $fname.' '.$lname.' has commented on the topic '.$tname.'.';
        $sqlFN = "INSERT INTO ForumNotification (UserId,Message,ViewStatus,AddedDate,Link) VALUES (:UserId, :Message, :ViewStatus, :AddedDate,:Link)";
    try {
      $db = getConnection();
      $stmtFN = $db->prepare($sqlFN);
      $stmtFN->bindParam("UserId", $obj->UserId);
      $stmtFN->bindParam("Message", $message);
      $stmtFN->bindParam("ViewStatus", $viewstatus);
      $stmtFN->bindParam("AddedDate", $cmtDateTime);
      $stmtFN->bindParam("Link", $link);
      $stmtFN->execute();
       // echo 'true';
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
    }
  $sql = "INSERT INTO DiscussionBoardComments (DiscussionTopicId, UserId,SeqNo, Comment,CommentDateTime,IsValid,profane) VALUES ( :topicId,:userId ,:SeqNo,:comment ,:cmtDateTime,:IsValid, :profane )";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("topicId", $comments->topicId);
    $stmt->bindParam("userId", $user_id);
    $stmt->bindParam("SeqNo", $SeqNo);
    $stmt->bindParam("comment", $comment_santized);
    $stmt->bindParam("cmtDateTime", $cmtDateTime);
    $stmt->bindParam("IsValid", $IsValid);
    $stmt->bindParam("profane", $profane);
    $stmt->execute();
    //   echo 'true';
        //$app->redirect('login.html');
      } 
  catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
  }

  
  function save_DiscussionBoardAbuse() { 
    $request = Slim::getInstance()->request();
    $user = json_decode($request->getBody());
    // print_r($user);
     $user_id  = getUserId();
    $reportedDate= date("Y-m-d");
    $sql = "INSERT INTO DiscussionBoardAbuse (CommentId, ReportedBy,Comments,ReportedDate) VALUES ( :commentId,:reportedBy,:Comments,:reportedDate )";
      try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("commentId", $user->CommentId);
        $stmt->bindParam("reportedBy", $user_id);
        $stmt->bindParam("Comments", $user->Comment);
        $stmt->bindParam("reportedDate",$reportedDate);
        $stmt->execute();
       echo 'true';
        //$app->redirect('login.html');
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
    }

function get_Proffesionaldetails($id) {
  $sql = "select * FROM ProfessionalDetails where UserId = :id ORDER BY UserId";
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

function addlinkedinData() {
  $request = Slim::getInstance()->request();
  $user = json_decode($request->getBody());
  //
   // print_r( $user->values[0]->threeCurrentPositions->values[0]->title );
   $currentEmployment = $user->values[0]->threeCurrentPositions->values[0]->company->name;
   $currentRole = $user->values[0]->threeCurrentPositions->values[0]->title;
   // print $currentEmployment;
   $highestEducation = $user->values[0]->educations->values[0]->degree . ' - '  . $user->values[0]->educations->values[0]->fieldOfStudy;
   $endorsedSkills = $user->values[0]->skills->values[0]->skill->name . ','  .$user->values[0]->skills->values[1]->skill->name. ','  .$user->values[0]->skills->values[2]->skill->name. ','  .$user->values[0]->skills->values[3]->skill->name. ','  .$user->values[0]->skills->values[4]->skill->name;
  // foreach($user as $obj) {
  $user_id  = getUserId();

  $sql = "INSERT INTO ProfessionalDetails (UserId, CurrentEmployment, CurrentRole, HighestEducation, Endorsedskills) VALUES (:UserId, :CurrentEmployment, :CurrentRole, :HighestEducation, :Endorsedskills)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("UserId", $user_id);
    $stmt->bindParam("CurrentEmployment", $currentEmployment);
    $stmt->bindParam("CurrentRole", $currentRole);
    $stmt->bindParam("HighestEducation", $highestEducation);
    $stmt->bindParam("Endorsedskills", $endorsedSkills);
    $stmt->execute();
    updateUser($user_id);
    //$app->redirect('login.html');
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
}


function updateUser($user_id) {   
  // $request = Slim::getInstance()->request();
  // $user = json_decode($request->getBody());
  $sql = "Update users SET linked_update=1 WHERE user_id=:user_id";
      try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("user_id", $user_id);
        $stmt->execute();
      echo 'true';
        //$app->redirect('login.html');
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
}

function AddTopic() {
  $request = Slim::getInstance()->request();
  $forum = json_decode($request->getBody());
  $user_id  = getUserId();
  $tdate = date('Y-m-d h:i:s');
  //echo $forum->restriction;

  $status = 0;
  $sql = "INSERT INTO DiscussionBoardTopic (DiscussionBoardId, TopicTitle, TopicDescription, CreatedBy, CreatedDate, Status) VALUES (:discussId, :topic, :description, :CreatedBy, :CreatedDate, :status)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("discussId", $forum->discussId);
    $stmt->bindParam("topic", $forum->title);
    $stmt->bindParam("description", $forum->description);
    $stmt->bindParam("CreatedBy", $user_id);
    $stmt->bindParam("CreatedDate", $tdate);
    $stmt->bindParam("status", $status);

    $stmt->execute();


    echo 'true';
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

}


function joinDiscussion($id) {
  $request = Slim::getInstance()->request();
  $user = json_decode($request->getBody());
  // print_r( $user );
   $user_id  = getUserId();
   $cdate = date('Y-m-d h:i:s');
  $sql = "INSERT INTO DiscussionBoardUsers (DiscussionBoardId, UserId,JoinedDate) VALUES (:DiscussionBoardId, :UserId,:JoinedDate)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("DiscussionBoardId", $id);
    $stmt->bindParam("UserId",  $user_id );
    $stmt->bindParam("JoinedDate",  $cdate);
    $stmt->execute();
    
    //$app->redirect('login.html');
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
echo 'true';
}

function getDiscussionListStatus() {
 
  // print_r( $user );
  $user_id  = getUserId();
   
  $sql = "select DiscussionBoardId from DiscussionBoardUsers where UserId = :user_id";
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



function deleteComment($commentId) {

  $sql = "DELETE FROM DiscussionBoardComments WHERE CommentId=:commentId ";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("commentId", $commentId);  
    $stmt->execute();
   
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
echo 'true';
}

function getProfileDetail() {
 
  // print_r( $user );
   $user_id  = getUserId();
   
  $sql = "select u.user_id, u.first_name, u.last_name,u.email, u.relationship_status, u.mobile,pd.CurrentEmployment,pd.HighestEducation,pd.Endorsedskills from users AS u left join ProfessionalDetails As pd on u.user_id = pd.UserId where u.user_id=:user_id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("user_id",  $user_id );
    $stmt->execute();
    $wine = $stmt->fetchObject();
     $db = null;
      echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
}

function updateProfileDetail() {   
  $request = Slim::getInstance()->request();
  $user = json_decode($request->getBody());

  $user_id  = getUserId();
    // print_r($user);
  $sqlusers = "update users  set first_name=:first_name,last_name=:last_name,email=:email,mobile=:mobile where user_id = :user_id ";
   $sqlpd = "update ProfessionalDetails set CurrentEmployment = :CurrentEmployment,Endorsedskills=:Endorsedskills,HighestEducation=:HighestEducation where UserId = :user_id ";  
      try {
        $db = getConnection();
        $stmt = $db->prepare($sqlusers);
        $stmt->bindParam("user_id", $user_id);
        $stmt->bindParam("first_name", $user->first_name);
        $stmt->bindParam("last_name", $user->last_name);
        $stmt->bindParam("email", $user->email);
        $stmt->bindParam("mobile", $user->mobile);
        $stmt->execute();

        $stmtpd = $db->prepare($sqlpd);
        $stmtpd->bindParam("user_id", $user_id);
        $stmtpd->bindParam("CurrentEmployment", $user->CurrentEmployment);
        $stmtpd->bindParam("Endorsedskills", $user->Endorsedskills);
        $stmtpd->bindParam("HighestEducation", $user->HighestEducation);
        $stmtpd->execute();
      echo 'true';
        //$app->redirect('login.html');
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
 }

function addUserDiscussion() {
  $request = Slim::getInstance()->request();
  $forum = json_decode($request->getBody());
  $headers = apache_request_headers();
  // echo $headers['authorization'];
  $valid = checkValidDiscussion($forum);
  if($valid['status']) {
    $user_id  = getUserId();
    $tdate = date('Y-m-d h:i:s');
    //echo $forum->restriction;
    $restriction = 0;
    if(isset($forum->restriction)) {
      if($forum->restriction != '') {
        $restriction = 1;
      }
      
    }
    $status = 0;
    $sql = "INSERT INTO DiscussionBoard (Topic, Description, StartDate, CreatedBy, CreatedDate, Restricted, RestrictedGender, RestrictedAge, RestrictedLocation, status) VALUES (:Topic, :Description, :StartDate, :CreatedBy, :CreatedDate, :Restricted, :RestrictedGender, :RestrictedAge, :RestrictedLocation, :status)";
    try {
      $db = getConnection();
      $stmt = $db->prepare($sql);
      $stmt->bindParam("Topic", $forum->title);
      $stmt->bindParam("Description", $forum->description);
      $stmt->bindParam("StartDate", $tdate);
      $stmt->bindParam("CreatedBy", $user_id);
      $stmt->bindParam("CreatedDate", $tdate);
      $stmt->bindParam("Restricted", $restriction);
      $stmt->bindParam("RestrictedGender", $forum->gender);
      $stmt->bindParam("RestrictedAge", $forum->age);
      $stmt->bindParam("RestrictedLocation", $forum->location);
      $stmt->bindParam("status", $status);
      $stmt->execute();
  
  
      echo 'true';
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
  }
  else {
    echo $valid['message'];
  }
}

function getTotalMembers($DiscussionBoardId) {
  $sql = "SELECT count(DiscussionBoardId) as total FROM `DiscussionBoardUsers` where DiscussionBoardId = :DiscussionBoardId";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("DiscussionBoardId", $DiscussionBoardId);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function removeUser($DiscussionBoardId) {
  $user_id  = getUserId();
  $sql = "DELETE FROM `DiscussionBoardUsers` WHERE DiscussionBoardId =:DiscussionBoardId and UserId =:user_id ";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("DiscussionBoardId", $DiscussionBoardId);
    $stmt->bindParam("user_id", $user_id);
    $stmt->execute();
    
    echo 'true';
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function getTotalComments($DiscussionBoardId) {
  $sql = "SELECT dbt.DiscussionTopicId,count(dbc.DiscussionTopicId) as TotalComments from DiscussionBoardTopic as dbt Left Join DiscussionBoardComments as dbc on dbc.DiscussionTopicId=dbt.DiscussionTopicId where dbt.DiscussionBoardId=:DiscussionBoardId and dbt.status=1 group by dbt.DiscussionTopicId order by dbt.DiscussionTopicId ";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("DiscussionBoardId", $DiscussionBoardId);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function userJoined($DiscussionBoardId) {
  $user_id  = getUserId();
  $sql = "SELECT count(1) as total FROM `DiscussionBoardUsers` where DiscussionBoardId = :DiscussionBoardId and UserId = :user_id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("DiscussionBoardId", $DiscussionBoardId);
     $stmt->bindParam("user_id", $user_id);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;
     echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}


function updateRating() {
  $request = Slim::getInstance()->request();
  $user = json_decode($request->getBody());
  $sql = "UPDATE DiscussionBoardTopic set rating=:rating where DiscussionTopicId = :DiscussionTopicId";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("DiscussionTopicId", $user->topicId);
     $stmt->bindParam("rating", $user->current);
    $stmt->execute();
    
     echo 'true';
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}



function getRating($topicId) {
   $sql = "SELECT rating from DiscussionBoardTopic where DiscussionTopicId=:disTopicId" ;
   try {   
      $db = getConnection();   
      $stmt = $db->prepare($sql);
      $stmt->bindParam("disTopicId", $topicId);    
      $stmt->execute();
      $wine = $stmt->fetchObject();
      $db = null;
      echo json_encode($wine);
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
  }

function getPicture($id) {
  // $user_id  = getUserId();
  $sql = "SELECT Picture from users where user_id = :id";
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

function getProfilePictures($DiscussionBoardId) {
  // $headers = apache_request_headers();
  // $split = explode(' ', $headers['authorization']);
  // $user_id  = $split[3];
  $sql = "SELECT DBT.DiscussionTopicId,u.Picture from DiscussionBoardTopic As DBT left join users as u on DBT.CreatedBy = u.user_id where DBT.DiscussionBoardId =:DiscussionBoardId and DBT.Status=1 ";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("DiscussionBoardId", $DiscussionBoardId);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
     echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function getPicturesComments($topicId) {
  // $headers = apache_request_headers();
  // $split = explode(' ', $headers['authorization']);
  // $user_id  = $split[3];
  $sql = "SELECT DBC.CommentId, DBC.DiscussionTopicId,u.Picture  FROM `DiscussionBoardComments` as DBC join users as u on DBC.UserId=u.user_id WHERE DBC.DiscussionTopicId =:topicId and DBC.IsValid=1";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("topicId", $topicId);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
     echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function getTotalMemberFromAllDiscussion() {
  $sql = "SELECT db.DiscussionBoardId,count(dbu.DiscussionBoardId) as TotalMember from DiscussionBoard db left join DiscussionBoardUsers dbu on db.DiscussionBoardId=dbu.DiscussionBoardId where db.status = 1 group by db.DiscussionBoardId";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("DiscussionBoardId", $DiscussionBoardId);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

?>