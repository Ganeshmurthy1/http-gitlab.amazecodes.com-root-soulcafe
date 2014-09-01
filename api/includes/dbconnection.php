<?php

function getConnection() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="123";
	$dbname="soulcafe";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>
