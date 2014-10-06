<?php 
$app->post('/admin_add_discussion',  'adminAddDiscussion');
$app->post('/admin_get_discussion', 'adminGetDiscussion');
$app->post('/admin_get_discussion_total',  'adminGetDiscussionTotal');
$app->get('/admin_delete_discussion/:id',  'adminDeleteDiscussion');
$app->get('/admin_activate_discussion/:id',  'adminActivateDiscussion');
$app->get('/admin_deactivate_discussion/:id',  'adminDeActivateDiscussion');

$app->get('/admin_get_topic_this/:id',  'adminGetTopicThis');
$app->get('/admin_get_topic_total/:id',  'adminGetTopicTotal');
$app->post('/admin_get_topic',  'adminGetTopic');
$app->post('/admin_add_topic',  'adminAddTopic');

$app->get('/admin_delete_topic/:id',  'adminDeleteTopic');
$app->get('/admin_activate_topic/:id',  'adminActivateTopic');
$app->get('/admin_deactivate_topic/:id',  'adminDeActivateTopic');
$app->get('/adminAbuseList',  'adminAbuseList');
$app->get('/admin_get_discussion_topic/:id',  'adminGetDiscussionTopic');
$app->post('/update_discussion_TopicDetail',  'updatediscussionTopicDetail');
$app->get('/update_Appropriate/:id',  'updateAppropriate');
$app->get('/update_InAppropriate/:id',  'updateInAppropriate');
$app->get('/get_forum/:DiscussionBoardId', 'getforum');
$app->post('/edit_forum',  'editforum');
$app->get('/adminInappropriateComment',  'adminInappropriateComment');

$app->post('/admin_get_bad_list',  'adminGetBadList');
$app->get('/admin_not_spam/:id',  'adminNotASpam');
$app->get('/admin_mark_spam/:id',  'adminMarkSpam');
$app->post('/image_upload', 'imageupload');
function adminAddDiscussion() {
  $request = Slim::getInstance()->request();
  $forum = json_decode($request->getBody());
  
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
    
    $sqlUser = "select * from users where user_id Not IN(select user_id from users where user_id=:user_id)";
    try {
      $db = getConnection();
      $stmtUser = $db->prepare($sqlUser);
      $stmtUser->bindParam("user_id", $user_id);
      $stmtUser->execute();
      $wineUser = $stmtUser->fetchAll(PDO::FETCH_OBJ);
      $db = null;
    //echo $total = $wine->'count(1)';
     // echo json_encode($wineUser);
      // print_r($wineUser);
      // echo 'true';
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
    $status=0;
    $DateTime=  date("Y-m-d") ;
    foreach($wineUser as $obj) {
      $forumname = $forum->title;
      $link = 'discussion-list';
      $message ='New forum '.$forumname.' got added.';
        $sqlSN = "Insert into SystemNotification (userId,Message,ViewStatus,AddedDate,Link) values (:userId,:Message,:ViewStatus,:AddedDate,:Link)";
    try {
      $db = getConnection();
      $stmtSN = $db->prepare($sqlSN);  
      $stmtSN->bindParam("userId", $obj->user_id);
      $stmtSN->bindParam("Message", $message);
      $stmtSN->bindParam("ViewStatus", $status);
      $stmtSN->bindParam("AddedDate", $DateTime);
      $stmtSN->bindParam("Link", $link);
      $stmtSN->execute();
       // echo 'true';
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
    }







    $sql = "INSERT INTO DiscussionBoard (Topic, Description, StartDate, CreatedBy, CreatedDate, Restricted, RestrictedGender, RestrictedAge, RestrictedLocation,Image) VALUES (:Topic, :Description, :StartDate, :CreatedBy, :CreatedDate, :Restricted, :RestrictedGender, :RestrictedAge, :RestrictedLocation,:image)";
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
      $stmt->bindParam("image", $forum->image);
  
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
  $sqlCp = "select db.DiscussionBoardId,db.Topic,db.Description,db.CreatedBy,db.Status,u.Picture from DiscussionBoard as db left join users as u on db.CreatedBy=u.user_id order by db.CreatedBy desc";
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
  $sqlCp = "select dbt.DiscussionTopicId, dbt.DiscussionBoardId, dbt.TopicTitle, dbt.TopicDescription, dbt.CreatedBy, dbt.Status, u.Picture FROM DiscussionBoardTopic as dbt left join users as u on dbt.CreatedBy = u.user_id where DiscussionBoardId=:id ORDER BY CreatedDate desc";
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
   $user = json_decode($request->getBody());
   // print_r($user->discussId);
  $user_id  = getUserId();
  $tdate = date('Y-m-d h:i:s');
    //echo $forum->restriction;
   $status = 1;
   $viewstatus = 0;
   $title = $forum->title;
   $message = 'The '.$title.'is got added to Forum.';
   $sqlUser = "SELECT UserId from DiscussionBoardUsers where DiscussionBoardId = :id";
    try {
      $db = getConnection();
      $stmtUser = $db->prepare($sqlUser);
      $stmtUser->bindParam("id", $user->discussId);
      $stmtUser->execute();
      $wineUser = $stmtUser->fetchAll(PDO::FETCH_OBJ);
      $db = null;
    //echo $total = $wine->'count(1)';
     // echo json_encode($wineUser);
      // print_r($wineUser);
      // echo 'true';
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

    foreach($wineUser as $obj) {
      $id=$user->discussId;
      $link = 'discussion-topics?id='.$id;
        $sqlFN = "INSERT INTO ForumNotification (UserId,Message,ViewStatus,AddedDate,Link) VALUES (:UserId, :Message, :ViewStatus, :AddedDate,:Link)";
    try {
      $db = getConnection();
      $stmtFN = $db->prepare($sqlFN);
      $stmtFN->bindParam("UserId", $obj->UserId);
      $stmtFN->bindParam("Message", $message);
      $stmtFN->bindParam("ViewStatus", $viewstatus);
      $stmtFN->bindParam("AddedDate", $tdate);
      $stmtFN->bindParam("Link", $link);
      $stmtFN->execute();
       // echo 'true';
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
    }

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
  

   $sql = "select DBA.CommentId, DBA.ReportedBy, DBA.Comments, DBA.ReportedDate,DBC.DiscussionTopicId,DBT.TopicTitle,DBT.DiscussionBoardId,DB.Topic from DiscussionBoardAbuse As DBA Inner Join DiscussionBoardComments As DBC Inner join DiscussionBoardTopic As DBT Inner Join DiscussionBoard As DB ON DBA.CommentId =DBC.CommentId and DBC.DiscussionTopicId = DBT.DiscussionTopicId and DB.DiscussionBoardId = DBT.DiscussionBoardId where DBA.Spam=1 ORDER BY DBA.ReportedDate desc ";
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

function updateAppropriate($id) {
  // $sql = "UPDATE `DiscussionBoardAbuse` As `DBA`, `DiscussionBoardComments` As `DBC` SET DBA.Status= "1", DBC.IsValid = "1" where DBA.CommentId = :id";
  $sql = " update DiscussionBoardAbuse As DBA inner join DiscussionBoardComments As DBC on DBA.CommentId = DBC.CommentId set DBA.Status= 1, DBC.IsValid = 1 where DBA.CommentId = :id";
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


function updateInAppropriate($id) {
  
  $sql = "update DiscussionBoardAbuse As DBA inner join DiscussionBoardComments As DBC on DBA.CommentId = DBC.CommentId set DBA.Status= 0,DBA.Spam= 0, DBC.IsValid = 0 where DBA.CommentId = :id";
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

function getforum($DiscussionBoardId) {
  // $headers = apache_request_headers();
  // $split = explode(' ', $headers['authorization']);
  // $user_id  = $split[3];
  $sql = "SELECT DiscussionBoardId,Topic,Description FROM `DiscussionBoard` WHERE DiscussionBoardId =:DiscussionBoardId";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("DiscussionBoardId", $DiscussionBoardId);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;
   echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}


function editforum() {
   $request = Slim::getInstance()->request();
  $user = json_decode($request->getBody());
  // print_r($user->Topic);
  $sql = "Update DiscussionBoard SET Topic=:topic,Description=:description WHERE DiscussionBoardId=:id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("topic",$user->Topic);
    $stmt->bindParam("description",$user->Description);
    $stmt->bindParam("id",$user->DiscussionBoardId);
    $stmt->execute();
    echo 'true';
    //echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

}


function adminGetBadList() {

  $request = Slim::getInstance()->request();
  $forum = json_decode($request->getBody());
  $sqlCp = "select dc.*, u.first_name, u.Picture, dp.TopicTitle from DiscussionBoardComments dc JOIN users u on dc.UserId=u.user_id JOIN DiscussionBoardTopic dp ON dc.DiscussionTopicId=dp.DiscussionTopicId where dc.profane=1";
  //$lm = ' Limit ' . $forum->start . ',' . $forum->limit;
  //$sqlCp .= $lm;
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

function adminInappropriateComment() {
  

   $sql = "SELECT dba.CommentId,dba.Comments,dba.ReportedBy,dba.ReportedDate,dbt.DiscussionTopicId,dbt.TopicTitle from  DiscussionBoardAbuse as dba left join DiscussionBoardComments as dbc on dba.CommentId=dbc.CommentId left join DiscussionBoardTopic as dbt on  dbc.DiscussionTopicId = dbt.DiscussionTopicId where dba.Spam = 0";
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

function adminNotASpam($id) {
 $sql = "Update DiscussionBoardComments SET profane=0 WHERE CommentId=:id";
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

function adminMarkSpam($id) {
  $sql = "Delete from DiscussionBoardComments  WHERE CommentId=:id";
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

function imageupload() {

 if ( !empty( $_FILES ) ) {

    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    print $uploadPath = dirname(dirname( __FILE__ )) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];

    move_uploaded_file( $tempPath, $uploadPath );
  
    $answer = array( 'answer' => 'File transfer completed' );
    $json = json_encode( $answer );

    echo $json;

} else {

    echo 'No files';

}

}
?>
