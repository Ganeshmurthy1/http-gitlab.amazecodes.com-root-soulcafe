<?php

$app->get('/alg_get_category', 'algGetQusCategory');
$app->get('/alg_get_type', 'algGetQusType');
$app->get('/alg_get_algoritham_type', 'algGetAlgType');

$app->post('/admin_add_question', 'adminAddQuestion');
$app->post('/admin_edit_question', 'adminEditQuestion');

$app->get('/get_this_question', 'getThisQuestion');

$app->post('/addAnswer', 'AddAnswer');

$app->get('/admin_get_question_detail/:id',  'adminGetQuestionDetails');

$app->get('/get_all_questions_user', 'GetAllQuestionsUser');

$app->get('/get_this_question_id/:id', 'getThisQuestionById');
$app->post('/update_answer', 'updateAnswer');

$app->get('/alg_admin_get_category', 'algAdminGetQusCategory');

$app->post('/update_Question_Category_Seq', 'updateQuestionCatSequence');
$app->post('/save_personality_matrix', 'savePersonalityMatrix');

$app->get('/admin_get_personality_matrix', 'adminGetPersonalityMatrix');

$app->post('/admin_edit_question_option', 'adminEditQuestionOption');


function algGetQusCategory() {

  $sql = "SELECT * from QuestionnaireCategory";
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

function algGetQusType() {

  $sql = "SELECT * from AnswerType";
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

function algGetAlgType() {

  $sql = "SELECT * from AlgorithamType";
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

function adminAddQuestion() {
  $request = Slim::getInstance()->request();
  $question = json_decode($request->getBody());
  $status=0;
  $DateTime=  date("Y-m-d h:i:s") ;
 // print_r($question);
  //exit();
  $max_selection = '';
  if (isset($question->maxselection)) {
    $max_selection = $question->maxselection;
  }
  
  $sqlSN = "Insert into Questionnaire (QuestionTitle, Description, AnswerSelectionType, QuestionCategory, AlgorithamType, MaxOptions, MaxScore, DateAdded) values (:QuestionTitle,:Description,:AnswerSelectionType,:QuestionCategory,:AlgorithamType, :MaxOptions, :MaxScore, :DateAdded)";
  try {
    $db = getConnection();
    $stmtSN = $db->prepare($sqlSN);
    $stmtSN->bindParam("QuestionTitle", $question->title  );
    $stmtSN->bindParam("Description", $question->hint );
    $stmtSN->bindParam("AnswerSelectionType", $question->ansType);
    $stmtSN->bindParam("QuestionCategory", $question->qnsCategory);
    $stmtSN->bindParam("AlgorithamType", $question->algType);
    $stmtSN->bindParam("MaxOptions", $max_selection);
    $stmtSN->bindParam("MaxScore", $question->max_score );
    $stmtSN->bindParam("DateAdded", $DateTime);
    $stmtSN->execute();
    $qnId = $db->lastInsertId();
    for ($i = 0; $i < count($question->answers); $i++) {
      $sql = "Insert into QuestionnaireOptions (QId, Answer) values (:qnId,:Answer)";
      $stmt = $db->prepare($sql);
      $stmt->bindParam("qnId", $qnId);
      $stmt->bindParam("Answer", $question->answers[$i]);
      $stmt->execute();
      $ansId[$question->answers[$i]] = $db->lastInsertId();
      //print 'heelo';
    }
   // print_r($ansId);
    //Single Matrix
    if ($question->algType == 1) {
      foreach ($question->algSingleMatrix as $key => $value) {
        $parts = explode('*', $key);
        $x = $parts[0];
        $y = $parts[1];
        $sqlA = "Insert into AlgorithamLogic (QuestionId, Row, Col, Value) values (:QuestionId,:Row, :Col, :Value)";
        $stmtA = $db->prepare($sqlA);
        $stmtA->bindParam("QuestionId", $qnId);
        $stmtA->bindParam("Row", $ansId[$x]);
        $stmtA->bindParam("Col", $ansId[$y]);
        $stmtA->bindParam("Value", $value);      
        $stmtA->execute();
      }
    }
    
    if ($question->algType == 2) {
      foreach ($question->algMultipleMatrix as $key => $value) {
        $parts = explode('*', $key);
        $x = $parts[0];
        $y = $parts[1];
        $sqlA = "Insert into AlgorithamLogic (QuestionId, Row, Col, Value) values (:QuestionId,:Row, :Col, :Value)";
        $stmtA = $db->prepare($sqlA);
        $stmtA->bindParam("QuestionId", $qnId);
        $stmtA->bindParam("Row", $x);
        $stmtA->bindParam("Col", $y);
        $stmtA->bindParam("Value", $value);
        $stmtA->execute();        
      }      
    }
    if ($question->algType == 3) {
      foreach ($ansId as $key => $value) {
        $sqlo = "Update QuestionnaireOptions SET Weight=:weight WHERE QoId = :QoId";
        $stmto = $db->prepare($sqlo);
        $stmto->bindParam("weight", $question->algDifferenceMatch->$key);
        $stmto->bindParam("QoId", $value);
        $stmto->execute();
    
      }  
    }
    
    if ($question->algType == 4) {
      foreach ($ansId as $key => $value) {
        $sqlo = "Update QuestionnaireOptions SET PersonalityType=:type WHERE QoId = :QoId";
        $stmto = $db->prepare($sqlo);
        $stmto->bindParam("type", $question->algPersonalityMatch->$key);
        $stmto->bindParam("QoId", $value);
        $stmto->execute();
        
      }
      
      
    }
    
    echo 'true';
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

}

function getThisQuestion() {
  $result = new stdClass();

  
 try {
   
    $db = getConnection();
    //Total Question count
    $sql = "SELECT count(1) as totalQn from Questionnaire";
    
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $result->totalQn = $wine;
    
    
    //Total answered qn count
    $user_id = getUserId();
    $sqlA = "SELECT count(1) as totalAnsQn from QuestionnaireUserAnswer where UserId = :user_id";
    $stmtA = $db->prepare($sqlA);
    $stmtA->bindParam("user_id", $user_id);
    $stmtA->execute();
    $wineA = $stmtA->fetchObject();
    $result->totalAnsQn = $wineA;
    
    //Get the next qn
    $sqlQ = "SELECT Qid, QuestionTitle, Description, AnswerSelectionType, MaxOptions from Questionnaire where Qid NOT IN (Select QnId from QuestionnaireUserAnswer where UserId = :user_id) ORDER BY Sequence Limit 0,1";
    $stmtQ = $db->prepare($sqlQ);
    $stmtQ->bindParam("user_id", $user_id);
    $stmtQ->execute();
    $wineQ = $stmtQ->fetchObject();
    $result->Questions = $wineQ;
    
    //Get the next qn
    $sqlAn = "SELECT Qoid, Answer from QuestionnaireOptions where Qid = :Qid";
    $stmtAn = $db->prepare($sqlAn);
    $stmtAn->bindParam("Qid", $wineQ->Qid);
    $stmtAn->execute();
    $wineAn = $stmtAn->fetchAll(PDO::FETCH_OBJ);;
    $result->Options = $wineAn;
    
    
    
    echo json_encode($result);
   // print_r($result);
    //echo json_encode($result);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  //echo json_encode($wine);
}

function AddAnswer() {
  $request = Slim::getInstance()->request();
  $answer = json_decode($request->getBody());
  $status=0;
  $DateTime=  date("Y-m-d h:i:s") ;
  $user_id = getUserId();
  
  if ($answer->question->AnswerSelectionType == 1) {
    //  print_r($answer);
    
    $sqlSN = "Insert into QuestionnaireAnswer (QId, UserId, OptionId) values (:QId,:UserId,:OptionId)";
    try {
      $db = getConnection();
      $stmtSN = $db->prepare($sqlSN);
      $stmtSN->bindParam("QId", $answer->question->Qid);
      $stmtSN->bindParam("UserId", $user_id);
      $stmtSN->bindParam("OptionId", $answer->answer);
      $stmtSN->execute();
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
  }
  
  if ($answer->question->AnswerSelectionType == 2) {
  
    foreach ($answer->answerInten as $key => $value) {
      if ($value->selected == true) {
        $sqlSN = "Insert into QuestionnaireAnswer (QId, UserId, OptionId,RankScale) values (:QId,:UserId,:OptionId, :RankScale)";
        try {
          $db = getConnection();
          $stmtSN = $db->prepare($sqlSN);
          $stmtSN->bindParam("QId", $answer->question->Qid);
          $stmtSN->bindParam("UserId", $user_id);
          $stmtSN->bindParam("OptionId", $value->Qoid);
          $stmtSN->bindParam("RankScale", $value->intensity);
          $stmtSN->execute();
        } catch(PDOException $e) {
          echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
  
        //print_r($value);
      }
  
  
    }
  
  }
  
  if ($answer->question->AnswerSelectionType == 3) {

    foreach ($answer->answerMulti as $key => $value) {
      if ($value->selected == true) {
        $sqlSN = "Insert into QuestionnaireAnswer (QId, UserId, OptionId,RankScale) values (:QId,:UserId,:OptionId, :RankScale)";
        try {
          $db = getConnection();
          $stmtSN = $db->prepare($sqlSN);
          $stmtSN->bindParam("QId", $answer->question->Qid);
          $stmtSN->bindParam("UserId", $user_id);
          $stmtSN->bindParam("OptionId", $value->Qoid);
          $stmtSN->bindParam("RankScale", $value->order);
          $stmtSN->execute();
        } catch(PDOException $e) {
          echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
        
        //print_r($value);  
      }
      
      
    }
    
  }
  
  $sqlQ = "Insert into QuestionnaireUserAnswer (QnId, UserId) values (:QId,:UserId)";
  try {
    $db = getConnection();
    $stmtQ = $db->prepare($sqlQ);
    $stmtQ->bindParam("QId", $answer->question->Qid);
    $stmtQ->bindParam("UserId", $user_id);
    $stmtQ->execute();
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  echo true;
  
}


function adminGetQuestionDetails($id) {
  $result = new stdClass();

  $sql = "select * FROM Questionnaire where Qid=:id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    //$db = null;
    $result->Questions = $wine;
    
    $sqlAn = "SELECT Qoid, Answer from QuestionnaireOptions where Qid = :Qid";
    $stmtAn = $db->prepare($sqlAn);
    $stmtAn->bindParam("Qid", $wine->Qid);
    $stmtAn->execute();
    $wineAn = $stmtAn->fetchAll(PDO::FETCH_OBJ);
    $result->Options = $wineAn;
    //echo $total = $wine->'count(1)';
    if ($wine->AlgorithamType == 1) {
      //print 'hellofff';
      $sqlAl = "SELECT al.Value, qo.Answer as answerx, qs.Answer as answery  from AlgorithamLogic al join QuestionnaireOptions qo ON al.Row = qo.QoId  JOIN QuestionnaireOptions qs ON al.Col = qs.QoId where al.QuestionId = :Qid";
      $stmtAl = $db->prepare($sqlAl);
      $stmtAl->bindParam("Qid", $wine->Qid);
      $stmtAl->execute();
      $wineAl = $stmtAl->fetchAll(PDO::FETCH_OBJ);
      for ($i = 0; $i < count($wineAl); $i++) {
       // print 'hello';
        //print $wineAl[$i]->answerx;
        $algorithamLogic[$wineAl[$i]->answerx . '*' . $wineAl[$i]->answery] = $wineAl[$i]->Value;
      }
      $result->Algoritham = $algorithamLogic;
    } 
    else if ($wine->AlgorithamType == 2) {
      //print 'hellofff';
      $sqlAl = "SELECT Row, Col, Value from AlgorithamLogic where QuestionId = :Qid";
      $stmtAl = $db->prepare($sqlAl);
      $stmtAl->bindParam("Qid", $wine->Qid);
      $stmtAl->execute();
      $wineAl = $stmtAl->fetchAll(PDO::FETCH_OBJ);
      for ($i = 0; $i < count($wineAl); $i++) {
        // print 'hello';
        //print $wineAl[$i]->answerx;
        $algorithamLogic[$wineAl[$i]->Row . '*' . $wineAl[$i]->Col] = $wineAl[$i]->Value;
      }
      $result->Algoritham = $algorithamLogic;
    }
    else if ($wine->AlgorithamType == 3) {
    
      //print $wine->Qid;
      $sqlAnt = "SELECT Answer, Weight from QuestionnaireOptions where Qid = :Qid";
      $stmtAnt = $db->prepare($sqlAnt);
      $stmtAnt->bindParam("Qid", $wine->Qid);
      $stmtAnt->execute();
      $wineAnt = $stmtAnt->fetchAll(PDO::FETCH_OBJ);
      // print_r($wineAnt);
      for ($i = 0; $i <count($wineAnt); $i++) {
        //$wineAnt[0]->Qoid;
        $tmparr[$wineAnt[$i]->Answer] = $wineAnt[$i]->Weight;
      }
      $result->Algoritham = $tmparr;
    
    }
    
    else if ($wine->AlgorithamType == 4) {
      
      //print $wine->Qid;
      $sqlAnt = "SELECT Answer, PersonalityType from QuestionnaireOptions where Qid = :Qid";
      $stmtAnt = $db->prepare($sqlAnt);
      $stmtAnt->bindParam("Qid", $wine->Qid);
      $stmtAnt->execute();
      $wineAnt = $stmtAnt->fetchAll(PDO::FETCH_OBJ);
     // print_r($wineAnt);
      for ($i = 0; $i <count($wineAnt); $i++) {
        //$wineAnt[0]->Qoid;
        $tmparr[$wineAnt[$i]->Answer] = $wineAnt[$i]->PersonalityType;
      }      
      $result->Algoritham = $tmparr;
      
    }
    echo json_encode($result);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

}


function adminEditQuestion() {
  $request = Slim::getInstance()->request();
  $question = json_decode($request->getBody());
  $status=0;
  $DateTime=  date("Y-m-d h:i:s") ;
  //print_r($question);
  //exit();
   
   
  $max_selection = '';
  if (isset($question->maxselection)) {
    $max_selection = $question->maxselection;
  }

  //$sqlSN = "Insert into Questionnaire (QuestionTitle, Description, AnswerSelectionType, QuestionCategory, AlgorithamType, MaxOptions, MaxScore, DateAdded) values (:QuestionTitle,:Description,:AnswerSelectionType,:QuestionCategory,:AlgorithamType, :MaxOptions, :MaxScore, :DateAdded)";
  try {
    $db = getConnection();
    $sql = " UPDATE `Questionnaire` SET `QuestionTitle`= :topic,`Description`=:description where Qid = :Qid";
   
      $db = getConnection();
      $stmt = $db->prepare($sql);
      $stmt->bindParam("topic", $question->title);
      $stmt->bindParam("description", $question->hint);   
      $stmt->bindParam("Qid", $question->Qid); 
      $stmt->execute();
      
    
      //exit();
    //$qnId = $db->lastInsertId();
    for ($i = 0; $i < count($question->answers); $i++) {
      $sql = "Insert into QuestionnaireOptions (QId, Answer) values (:qnId,:Answer)";
      $stmt = $db->prepare($sql);
      $stmt->bindParam("qnId", $question->Qid);
      $stmt->bindParam("Answer", $question->answers[$i]);
      $stmt->execute();
      $ansId[$question->answers[$i]] = $db->lastInsertId();
      //print 'heelo';
    }
//     // print_r($ansId);
//     //Single Matrix
    if ($question->algType == 1) {
      
      $sqlAn = "SELECT Qoid, Answer from QuestionnaireOptions where Qid = :Qid";
      $stmtAn = $db->prepare($sqlAn);
      $stmtAn->bindParam("Qid", $question->Qid);
      $stmtAn->execute();
      $wineAn = $stmtAn->fetchAll(PDO::FETCH_OBJ);
      for ($i = 0; $i < count($wineAn); $i++) {
        $ansInsID[$wineAn[$i]->Answer] = $wineAn[$i]->Qoid;
      }
      
      $sql = "Delete from AlgorithamLogic  WHERE QuestionId=:id";   
      $stmt = $db->prepare($sql);
      $stmt->bindParam("id", $question->Qid);
      $stmt->execute();
        
      
      //print_r($ansId);
     // print_r($ansInsID);
      foreach ($question->algSingleMatrix as $key => $value) {
        $parts = explode('*', $key);
        $x = $parts[0];
        $y = $parts[1];
        
        $sqlA = "Insert into AlgorithamLogic (QuestionId, Row, Col, Value) values (:QuestionId,:Row, :Col, :Value)";
        $stmtA = $db->prepare($sqlA);
        $stmtA->bindParam("QuestionId", $question->Qid);
        $stmtA->bindParam("Row", $ansInsID[$x]);
        $stmtA->bindParam("Col", $ansInsID[$y]);
        $stmtA->bindParam("Value", $value);
        $stmtA->execute();
        
        
      }
    }

    else if ($question->algType == 2) {
      
      $sql = "Delete from AlgorithamLogic  WHERE QuestionId=:id";
      $stmt = $db->prepare($sql);
      $stmt->bindParam("id", $question->Qid);
      $stmt->execute();
      
      foreach ($question->algMultipleMatrix as $key => $value) {
        $parts = explode('*', $key);
        $x = $parts[0];
        $y = $parts[1];
        $sqlA = "Insert into AlgorithamLogic (QuestionId, Row, Col, Value) values (:QuestionId,:Row, :Col, :Value)";
        $stmtA = $db->prepare($sqlA);
        $stmtA->bindParam("QuestionId", $question->Qid);
        $stmtA->bindParam("Row", $x);
        $stmtA->bindParam("Col", $y);
        $stmtA->bindParam("Value", $value);
        $stmtA->execute();
      }
    }
    
    else if ($question->algType == 3) {
      foreach ($question->algDifferenceMatch as $key => $value) {
        $sqlo = "Update QuestionnaireOptions SET Weight=:weight WHERE QId = :QId and Answer = :answer";
        $stmto = $db->prepare($sqlo);
        $stmto->bindParam("weight", $value);
        $stmto->bindParam("QId", $question->Qid);
        $stmto->bindParam("answer", $key);
        $stmto->execute();
    
      }
    }
    
    else if ($question->algType == 4) {
      foreach ($question->algPersonalityMatch as $key => $value) {
        
        $sqlo = "Update QuestionnaireOptions SET PersonalityType=:type WHERE QId = :QId and Answer = :answer";
        $stmto = $db->prepare($sqlo);
        $stmto->bindParam("type", $value);
        $stmto->bindParam("QId", $question->Qid);
        $stmto->bindParam("answer", $key);
        $stmto->execute();

      }
    }

    echo 'true';
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

}

function GetAllQuestionsUser() {
  // $user_id  = getUserId();
  $sql = "SELECT q.*, qc.Category, at.AlgTypeTitle FROM `Questionnaire` q JOIN QuestionnaireCategory qc ON q.QuestionCategory = qc.QcId  JOIN AlgorithamType at ON q.AlgorithamType=at.AlgTypeId";
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

function getThisQuestionById($qid) {
  $result = new stdClass();
  

  try {
    
    $user_id = getUserId();
    $db = getConnection();
    

    //Get the next qn
    $sqlQ = "SELECT Qid, QuestionTitle, Description, AnswerSelectionType, MaxOptions from Questionnaire where Qid = :qid";
    $stmtQ = $db->prepare($sqlQ);
    $stmtQ->bindParam("qid", $qid);
    $stmtQ->execute();
    $wineQ = $stmtQ->fetchObject();
    $result->Questions = $wineQ;

    //Get the next qn
    $sqlAn = "SELECT Qoid, Answer from QuestionnaireOptions where Qid = :Qid";
    $stmtAn = $db->prepare($sqlAn);
    $stmtAn->bindParam("Qid", $wineQ->Qid);
    $stmtAn->execute();
    $wineAn = $stmtAn->fetchAll(PDO::FETCH_OBJ);;
    $result->Options = $wineAn;
    
    $sqlAnswers = "SELECT OptionId, RankScale from QuestionnaireAnswer where Qid = :Qid AND UserId = :user_id order by RankScale";
    $stmtAnswers = $db->prepare($sqlAnswers);
    $stmtAnswers->bindParam("Qid", $wineQ->Qid);
    $stmtAnswers->bindParam("user_id", $user_id);
    $stmtAnswers->execute();
    $wineAnswers = $stmtAnswers->fetchAll(PDO::FETCH_OBJ);;
    $result->Answers = $wineAnswers;



    echo json_encode($result);
    // print_r($result);
    //echo json_encode($result);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  //echo json_encode($wine);
}

function updateAnswer() {
  $request = Slim::getInstance()->request();
  $answer = json_decode($request->getBody());
  $status=0;
  $DateTime=  date("Y-m-d h:i:s") ;
  $user_id = getUserId();
  
  $db = getConnection();
  $sqldel = "Delete from QuestionnaireAnswer  WHERE QId=:id and UserId = :userid";
  $stmt = $db->prepare($sqldel);
  $stmt->bindParam("id", $answer->question->Qid);
  $stmt->bindParam("userid", $user_id);
  $stmt->execute();

  if ($answer->question->AnswerSelectionType == 1) {
    //  print_r($answer);

    $sqlSN = "Insert into QuestionnaireAnswer (QId, UserId, OptionId) values (:QId,:UserId,:OptionId)";
    try {
      $db = getConnection();
      $stmtSN = $db->prepare($sqlSN);
      $stmtSN->bindParam("QId", $answer->question->Qid);
      $stmtSN->bindParam("UserId", $user_id);
      $stmtSN->bindParam("OptionId", $answer->answer);
      $stmtSN->execute();
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
  }

  if ($answer->question->AnswerSelectionType == 2) {

    foreach ($answer->answerInten as $key => $value) {
      if ($value->selected == true) {
        $sqlSN = "Insert into QuestionnaireAnswer (QId, UserId, OptionId,RankScale) values (:QId,:UserId,:OptionId, :RankScale)";
        try {
          $db = getConnection();
          $stmtSN = $db->prepare($sqlSN);
          $stmtSN->bindParam("QId", $answer->question->Qid);
          $stmtSN->bindParam("UserId", $user_id);
          $stmtSN->bindParam("OptionId", $value->Qoid);
          $stmtSN->bindParam("RankScale", $value->intensity);
          $stmtSN->execute();
        } catch(PDOException $e) {
          echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

        //print_r($value);
      }


    }

  }

  if ($answer->question->AnswerSelectionType == 3) {

    foreach ($answer->answerMulti as $key => $value) {
      if ($value->selected == true) {
        $sqlSN = "Insert into QuestionnaireAnswer (QId, UserId, OptionId,RankScale) values (:QId,:UserId,:OptionId, :RankScale)";
        try {
          $db = getConnection();
          $stmtSN = $db->prepare($sqlSN);
          $stmtSN->bindParam("QId", $answer->question->Qid);
          $stmtSN->bindParam("UserId", $user_id);
          $stmtSN->bindParam("OptionId", $value->Qoid);
          $stmtSN->bindParam("RankScale", $value->order);
          $stmtSN->execute();
        } catch(PDOException $e) {
          echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

        //print_r($value);
      }


    }

  }

//   $sqlQ = "Insert into QuestionnaireUserAnswer (QnId, UserId) values (:QId,:UserId)";
//   try {
//     $db = getConnection();
//     $stmtQ = $db->prepare($sqlQ);
//     $stmtQ->bindParam("QId", $answer->question->Qid);
//     $stmtQ->bindParam("UserId", $user_id);
//     $stmtQ->execute();
//   } catch(PDOException $e) {
//     echo '{"error":{"text":'. $e->getMessage() .'}}';
//   }
  echo true;

}

function algAdminGetQusCategory() {

  $sql = "SELECT * from QuestionnaireCategory where QcId NOT IN (6,7,8,9,10)";
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


function updateQuestionCatSequence() {
  $request = Slim::getInstance()->request();
  $ques = json_decode($request->getBody());
  // print_r($ques);
  $index = 0;
  foreach($ques as $obj) {
    $sql = "UPDATE `QuestionnaireCategory` SET `Weight`=:weight WHERE QcId = :qid";
    try {
      $db = getConnection();
      $stmt = $db->prepare($sql);
      $stmt->bindParam("weight", $obj->Weight);
      $stmt->bindParam("qid", $obj->QcId);
      $stmt->execute();       

    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

  }
  echo 'true';

}

function savePersonalityMatrix() {
  $request = Slim::getInstance()->request();
  $personslity = json_decode($request->getBody());
  //print_r($ques);
  //exit();
  $db = getConnection();
  $sql = "Delete from AlgPersonalityMatrix";
  $stmt = $db->prepare($sql);
  $stmt->execute();
  foreach ($personslity as $key => $value) {
        $parts = explode('*', $key);
        $x = $parts[0];
        $y = $parts[1];
        $sqlA = "Insert into AlgPersonalityMatrix (Row, Col, Value) values (:Row, :Col, :Value)";
        $stmtA = $db->prepare($sqlA);
        //$stmtA->bindParam("QuestionId", $qnId);
        $stmtA->bindParam("Row", $x);
        $stmtA->bindParam("Col", $y);
        $stmtA->bindParam("Value", $value);
        $stmtA->execute();        
      }     
  $db = null;
  echo 'true';

}


function adminGetPersonalityMatrix() {

  $sql = "SELECT * from AlgPersonalityMatrix ";
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

function adminEditQuestionOption() {
  $request = Slim::getInstance()->request();
  $personslity = json_decode($request->getBody());
  print_r($personslity);
 // exit();
  
  $sqlo = "Update QuestionnaireOptions SET Answer=:answer WHERE QoId = :QoId";
  try {
    $db = getConnection();
    $stmto = $db->prepare($sqlo);
    $stmto->bindParam("answer", $personslity->Answer);
    $stmto->bindParam("QoId", $personslity->Qoid);
    $stmto->execute();
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }


}