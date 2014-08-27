<?php

require 'Slim/Slim.php';
$app = new Slim();

require 'includes/dbconnection.php';
require 'includes/registration.php';
require 'includes/adminForum.php';

$app->run();

?>
