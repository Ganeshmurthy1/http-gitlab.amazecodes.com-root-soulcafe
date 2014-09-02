<?php 
$app->post('/admin_add_discussion', 'checkUser', 'adminAddDiscussion');
$app->post('/admin_get_discussion', 'checkUser', 'adminGetDiscussion');
$app->post('/admin_get_discussion_total', 'checkUser', 'adminGetDiscussionTotal');
$app->get('/admin_delete_discussion/:id', 'checkUser', 'adminDeleteDiscussion');
$app->get('/admin_activate_discussion/:id', 'checkUser', 'adminActivateDiscussion');
$app->get('/admin_deactivate_discussion/:id', 'checkUser', 'adminDeActivateDiscussion');

$app->get('/admin_get_topic_this/:id', 'checkUser', 'adminGetTopicThis');
$app->get('/admin_get_topic_total/:id', 'checkUser', 'adminGetTopicTotal');
$app->post('/admin_get_topic', 'checkUser', 'adminGetTopic');
$app->post('/admin_add_topic', 'checkUser', 'adminAddTopic');

$app->get('/admin_delete_topic/:id', 'checkUser', 'adminDeleteTopic');
$app->get('/admin_activate_topic/:id', 'checkUser', 'adminActivateTopic');
$app->get('/admin_deactivate_topic/:id', 'checkUser', 'adminDeActivateTopic');
$app->get('/adminAbuseList', 'checkUser', 'adminAbuseList');
$app->get('/admin_get_discussion_topic/:id', 'checkUser', 'adminGetDiscussionTopic');
$app->post('/update_discussion_TopicDetail', 'checkUser', 'updatediscussionTopicDetail');

function adminAddDiscussion() {
  $request = Slim::getInstance()->request();
  $forum = json_decode($request->getBody());
  $headers = apache_request_headers();
  // echo $headers['authorization'];
  $valid = checkValidDiscussion($forum);
  if($valid['status']) {
    $split = explode(' ', $headers['authorization']);
    $user_id  = $split[3];
    $tdate = date('Y-m-d h:i:s');
    //echo $forum->restriction;
    $restriction = 0;
    if(isset($forum->restriction)) {
      if($forum->restriction != '') {
        $restriction = 1;
      }
      
    }
    
    $sql = "INSERT INTO DiscussionBoard (Topic, Description, StartDate, CreatedBy, CreatedDate, Restricted, RestrictedGender, RestrictedAge, RestrictedLocation) VALUES (:Topic, :Description, :StartDate, :CreatedBy, :CreatedDate, :Restricted, :RestrictedGender, :RestrictedAge, :RestrictedLocation)";
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

function checkValidDiscussion($forum) {
  
  $result['status'] = true;
  $result['message'] = '';
  
  if($forum->title == '') {
    $result['status'] = false;
    $result['message'] = 'Please enter a forum topic';
  }
  if(isset($forum->restriction) and $forum->restriction != '') {
     if(!isset($forum->gender) and !isset($forum->age) and !isset($forum->location)) {
       $result['status'] = false;
       $result['message'] = 'Please mention any restriction criteria';
     }
  }
  
  return $result;
}

function adminGetDiscussion() {
  
  $request = Slim::getInstance()->request();
  $forum = json_decode($request->getBody());
  $sqlCp = "select * FROM DiscussionBoard ORDER BY CreatedDate desc";
  $lm = ' Limit ' . $forum->start . ',' . $forum->limit;
  $sqlCp .= $lm;
  try {
    $db = getConnection();
    $stmt = $db->prepare($sqlCp);
    //$stmt->bindParam("start", $forum->start);
   // $stmt->bindParam("limit", $forum->limit);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  //echo json_encode($wine);
}

function adminGetDiscussionTotal() {

  $sql = "select count(1) as total FROM DiscussionBoard";
	try {
		$db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $wine = $stmt->fetchObject();
        $db = null;       
        //echo $total = $wine->'count(1)';
        echo json_encode($wine);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}

}

function adminDeleteDiscussion($id) {
  $sql = "Delete from DiscussionBoard  WHERE DiscussionBoardId=:id";
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

function adminActivateDiscussion($id) {
  $sql = "Update DiscussionBoard SET status=1 WHERE DiscussionBoardId=:id";
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

function adminDeActivateDiscussion($id) {
  $sql = "Update DiscussionBoard SET status=0 WHERE DiscussionBoardId=:id";
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

function adminGetTopicThis($id) {

  $sql = "select * FROM DiscussionBoard where 	DiscussionBoardId=:id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;
    //echo $total = $wine->'count(1)';
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

}


function adminGetTopicTotal($id) {

  $sql = "select count(1) as total FROM DiscussionBoardTopic where 	DiscussionBoardId=:id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;
    //echo $total = $wine->'count(1)';
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

}

function adminGetTopic() {
  
  $request = Slim::getInstance()->request();
  $forum = json_decode($request->getBody());
  $sqlCp = "select * FROM DiscussionBoardTopic where DiscussionBoardId=:id ORDER BY CreatedDate desc";
  $lm = ' Limit ' . $forum->start . ',' . $forum->limit;
  $sqlCp .= $lm;
  try {
    $db = getConnection();
    $stmt = $db->prepare($sqlCp);
    $stmt->bindParam("id", $forum->discussId);
   // $stmt->bindParam("limit", $forum->limit);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  //echo json_encode($wine);
}


function adminAddTopic() {
  $request = Slim::getInstance()->request();
  $forum = json_decode($request->getBody());
  $headers = apache_request_headers();
  // echo $headers['authorization'];

    $split = explode(' ', $headers['authorization']);
    $user_id  = $split[3];
    $tdate = date('Y-m-d h:i:s');
    //echo $forum->restriction;
    
    $status = 1;
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

function adminDeleteTopic($id) {
  $sql = "Delete from DiscussionBoardTopic  WHERE DiscussionTopicId=:id";
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

function adminActivateTopic($id) {
  $sql = "Update DiscussionBoardTopic SET status=1 WHERE DiscussionTopicId=:id";
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

function adminDeActivateTopic($id) {
  $sql = "Update DiscussionBoardTopic SET status=0 WHERE DiscussionTopicId=:id";
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

function adminGetDiscussionTopic($id) {

  $sql = "select * FROM DiscussionBoard where   DiscussionBoardId=:id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;
    //echo $total = $wine->'count(1)';
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

}
function updatediscussionTopicDetail() {
  $request = Slim::getInstance()->request();
  $user = json_decode($request->getBody());
    // print_r($user);
    $sql = " UPDATE `DiscussionBoard` SET `Topic`= :topic,`Description`=:description,`Restricted`=:resticted,`RestrictedGender`=:restictedGender,`RestrictedAge`=:restictedAge,`RestrictedLocation`=:restictedLocation where DiscussionBoardId = :disscussionId";
    try {
      $db = getConnection();
      $stmt = $db->prepare($sql);
      $stmt->bindParam("topic", $user->Topic);
      $stmt->bindParam("description", $user->Description);     
      $stmt->bindParam("resticted", $user->Restricted); 
      $stmt->bindParam("restictedGender", $user->RestrictedGender); 
      $stmt->bindParam("restictedAge", $user->RestrictedAge); 
       $stmt->bindParam("restictedLocation", $user->RestrictedLocation); 
        $stmt->bindParam("disscussionId", $user->discussId); 
      $stmt->execute();
      echo 'true';
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
 
}

function adminAbuseList() {
  

  // $sqlCp = "select * FROM DiscussionBoardTopic where DiscussionBoardId=:id ORDER BY CreatedDate desc";
 
  try {
    $db = getConnection();
    $stmt = $db->prepare($sqlCp);
    $stmt->bindParam("id", $forum->discussId);
   // $stmt->bindParam("limit", $forum->limit);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  //echo json_encode($wine);
}


?>