<?php

require 'Slim/Slim.php';
$app = new Slim();

require 'includes/dbconnection.php';
require 'includes/registration.php';
require 'includes/adminForum.php';
require 'includes/utils.php';
require 'includes/BWB.php';
$app->run();

?>
