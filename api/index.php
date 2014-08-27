<?php

require 'Slim/Slim.php';
$app = new Slim();

require 'includes/dbconnection.php';
require 'includes/registration.php';

$app->run();

?>
