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

function checkAdminLogin() {
  $request = Slim::getInstance()->request();
  $user = json_decode($request->getBody());
  //$user_id  = getUserId();
 
  $sqlU = "Select AdminId,FullName,Role from AdminUser where Uname = :username and Password = :password";
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
    else {
      echo 'false';
    }
  }catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
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

    echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  //echo json_encode($wine);
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
  
  $sql = "SELECT * from SystemNotification where userId=:user_id and ViewStatus=0 order by AddedDate desc";
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

  $sql = "SELECT u.first_name, m.* from Messages m JOIN users u on m.SenderId=u.user_id where m.UserId=:user_id and m.ViewStatus=0 order by m.AddedDate desc";
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
  
    $sql = "SELECT * from ForumNotification where UserId=:user_id and ViewStatus=0 order by AddedDate desc";
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