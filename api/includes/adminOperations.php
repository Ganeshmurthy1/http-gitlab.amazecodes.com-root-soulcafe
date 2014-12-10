<?php

$app->post('/admin_login', 'checkAdminLogin');
$app->get('/admin_get_all_users', 'adminGetAllUsers');
$app->get('/admin_get_blocked_users', 'adminGetBlockedUsers');

$app->get('/admin_activate_user/:id', 'adminActivateUser');
$app->get('/admin_deactivate_user/:id', 'adminDeactivateUser');

$app->get('/admin_get_all_message', 'adminGetAllMessage');

$app->get('/get_total_sys_message/:id', 'getTotalSysMessage');
$app->get('/get_total_message/:id', 'getTotalMessage');
$app->get('/get_total_forum_message/:id', 'getTotalForumMessage');

$app->get('/get_Total_Notification/:id', 'getTotalNotification');

$app->get('/sys_mark_message', 'sysMarkMessage');
$app->get('/mark_message', 'MarkMessage');
$app->get('/forum_mark_message', 'ForumMarkMessage');

$app->get('/get_my_message', 'getMyMessage');

$app->get('/get_picture_name/:id', 'checkUser','getPictureName');

$app->post('/sent_message','checkUser','sentMessage');

$app->get('/get_all_forum', 'GetAllForum');

$app->post('/admin_add_admin', 'adminAddAdmin');

$app->get('/get_all_admins', 'GetAllAdmins');

$app->get('/admin_get_my_forums', 'adminGetMyForums');

$app->get('/activate_user/:id', 'activateUser');
$app->get('/deactivate_user/:id', 'deactivateUser');

$app->get('/get_admin_data/:id', 'getAdminData');
$app->post('/update_admin_data', 'updateAdminData');

$app->get('/view_profile_data/:id', 'viewProfileData');

$app->get('/user_activate/:id', 'useractivate');
$app->get('/user_deactivate/:id', 'userdeactivate');

$app->get('/admin_get_this_user/:id', 'adminGetThisUser');

$app->post('/admin_add_message', 'adminAddMessage');

$app->get('/get_sys_message', 'getSysMessage');

$app->get('/get_all_questions', 'GetAllQuestions');

$app->post('/update_Question_Seq', 'updateQuestionSequence');

$app->get('/delete_Question/:id', 'deleteQuestion');

$app->get('/view_StatusAbuse/:id', 'viewStatusAbuse');

$app->get('/admin_GetAllProfileData', 'adminGetAllProfileData');


function checkAdminLogin() {
  $request = Slim::getInstance()->request();
  $user = json_decode($request->getBody());
  //$user_id  = getUserId();

   $sqlS = "SELECT Status from AdminUser where Uname = :username and Password = :password";
  try {
    $db = getConnection();
    $stmtS = $db->prepare($sqlS);
    $stmtS->bindParam("username", $user->user_name);
    $stmtS->bindParam("password", $user->password);
    $stmtS->execute();
    $wineS = $stmtS->fetchObject();
    $db = null;
    // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  if ($wineS == false) {
    echo 'false';
  }else if ($wineS->Status == 0) {
    echo 'Status';
  }else if($wineS->Status == 1){
  $sqlU = "Select AdminId,FullName,Role from AdminUser where Uname = :username and Password = :password and Status = 1";
  try{
    $db = getConnection();
    $stmtU = $db->prepare($sqlU);
    $stmtU->bindParam("username", $user->user_name);
    $stmtU->bindParam("password", $user->password);
    $stmtU->execute();
    $wineU = $stmtU->fetchObject();
    $db = null;
    //print_r ($wineU);
    if($wineU != false) {
      $token = bin2hex(openssl_random_pseudo_bytes(16));
      $sql = "Update AdminUser SET access_tocken=:token WHERE Uname = :username";
      try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("token", $token);
        $stmt->bindParam("username", $user->user_name);
        $stmt->execute();
      
        $wineU->token = $token;
        //echo json_encode($wine);
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
      echo json_encode($wineU);
    }
    
  }catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  } 
}
}


function adminGetAllUsers() {

  $sql = "SELECT * from users where status=1";
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

function adminGetBlockedUsers() {

  $sql = "SELECT * from users where status=0";
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

function adminActivateUser($id) {
  $sql = "Update users SET status=1 WHERE user_id=:id";
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

function adminDeactivateUser($id) {
  $sql = "Update users SET status=0 WHERE user_id=:id";
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

function adminGetAllMessage() {

  $sql = "SELECT ru.*, u.first_name as sender, us.first_name as user from ReportAbuseUser ru JOIN users u on ru.SenderId=u.user_id JOIN users us on ru.UserId=us.user_id where ru.status=0 order by AddedDate desc";
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


function getTotalNotification($id) {

  $sql = "SELECT count(1) as total from SystemNotification where userId=:user_id and ViewStatus=0 order by AddedDate desc";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id", $id);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;
    //echo $total = $wine->'count(1)';

    // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

  $sqlM = "SELECT count(1) as total from Messages where UserId=:user_id and ViewStatus=0 order by AddedDate desc";
  try {
    $db = getConnection();
    $stmtM = $db->prepare($sqlM);
    $stmtM->bindParam("user_id", $id);
    $stmtM->execute();
    $wineM = $stmtM->fetchObject();
    $db = null;
    //echo $total = $wine->'count(1)';

    // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

  $sqlFN = "SELECT count(1) as total from ForumNotification where userId=:user_id and ViewStatus=0 order by AddedDate desc";
  try {
    $db = getConnection();
    $stmtFN = $db->prepare($sqlFN);
    $stmtFN->bindParam("user_id", $id);
    $stmtFN->execute();
    $wineFN = $stmtFN->fetchObject();
    $db = null;
    //echo $total = $wine->'count(1)';

    // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

  $notification['system'] = $wine;
  $notification['message'] = $wineM;
  $notification['forum'] = $wineFN;
  echo json_encode($notification);
}

function getTotalSysMessage($id) {

  $sql = "SELECT count(1) as total from SystemNotification where userId=:user_id and ViewStatus=0 order by AddedDate desc";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id", $id);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;
    //echo $total = $wine->'count(1)';

    // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function getTotalMessage($id) {

  $sql = "SELECT count(1) as total from Messages where UserId=:user_id and ViewStatus=0 order by AddedDate desc";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id", $id);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;
    //echo $total = $wine->'count(1)';

    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  //echo json_encode($wine);
}

function getTotalForumMessage($id) {

  $sql = "SELECT count(1) as total from ForumNotification where userId=:user_id and ViewStatus=0 order by AddedDate desc";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id", $id);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;
    //echo $total = $wine->'count(1)';

    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  //echo json_encode($wine);
}

function sysMarkMessage() {
  $user_id  = getUserId();
  
  $sql = "SELECT * from SystemNotification where userId=:user_id order by AddedDate desc limit 0,10";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id", $user_id);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    //echo $total = $wine->'count(1)';
  
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  
  
  $sql = "Update SystemNotification SET ViewStatus=1 WHERE userId=:id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $user_id);
    $stmt->execute();
    //echo 'true';
    //echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

}

function MarkMessage() {
  $user_id  = getUserId();

  $sql = "SELECT u.first_name, m.* from Messages m JOIN users u on m.SenderId=u.user_id where m.UserId=:user_id order by m.AddedDate desc limit 0,10";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id", $user_id);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    //print_r($wine);
    //echo $total = $wine->'count(1)';
    for ($i=0; $i<count($wine); $i++) {
      //print $wine[$i]->Message;
      $wine[$i]->mess = $wine[$i]->first_name . ' has sent you a message';
      unset($wine[$i]->Message);
    }

    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }


    $sql = "Update Messages SET ViewStatus=1 WHERE userId=:id";
    try {
      $db = getConnection();
      $stmt = $db->prepare($sql);
      $stmt->bindParam("id", $user_id);
      $stmt->execute();
      //echo 'true';
      //echo json_encode($wine);
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

  }
  
  function ForumMarkMessage() {
    $user_id  = getUserId();
  
    $sql = "SELECT * from ForumNotification where UserId=:user_id order by AddedDate desc limit 0,10";
    try {
      $db = getConnection();
      $stmt = $db->prepare($sql);
      $stmt->bindParam("user_id", $user_id);
      $stmt->execute();
      $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
      $db = null;
      //echo $total = $wine->'count(1)';
  
      echo json_encode($wine);
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
  
  
    $sql = "Update ForumNotification SET ViewStatus=1 WHERE userId=:id";
    try {
      $db = getConnection();
      $stmt = $db->prepare($sql);
      $stmt->bindParam("id", $user_id);
      $stmt->execute();
      //echo 'true';
      //echo json_encode($wine);
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
  
  }
  
  function getMyMessage() {
    $user_id  = getUserId();
  
    $sql = "SELECT u.first_name, u.Picture, m.* from Messages m JOIN users u on m.SenderId=u.user_id where m.UserId=:user_id order by m.AddedDate desc";
    try {
      $db = getConnection();
      $stmt = $db->prepare($sql);
      $stmt->bindParam("user_id", $user_id);
      $stmt->execute();
      $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
      $db = null;
      //print_r($wine);
      //echo $total = $wine->'count(1)';
      for ($i=0; $i<count($wine); $i++) {
        //print $wine[$i]->Message;
        $wine[$i]->mess = $wine[$i]->first_name . ' has sent you a message';
       // unset($wine[$i]->Message);
      }
  
      echo json_encode($wine);
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
  
  
    //     $sql = "Update Messages SET ViewStatus=1 WHERE userId=:id";
    //     try {
    //       $db = getConnection();
    //       $stmt = $db->prepare($sql);
    //       $stmt->bindParam("id", $user_id);
    //       $stmt->execute();
    //       //echo 'true';
    //       //echo json_encode($wine);
    //     } catch(PDOException $e) {
    //       echo '{"error":{"text":'. $e->getMessage() .'}}';
    //     }
  
    }
    
    function getPictureName($id) {
      // $user_id  = getUserId();
      $sql = "SELECT Picture, first_name from users where user_id = :id";
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
    
    function sentMessage() {
      $request = Slim::getInstance()->request();
      $comments = json_decode($request->getBody());
    
      $user_id  = getUserId();
      $cmtDateTime=  date("Y-m-d") ;   
      $view_stat = 0;
      $link = 'my-messages';  
    
      $sql = "INSERT INTO Messages (SenderId, UserId,Message, AddedDate,ViewStatus,Link) VALUES ( :SenderId,:UserId ,:Message,:AddedDate ,:ViewStatus,:Link)";
    
    
      try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("SenderId", $user_id);
        $stmt->bindParam("UserId", $comments->uid);
        $stmt->bindParam("Message", $comments->comment);
        $stmt->bindParam("AddedDate", $cmtDateTime);
        $stmt->bindParam("ViewStatus", $view_stat);
        $stmt->bindParam("Link", $link);
        //$stmt->bindParam("profane", $profane);
        $stmt->execute();
        //   echo 'true';
        //$app->redirect('login.html');
      }
      catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
    }
    
    
    function GetAllForum() {
    
      $sql = "SELECT DiscussionBoardId, Topic from DiscussionBoard where Status=1";
      try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        // $stmt->bindParam("id", $id);
        $stmt->execute();
        $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        //echo $total = $wine->'count(1)';
        for ($i=0; $i<count($wine); $i++) {
          //print $wine[$i]->Message;
          $wine[$i]->checked = false;
          //unset($wine[$i]->Message);
        }
        
        
        echo json_encode($wine);
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
      //echo json_encode($wine);
    }
    
    function adminAddAdmin() {
      $request = Slim::getInstance()->request();
      $forum = json_decode($request->getBody());
      $role = 2;
      $tdate = date('Y-m-d');
      $status = 1;
      $name = '';
      
      $frs = $forum->frs;
      //print_r($frs);
      
        $sql = "INSERT INTO AdminUser (Uname, Password, Email, Role, Fullname, AddedDate, Status) VALUES (:Uname, :Password, :Email, :Role, :Fullname, :AddedDate, :Status)";
        try {
          $db = getConnection();
          $stmt = $db->prepare($sql);
          $stmt->bindParam("Uname", $forum->username);
          $stmt->bindParam("Password", $forum->password);
          $stmt->bindParam("Email", $forum->email);
          $stmt->bindParam("Role", $role);
          $stmt->bindParam("Fullname", $name);
          $stmt->bindParam("AddedDate", $tdate);
          $stmt->bindParam("Status", $status);
         
    
          $stmt->execute();
          $uid =  $db->lastInsertId();
          
          $usr=$forum->username;
          $pass=$forum->password;
          $to = $forum->email;
          $subject = "You are added as Admin in Soulcafe";
          $message = "Please use these credentials to login Username = ".$usr." Password = ".$pass;
          $header = "From:abhik@amazecodes.com \r\n";
          mail ($to,$subject,$message,$header);
      
          echo 'true';
        } catch(PDOException $e) {
          echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
        
        $per_id = 1;
        for ($i=0; $i<count($frs); $i++) {
          $sql = "INSERT INTO UserPermissions (userId, PermissionId, ItemId) VALUES (:userId, :PermissionId, :ItemId)";
          try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("userId", $uid);
            $stmt->bindParam("PermissionId", $per_id);
            $stmt->bindParam("ItemId", $frs[$i]);
                  
            $stmt->execute();
          
          
           // echo 'true';
          } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
          }
        }
     
    }


    function GetAllAdmins() {
      // $user_id  = getUserId();
      $sql = "SELECT * FROM `AdminUser` WHERE Role = 2";
      try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($wine);
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
    }

function adminGetMyForums() {
    
      $user_id = getUserId();
      $request = Slim::getInstance()->request();
      $forum = json_decode($request->getBody());
      $sqlCp = "select db.DiscussionBoardId,db.Topic,db.Description,db.CreatedBy,db.Status from DiscussionBoard as db join UserPermissions as u on db.DiscussionBoardId=u.ItemId where u.userId=:user_id and u.PermissionId=1 order by db.CreatedBy desc";
    //  $lm = ' Limit ' . $forum->start . ',' . $forum->limit;
    //  $sqlCp .= $lm;
      try {
        $db = getConnection();
        $stmt = $db->prepare($sqlCp);
        $stmt->bindParam("user_id", $user_id);
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
    

    function activateUser($id) {
      // $user_id  = getUserId();
      $sql = "Update AdminUser Set Status = 1 where AdminId = :id";
      try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        
        echo 'true';
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
    }


    function deactivateUser($id) {
      // $user_id  = getUserId();
      $sql = "Update AdminUser Set Status = 0 where AdminId = :id";
      try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        echo 'true';
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
    }

    


    function getAdminData($id) {
      // $user_id  = getUserId();
      $sql = "SELECT * from AdminUser where AdminId = :id";
      try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($wine);
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
    }

    
    function updateAdminData() {
      // $user_id  = getUserId();
       $request = Slim::getInstance()->request();
      $admin = json_decode($request->getBody());
      $sql = "Update AdminUser Set Uname = :uname,Email=:email where AdminId = :id";
      try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $admin->AdminId);
        $stmt->bindParam("uname", $admin->Uname);
        $stmt->bindParam("email", $admin->Email);
        $stmt->execute();
        
        echo 'true';
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
    }


function viewProfileData($userid) {
      // $user_id  = getUserId();
      $sqlM = "SELECT m.UserId,m.AddedDate,m.Message,u.first_name,u.last_name from Messages as m inner join users as u on m.SenderId=u.user_id where m.SenderId=:userid ";
      try {
        $db = getConnection();
        $stmtM = $db->prepare($sqlM);
        $stmtM->bindParam("userid", $userid);
        $stmtM->execute();
        $wineM = $stmtM->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        // echo json_encode($wine);
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }

      $sqlGTKY= "SELECT b.BuddyId,b.AddedDate,b.Status,u.first_name,u.last_name FROM Buddies as b inner join users as u on b.senderId = u.user_id WHERE SenderId =:userid ";
      try {
        $db = getConnection();
        $stmtGTKY = $db->prepare($sqlGTKY);
        $stmtGTKY->bindParam("userid", $userid);
        $stmtGTKY->execute();
        $wineGTKY = $stmtGTKY->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        // echo json_encode($wine);
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }

      $sqlC= "SELECT dbc.DiscussionTopicId,dbt.DiscussionBoardId,db.Topic,dbt.TopicTitle,dbc.Comment,dbc.CommentDateTime,u.first_name,u.last_name FROM `DiscussionBoardComments` as dbc inner join DiscussionBoardTopic as dbt on dbc.DiscussionTopicId = dbt.DiscussionTopicId inner join DiscussionBoard as db on dbt.DiscussionBoardId = db.DiscussionBoardId inner join users as u on dbc.UserId = u.user_id where dbc.UserId=:userid ";
      try {
        $db = getConnection();
        $stmtC = $db->prepare($sqlC);
        $stmtC->bindParam("userid", $userid);
        $stmtC->execute();
        $wineC = $stmtC->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        // echo json_encode($wine);
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }

      $sqlT= "SELECT dbt.DiscussionBoardId,db.Topic,dbt.TopicTitle,dbt.CreatedDate,u.first_name,u.last_name FROM DiscussionBoardTopic as dbt inner join DiscussionBoard as db on dbt.DiscussionBoardId = db.DiscussionBoardId inner join users as u on dbt.CreatedBy = u.user_id where dbt.CreatedBy =:userid ";
      try {
        $db = getConnection();
        $stmtT = $db->prepare($sqlT);
        $stmtT->bindParam("userid", $userid);
        $stmtT->execute();
        $wineT = $stmtT->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        // echo json_encode($wine);
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }

    // $op['message']=json_encode($wineM);
    // $op['gtky']=json_encode($wineGTKY);
    // $op['comments']=json_encode($wineC);
    // $op['topics']=json_encode($wineT);

    $op['message']=$wineM;
    $op['gtky']=$wineGTKY;
    $op['comments']=$wineC;
    $op['topics']=$wineT;

     echo json_encode($op);
    }
    
function useractivate($userid) {
      // $user_id  = getUserId();
      $sql = "Update users set status = 1 where user_id =:userid ";
      try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("userid", $userid);
        $stmt->execute();
        
        echo 'true';
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
    }

    function userdeactivate($userid) {
      // $user_id  = getUserId();
      $sql = "Update users set status = 0 where user_id =:userid ";
      try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("userid", $userid);
        $stmt->execute();
        
        echo 'true';
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
    }
function adminGetThisUser($userid) {
  //echo $userid;
  $name = '%'. $userid . '%';
  $sql = "SELECT first_name from users where status=1 and first_name LIKE :user_id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id", $name);
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

function adminAddMessage() {
  $request = Slim::getInstance()->request();
  $forum = json_decode($request->getBody());
  $status=0;
  $DateTime=  date("Y-m-d h:i:s") ;

  
   if($forum->all == 1){
    // print_r('1');
     $sql = "select user_id FROM users where status = 1";
    try {
      $db = getConnection();
      $stmt = $db->prepare($sql);
      $stmt->bindParam("name", $forum->to);
      $stmt->execute();
      $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
      $db = null;
      //echo $total = $wine->'count(1)';
      //echo json_encode($wine);
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

    foreach($wine as $obj){
      $link = 'system-messages';
      $message = $forum->mess;
      $user_id = $obj->user_id;
      $sqlSN = "Insert into SystemNotification (userId,Message,ViewStatus,AddedDate,Link) values (:userId,:Message,:ViewStatus,:AddedDate,:Link)";
      try {
        $db = getConnection();
        $stmtSN = $db->prepare($sqlSN);
        $stmtSN->bindParam("userId", $user_id);
        $stmtSN->bindParam("Message", $message);
        $stmtSN->bindParam("ViewStatus", $status);
        $stmtSN->bindParam("AddedDate", $DateTime);
        $stmtSN->bindParam("Link", $link);
        $stmtSN->execute();
       
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
    }
     echo 'true';
  }else{
     // print_r('0');
    $sql = "select user_id FROM users where first_name = :name";
    try {
      $db = getConnection();
      $stmt = $db->prepare($sql);
      $stmt->bindParam("name", $forum->to);
      $stmt->execute();
      $wine = $stmt->fetchObject();
      $db = null;
      //echo $total = $wine->'count(1)';
      //echo json_encode($wine);
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
  
     // $forumname = $forum->title;
      $link = 'system-messages';
      $message = $forum->mess;
      $user_id = $wine->user_id;
      $sqlSN = "Insert into SystemNotification (userId,Message,ViewStatus,AddedDate,Link) values (:userId,:Message,:ViewStatus,:AddedDate,:Link)";
      try {
        $db = getConnection();
        $stmtSN = $db->prepare($sqlSN);
        $stmtSN->bindParam("userId", $user_id);
        $stmtSN->bindParam("Message", $message);
        $stmtSN->bindParam("ViewStatus", $status);
        $stmtSN->bindParam("AddedDate", $DateTime);
        $stmtSN->bindParam("Link", $link);
        $stmtSN->execute();
        echo 'true';
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
  }
  
}

function getSysMessage() {
  $user_id  = getUserId();

  $sql = "SELECT * FROM SystemNotification  where userId=:user_id order by AddedDate desc";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id", $user_id);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  } 

}

function GetAllQuestions() {
  // $user_id  = getUserId();
  $sql = "SELECT q.*, qc.Category, at.AlgTypeTitle FROM `Questionnaire` q JOIN QuestionnaireCategory qc ON q.QuestionCategory = qc.QcId  JOIN AlgorithamType at ON q.AlgorithamType=at.AlgTypeId order by Sequence";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}


function updateQuestionSequence() {
  $request = Slim::getInstance()->request();
  $ques = json_decode($request->getBody());
  // print_r($ques);
  $index = 0;
  foreach($ques as $obj) {
    
    $obj->Sequence = $index;
    // print_r($obj);
    $index++;

    $sql = "UPDATE `Questionnaire` SET `Qid`=:qid,`QuestionTitle`=:title,`Description`=:des,`AnswerSelectionType`=:anstype,`Sequence`=:seq,`QuestionCategory`=:quecat,
    `AlgorithamType`=:algtype,`MaxOptions`=:maxopt,`MaxScore`=:maxscr,`DateAdded`=:dtadded WHERE Qid = :qid";
    try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("qid", $obj->Qid);
    $stmt->bindParam("title", $obj->QuestionTitle);
    $stmt->bindParam("des", $obj->Description);
    $stmt->bindParam("anstype", $obj->AnswerSelectionType);
    $stmt->bindParam("seq", $obj->Sequence);
    $stmt->bindParam("quecat", $obj->QuestionCategory);
    $stmt->bindParam("algtype", $obj->AlgorithamType);
    $stmt->bindParam("maxopt", $obj->MaxOptions);
    $stmt->bindParam("maxscr", $obj->MaxScore);
    $stmt->bindParam("dtadded", $obj->DateAdded);
    $stmt->execute();
   
    
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

    }
    echo 'true';

}

function deleteQuestion($id) {
  // $user_id  = getUserId();
  $sql = "DELETE FROM `Questionnaire` WHERE Qid = :id";
  $sql1 = "DELETE FROM `QuestionnaireAnswer` WHERE QId = :id";
  $sql2 = "DELETE FROM `QuestionnaireOptions` WHERE QId = :id";
  $sql3 = "DELETE FROM `QuestionnaireUserAnswer` WHERE QnId = :id";
  $sql4 = "DELETE FROM `AlgorithamLogic` WHERE QuestionId = :id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt1 = $db->prepare($sql1);
    $stmt2 = $db->prepare($sql2);
    $stmt3 = $db->prepare($sql3);
    $stmt4 = $db->prepare($sql4);
    $stmt->bindParam("id", $id);
    $stmt1->bindParam("id", $id);
    $stmt2->bindParam("id", $id);
    $stmt3->bindParam("id", $id);
    $stmt4->bindParam("id", $id);
    $stmt->execute();
    $stmt1->execute();
    $stmt2->execute();
    $stmt3->execute();
    $stmt4->execute();
    
    echo 'true';
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function viewStatusAbuse($id) {
  // $user_id  = getUserId();
  $sql = "Update ReportAbuseUser set ViewStatus = 1 where SenderId=:id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    
    echo 'true';
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}


function adminGetAllProfileData() {
  // $user_id  = getUserId();
  $sql = "SELECT count(Role) as admins FROM AdminUser WHERE Role=2";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    // echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

  $sqlAU = "SELECT count(user_id) as active FROM users WHERE Status=1 ";
  try {
    $db = getConnection();
    $stmtAU = $db->prepare($sqlAU);
    $stmtAU->execute();
    $wineAU = $stmtAU->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    // echo json_encode($wineAU);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

  $sqlBU = "SELECT count(user_id) as blocked FROM users WHERE Status=0 ";
  try {
    $db = getConnection();
    $stmtBU = $db->prepare($sqlBU);
    $stmtBU->execute();
    $wineBU = $stmtBU->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    // echo json_encode($wineBU);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

  $sqlUM = "SELECT count(Id) as unread FROM `ReportAbuseUser` WHERE ViewStatus = 0  ";
  try {
    $db = getConnection();
    $stmtUM = $db->prepare($sqlUM);
    $stmtUM->execute();
    $wineUM = $stmtUM->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    // echo json_encode($wineUM);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

  $op['admins']=$wine;
  $op['active']=$wineAU;
  $op['blocked']=$wineBU;
  $op['unread']=$wineUM;

  echo json_encode($op);
}
