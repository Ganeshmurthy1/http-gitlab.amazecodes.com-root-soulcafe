<?php 
$app->post('/admin_add_discussion', 'checkUser', 'adminAddDiscussion');

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


?>