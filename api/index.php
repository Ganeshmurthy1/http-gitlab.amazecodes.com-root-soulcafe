<?php


require 'Slim/Slim.php';
$app = new Slim();

$app->options('/get_DiscussionListStatus', function () use($app) {
  $response = $app->response();
  $response->header('Access-Control-Allow-Origin', 'http://localhost:9000');
  $response->header('Access-Control-Allow-Methods', 'GET, POST');
  $response->header('Access-Control-Allow-Headers', 'accept, origin, content-type');
});

require 'includes/dbconnection.php';
require 'includes/registration.php';
require 'includes/adminForum.php';
require 'includes/utils.php';
require 'includes/BWB.php';
require 'includes/profileOperations.php';
require 'includes/adminOperations.php';
require 'includes/questionnaire.php';
$app->run();

?>
