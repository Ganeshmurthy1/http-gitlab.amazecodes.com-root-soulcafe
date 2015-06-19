<?php

$app->get('/alg_processor/:x/:y', 'algController');
$app->get('/alg_batch_process', 'algBatch');

$app->get('/alg_processor_one_one/:y', 'algControllerOneOne');

$app->get('/get_my_recommendation', 'getMyRecommendation');

function getMyRecommendation() {
  $start = microtime(true);
  $x  = getUserId();
  $my_details = getMyBatch();
  //print_r($my_details);
  $categoryWeight = getQnCategory();
  for ($i = 0; $i < count($my_details); $i++) {
    matchProcessor($my_details[$i], $categoryWeight);
   // print $i;
  }
  $sql = "SELECT COUNT(1) as totalMatch FROM SoulMatches WHERE UserId = :userId";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("userId", $x);
    $stmt->execute();
    $wineMatches = $stmt->fetchObject();
    //$db = null;
  
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  echo json_encode($wineMatches);
  $time_elapsed_us = microtime(true) - $start;
  //print $time_elapsed_us;
}

function algControllerOneOne($y) { 
  $questions = algorithmGetAllQuestions();
  //$x = 116;
  // $y = 117;
  $x  = getUserId();
  $algObject = algObjectCreator($x, $y, $questions);
  if(!empty($algObject)) {
    $algScores = algProcessor($algObject);
    //print_r($algScores);
    
    $categoryWeight = getQnCategory();
    //print_r($categoryWeight);
    
    
    $cal_index = 0;
    $total_percentage_score = 0;
    $total_percentage = 0;
    // calculate the total in one category
    foreach ($algScores as $key => $value ) {
      $total = 0;
      $index = 0;
      foreach ($value as $val) {
        $total += $val;
        $index++;
      }
      //print $categoryWeight[$key];
      $scoreper = $total/$index;
      $scoreper = ceil($scoreper * $categoryWeight[$key]);
      $score_per_obj[$key] = $scoreper;
      $total_percentage_score += $scoreper;
      $cal_index++;
    
    
    }
    
    $x_personalityScore = getPersonalityScore($x);
    $y_personalityScore = getPersonalityScore($y);
    $personality_match  = getPersonalityMatch($x_personalityScore, $y_personalityScore);
    
    //print_r($score_per_obj);
    $total_percentage = ceil($total_percentage_score/$cal_index);
    $result_obj['scores'] = $score_per_obj;
    $result_obj['total_percentage'] = $total_percentage;
    $result_obj['personality_match'] = $personality_match->Value;
    
    echo json_encode($result_obj);
  }
  

  //print '</br> Compatibility type: 1 = CM, 2 = SM, 3 = NM </br>';
  //print_r($algScores);
}

function getQnCategory() {

  $sql = "SELECT * from QuestionnaireCategory where QcId NOT IN (6,7,8,9,10)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    // $stmt->bindParam("id", $id);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    for ($i = 0; $i < count($wine); $i++) {
      $res[$wine[$i]->Category] = $wine[$i]->Weight;
    }
    
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  return $res;
  //echo json_encode($wine);
}

function algBatch() {
  
  $start = microtime(true);
  //print '<pre>';
  $user_list = getTheBatch();
  //print_r($user_list);
  //exit;
  // get the filterd users
  $categoryWeight = getQnCategory();
  for ($i = 0; $i < count($user_list); $i++) {
    matchProcessor($user_list[$i], $categoryWeight);
  }
  
  $time_elapsed_us = microtime(true) - $start;
  print $time_elapsed_us;
  
  

  

  
}

function matchProcessor($user_obj, $categoryWeight) {
  $filterd_users = getTheFilteredUsers($user_obj);  
  //print_r($filterd_users);
  deleteMatch($user_obj->user_id);
  findMatches($user_obj->user_id, $filterd_users, $categoryWeight);
  AddProcessedUsers($user_obj->user_id);
}

function AddProcessedUsers($user_id) {
  
  $tdate = date('Y-m-d h:i:s');
  //print_r($match_type);
  $sql = "INSERT INTO AlgorithamProcessed (UserId, DateAdded) VALUES ( :UserId, :DateAdded)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("UserId", $user_id);
    $stmt->bindParam("DateAdded", $tdate);
    $stmt->execute();
  
    $db = null;
    //   echo 'true';
    //$app->redirect('login.html');
  }
  catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  
}


function findMatches($user_id, $filterd_users, $categoryWeight) {
  

  //get the match and scores of all filtered users
  for ($i = 0; $i < count($filterd_users); $i++) {
    //$alg_objar[$filterd_users[$i]->user_id] = algBatchController($user_id, $filterd_users[$i]->user_id);
    $alg_obj = algBatchController($user_id, $filterd_users[$i]->user_id);
     
    //print_r($alg_obj);
    //filter for belief match
    if ($alg_obj != false) {   
      //filter for language match
      if($alg_obj['scores']['Language Compatibility'][56] != 0 ) { 
    
        
        $cal_index = 0;
        $total_percentage_score = 0;
        $total_percentage = 0;
        // calculate the total in one category
        foreach ($alg_obj['scores'] as $key => $value ) {
          $total = 0;
          $index = 0;
          foreach ($value as $val) {
            $total += $val;
            $index++;
          }
          
          $scoreper = $total/$index;
          $scoreper = ceil($scoreper * $categoryWeight[$key]);
          $score_per_obj[$key] = $scoreper;
          $total_percentage_score += $scoreper;
          $cal_index++;
    
    
        }
        $total_percentage = ceil($total_percentage_score/$cal_index);
        addMatch($user_id, $filterd_users[$i]->user_id, $total_percentage, $alg_obj['match_type']);
        
        
      //  $scoreper_user_obj[$filterd_users[$i]->user_id]['calculate_scores'] = $score_per_obj;
       // $scoreper_user_obj[$filterd_users[$i]->user_id]['total_percentage'] = $total_percentage;
    
    
      }
    }
  
     
     
  }
  
  //print_r($alg_objar);
  //print_r($scoreper_user_obj);
  
}
function deleteMatch($user_id) {

  $sql_del = "DELETE FROM SoulMatches WHERE UserId=:UserId ";
  try {
    $db = getConnection();
    // delete previous suggestions
    $stmt_del = $db->prepare($sql_del);
    $stmt_del->bindParam("UserId", $user_id);
    $stmt_del->execute();
    $db = null;
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function addMatch($user_id, $match_id, $score_percentage, $match_type) {
  
  $tdate = date('Y-m-d h:i:s');
  //print_r($match_type);
  $sql = "INSERT INTO SoulMatches (UserId, SoulId, ScorePercentage, MatchType, DateAdded) VALUES ( :UserId, :SoulId, :ScorePercentage , :MatchType, :DateAdded)";
  try {
    $db = getConnection();
    
  
    
    
    $stmt = $db->prepare($sql);
    $stmt->bindParam("UserId", $user_id);
    $stmt->bindParam("SoulId", $match_id);
    $stmt->bindParam("ScorePercentage", $score_percentage);
    $stmt->bindParam("MatchType", $match_type->Value);
    $stmt->bindParam("DateAdded", $tdate);
    $stmt->execute();
    
    $db = null;
    //   echo 'true';
    //$app->redirect('login.html');
  }
  catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function algBatchController($x, $y) {
  $questions = algorithmGetAllQuestions();
  //$x = 116;
  // $y = 117;
  $algObject = algObjectCreator($x, $y, $questions);
 // print_r($algObject);
 // print $x;
  //exit;
  if (!empty($algObject)) {
    if ($algObject[54]->x_answer[0]->OptionId == 160) {
     // print_r($algObject[53]);
      //print 'hello';
      if ($algObject[53]->x_answer[0]->OptionId == $algObject[53]->y_answer[0]->OptionId) {
        $algScores = algProcessor($algObject);
        $x_personalityScore = getPersonalityScore($x);
        $y_personalityScore = getPersonalityScore($y);
        $personality_match  = getPersonalityMatch($x_personalityScore, $y_personalityScore);
        $result_obj['scores'] = $algScores;
        $result_obj['match_type'] = $personality_match;
        return $result_obj;
      }
      else {
        return false;
      }
    }
    else {
      $algScores = algProcessor($algObject);
      $x_personalityScore = getPersonalityScore($x);
      $y_personalityScore = getPersonalityScore($y);
      $personality_match  = getPersonalityMatch($x_personalityScore, $y_personalityScore);
      $result_obj['scores'] = $algScores;
      $result_obj['match_type'] = $personality_match;
      return $result_obj;
    }
  } else {
    return false;
  }
  
  
  
  //print '</br> Compatibility type: 1 = CM, 2 = SM, 3 = NM </br>';
  //print_r($personality_match);
}

function getTheFilteredUsers($user_obj) {

  if ($user_obj->gender == 'male') {
    $gender_search = 'female';
    $upper_date = date('Y-m-d', strtotime('+10 years', strtotime($user_obj->birthdate)));
    $lower_date = date('Y-m-d', strtotime('-2 years', strtotime($user_obj->birthdate)));
    
  }
  else {
    $gender_search = 'male';
    $upper_date = date('Y-m-d', strtotime('+2 years', strtotime($user_obj->birthdate)));
    $lower_date = date('Y-m-d', strtotime('-10 years', strtotime($user_obj->birthdate)));
  }
  
  $sql = "SELECT user_id, gender, birthdate FROM users WHERE birthdate >= :lower and birthdate <= :upper and gender = :gender and status = 1 and user_id NOT IN (SELECT BuddyId FROM Buddies where SenderId = :user_id and Status = 1)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);   
    $stmt->bindParam("lower", $lower_date);
    $stmt->bindParam("upper", $upper_date);
    $stmt->bindParam("gender", $gender_search);
    $stmt->bindParam("user_id", $user_obj->user_id);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    //print_r($wine);
    return $wine;
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function getMyBatch() {
  $x  = getUserId();
  $sql = "SELECT user_id, gender, birthdate FROM users where status = 1 AND user_id = :user_id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id", $x);
    // $stmt->bindParam("col", $y);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    //$db = null;
    // print_r($wine);
  
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  return $wine;
  
}

function getTheBatch() {
  // $user_id  = getUserId();
  $sql = "SELECT user_id, gender, birthdate FROM users where status = 1  AND user_id NOT IN (SELECT UserId FROM AlgorithamProcessed) ORDER BY DateJoined desc  LIMIT 0, 10";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
   // $stmt->bindParam("row", $x);
   // $stmt->bindParam("col", $y);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    //$db = null;
   // print_r($wine);
    if (empty($wine)) {
      $sql = "TRUNCATE TABLE AlgorithamProcessed";
      $stmt = $db->prepare($sql);
      $stmt->execute();
    }
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  return $wine;
}




function algController($x, $y) {
  print '<pre>';
  $questions = algorithmGetAllQuestions();
  //$x = 116;
 // $y = 117;
  $algObject = algObjectCreator($x, $y, $questions);
  if (!empty($algObject)) {
    
  //print 'jello';
  //exit;
    $algScores = algProcessor($algObject);
    print 'Personality Score: ' . $x_personalityScore = getPersonalityScore($x);
    print '</br>';
    print 'Personality Score: ' .  $y_personalityScore = getPersonalityScore($y);
    $personality_match  = getPersonalityMatch($x_personalityScore, $y_personalityScore);
    Print '</br>Personality Match: ';
    print_r($personality_match->Value);
    print '</br> Compatibility type: 1 = CM, 2 = SM, 3 = NM </br>';
    print_r($algScores);
    
  
    $categoryWeight = getQnCategory();
    //print_r($categoryWeight);
    
    
    $cal_index = 0;
    $total_percentage_score = 0;
    $total_percentage = 0;
    // calculate the total in one category
    foreach ($algScores as $key => $value ) {
      $total = 0;
      $index = 0;
      foreach ($value as $val) {
        $total += $val;
        $index++;
      }
      //print $categoryWeight[$key];
      $scoreper = $total/$index;
      $scoreper = ceil($scoreper * $categoryWeight[$key]);
      $score_per_obj[$key] = $scoreper;
      $total_percentage_score += $scoreper;
      $cal_index++;
    
    
    }
    
    $x_personalityScore = getPersonalityScore($x);
    $y_personalityScore = getPersonalityScore($y);
    $personality_match  = getPersonalityMatch($x_personalityScore, $y_personalityScore);
    
    //print_r($score_per_obj);
    $total_percentage = ceil($total_percentage_score/$cal_index);
    $result_obj['scores'] = $score_per_obj;
    $result_obj['total_percentage'] = $total_percentage;
    $result_obj['personality_match'] = $personality_match->Value;
    
    print "====================Final Score card after weightage =====================\n";
    
    print_r($result_obj);
  }
  
}

function getPersonalityMatch($x, $y) {
  // $user_id  = getUserId();
  $sql = "SELECT Value   FROM `AlgPersonalityMatrix` where Row = :row and Col = :col";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("row", $x);
    $stmt->bindParam("col", $y);
    $stmt->execute();
    $wine = $stmt->fetchObject();
    $db = null;
    return $wine;
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}


function getPersonalityScore($id) {
  $sql = "SELECT q.Qid, q.QuestionTitle, q.QuestionCategory, q.AlgorithamType, q.MaxOptions, q.MaxScore,  qc.Category, qa.OptionId, qo.PersonalityType FROM `Questionnaire` q JOIN QuestionnaireCategory qc ON q.QuestionCategory = qc.QcId JOIN QuestionnaireAnswer qa ON q.Qid = qa.QId JOIN QuestionnaireOptions qo ON qa.OptionId = qo.QoId where qc.QcId  IN (6,7,8,9,10) and qa.UserId = :user_id";
  $algPerScores = array();
  $perType = '';
  
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user_id", $id);
    $stmt->execute();
    $wine = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;   
    $i = 0; $e = 0;
    $n = 0; $s = 0;
    $t = 0; $f = 0;
    $p = 0; $j = 0;
    foreach ($wine as $key => $value) {
      $algPerScores[$value->Category][$value->Qid] = $value->PersonalityType;     
      switch ($value->PersonalityType) {
        case "I":
          $i++; break;
        case "E":
          $e++; break; 
        case "N":
          $n++; break;
        case "S":
          $s++; break;
        case "T":
          $t++; break;
        case "F":
          $f++; break;
        case "P":
          $p++; break;
        case "J":
          $j++; break;
      }
    }
    
    if ($i < $e) $perType .= 'E';
    else $perType .= 'I';
    
    if ($n < $s) $perType .= 'S';
    else $perType .= 'N';
    
    if ($t < $f) $perType .= 'F';
    else $perType .= 'T';
    
    if ($p < $j) $perType .= 'J';
    else $perType .= 'P';

   // print_r($algPerScores);
    return $perType;
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
  
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
  // print_r($algScores);
  return $algScores;
 // print_r($algScores);
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
          
          //print $qnObject->x_answer[$i]->RankScale . '===' . $qnObject->y_answer[$j]->RankScale .'\n';
          
          $stmt->bindParam("row", $qnObject->x_answer[$i]->RankScale);
          $stmt->bindParam("col", $qnObject->y_answer[$j]->RankScale);
          $stmt->bindParam("qid", $qnObject->question->Qid);
          $stmt->execute();
          $wine = $stmt->fetchObject();
        //  print 'dd' . $wine->Value;
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
  //print_r($qnObject);
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
    $diff = abs($wine[0]->Weight - $wine[$i]->Weight);
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
  //print '<pre>';
  $ans_flag = 0;

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
    if (empty($ansx) OR empty($ansy)) {
      $ans_flag = 1;
    }
    
    
    $algArray[$questions[$i]->Qid] = $algObject;
    
    //print_r($algArray);
  }
  if ($ans_flag) {
    return false;
  }else {
    return $algArray;
  }
  
  
 
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
