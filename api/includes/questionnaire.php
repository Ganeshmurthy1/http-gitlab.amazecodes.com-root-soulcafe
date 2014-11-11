<?php

$app->get('/alg_get_category', 'algGetQusCategory');
$app->get('/alg_get_type', 'algGetQusType');
$app->get('/alg_get_algoritham_type', 'algGetAlgType');

$app->post('/admin_add_question', 'adminAddQuestion');

$app->get('/get_this_question', 'getThisQuestion');

$app->post('/addAnswer', 'AddAnswer');

$app->get('/admin_get_question_detail/:id',  'adminGetQuestionDetails');


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
 // exit();
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

  $sql = "select * FROM Questionnaire where Qid=:id";
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