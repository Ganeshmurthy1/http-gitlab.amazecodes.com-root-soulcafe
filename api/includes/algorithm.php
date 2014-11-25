<?php

$app->get('/alg_processor', 'algController');

function algController() {
  $questions = algorithmGetAllQuestions();
  $x = 114;
  $y = 115;
  $algObject = algObjectCreator($x, $y, $questions);
  $algScores = algProcessor($algObject);
}


function algProcessor($algObject) {
  //print_r($algObject);
  $algScores = array();
  foreach ($algObject as $key => $value) {
    $score = 0;
    switch ($algObject[$key]->question->AlgorithamType) {
      case 1:
        $score = singleSelectionMatric($algObject[$key]);     
        break;
      case 2:
        $score = multipleSelectionMatric($algObject[$key]);
        break;
      case 3:
        $score = DifferenceMatch($algObject[$key]);
        break;
      case 5:
        $score = multiSelectionintensity($algObject[$key]);
        break;
      
      
    }
    
    
    
    $algScores[$algObject[$key]->question->Category][$algObject[$key]->question->Qid] = $score;
  }  
  print_r($algScores);
}

function multipleSelectionMatric($qnObject) {
  //print_r($qnObject);
  
  $score = 0;
  $sql = "SELECT Value from AlgorithamLogic WHERE Row = :row and Col = :col and QuestionId = :qid";
  try {
    $db = getConnection();    
    $stmt = $db->prepare($sql);
    
    for ($i = 0; $i < count($qnObject->x_answer); $i++) {
      for ($j = 0; $j < count($qnObject->y_answer); $j++) {
        if ($qnObject->x_answer[$i]->OptionId == $qnObject->y_answer[$j]->OptionId) {
          //$diff = abs($qnObject->x_answer[$i]->RankScale - $qnObject->y_answer[$j]->RankScale);
          //$score += (5-$diff);
          //print_r($qnObject->x_answer[$i]) . ' - ' . print_r($qnObject->y_answer[$j]);
          
          print $qnObject->x_answer[$i]->RankScale . '===' . $qnObject->y_answer[$j]->RankScale .'\n';
          
          $stmt->bindParam("row", $qnObject->x_answer[$i]->RankScale);
          $stmt->bindParam("col", $qnObject->y_answer[$j]->RankScale);
          $stmt->bindParam("qid", $qnObject->question->Qid);
          $stmt->execute();
          $wine = $stmt->fetchObject();
          print 'dd' . $wine->Value;
          $score += $wine->Value;
        }
      }
    }
    //print $score;
   $totalScore  =  $qnObject->question->MaxScore;
   $scoreper =  ($score / $totalScore) * 100; 
    
   $db = null;
   return ceil($scoreper);
    //echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  
  
  $totalScore = $qnObject->question->MaxOptions * 5;
  
}

function multiSelectionintensity($qnObject) {
  print_r($qnObject);
  $score = 0;
  for ($i = 0; $i < count($qnObject->x_answer); $i++) {    
    for ($j = 0; $j < count($qnObject->y_answer); $j++) {
      if ($qnObject->x_answer[$i]->OptionId == $qnObject->y_answer[$j]->OptionId) {
        $diff = abs($qnObject->x_answer[$i]->RankScale - $qnObject->y_answer[$j]->RankScale);
        $score += (5-$diff);
        //print 'ji';
      }
    }      
  }
  $totalScore = $qnObject->question->MaxOptions * 5;
  return ($score / $totalScore) * 100;
  
}

function DifferenceMatch($qnObject) {
 // print_r($qnObject);
  
  $sql = "SELECT QoId, Weight from QuestionnaireOptions WHERE QoId = :xid or  QoId = :yid";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("xid", $qnObject->x_answer[0]->OptionId);
    $stmt->bindParam("yid", $qnObject->y_answer[0]->OptionId);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    
   // print_r($wine);
    //
    // don't know what crap it is... FUCK
    for ($i = 0; $i < count($wine); $i++) {}
    $i--;
    print $diff = abs($wine[0]->Weight - $wine[$i]->Weight);
    $score = $qnObject->question->MaxScore - $diff;
    
    return ($score/$qnObject->question->MaxScore)*100;

  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  
  
}


function singleSelectionMatric($qnObject) {
  //print_r($qnObject);
  $sql = "SELECT Value from AlgorithamLogic WHERE Row = :row and Col = :col";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("row", $qnObject->x_answer[0]->OptionId);
    $stmt->bindParam("col", $qnObject->y_answer[0]->OptionId);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;
    //echo $total = $wine->'count(1)';
    if (isset($wine->Value)) {
      return ($wine->Value/$qnObject->question->MaxScore)*100;
    } 
    else {
      return 0;
    }
    //echo json_encode($wine);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  
}


function algObjectCreator($x, $y, $questions) {
  

  $x_answers = algorithmGetAllAnswers($x);
  $y_answers = algorithmGetAllAnswers($y);
  
  $algArray = array();
  print '<pre>';

  for ($i = 0; $i < count($questions); $i++) {
    $algObject = new stdClass();
    $algObject->question = $questions[$i];
    $ansx = array();
    for ($j = 0; $j < count($x_answers); $j++) {      
      if ($x_answers[$j]->QId == $questions[$i]->Qid) {
        $ansx[] = $x_answers[$j];
      }      
    }
    $ansy = array();
    for ($j = 0; $j < count($y_answers); $j++) {
      if ($y_answers[$j]->QId == $questions[$i]->Qid) {
        $ansy[] = $y_answers[$j];
      }
    }
    $algObject->x_answer = $ansx;
    $algObject->y_answer = $ansy;
    
    
    
    $algArray[$questions[$i]->Qid] = $algObject;
    
   // print_r($algArray);
  }
  return $algArray;
  //print_r($algArray);

  
  
  
}

function algorithmGetAllAnswers($uid) {
  // $user_id  = getUserId();
  $sql = "SELECT qa.* FROM `Questionnaire` q JOIN QuestionnaireCategory qc ON q.QuestionCategory = qc.QcId JOIN QuestionnaireAnswer qa ON qa.QId = q.Qid  where qc.QcId NOT IN (6,7,8,9,10) and qa.UserId = :uid";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("uid", $uid);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    return $wine;
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}




function algorithmGetAllQuestions() {
  // $user_id  = getUserId();
  $sql = "SELECT q.Qid, q.QuestionTitle, q.QuestionCategory, q.AlgorithamType, q.MaxOptions, q.MaxScore,  qc.Category, at.AlgTypeTitle FROM `Questionnaire` q JOIN QuestionnaireCategory qc ON q.QuestionCategory = qc.QcId  JOIN AlgorithamType at ON q.AlgorithamType=at.AlgTypeId where qc.QcId NOT IN (6,7,8,9,10)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    return $wine;
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}
