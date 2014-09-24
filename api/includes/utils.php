<?php

function getUserId() {
  $headers = apache_request_headers();
  if (isset($headers['authorization'])) {
     $split = explode(' ', $headers['authorization']);
     $token = $split[1];
     $user_id  = $split[3];
   }
    else if (isset($headers['Authorization'])) {
      $split = explode(' ', $headers['Authorization']);
      $token = $split[1];
      $user_id  = $split[3];
    }
    //$user_id;
    return $user_id;
      
  }

?>