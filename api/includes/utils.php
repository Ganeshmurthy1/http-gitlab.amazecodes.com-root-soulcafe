<?php

function getUserId() {
	$headers = apache_request_headers();
    $split = explode(' ', $headers['authorization']);
    $user_id  = $split[3];
    
}

?>