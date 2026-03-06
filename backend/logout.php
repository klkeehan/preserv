<?php
  session_start();

  if(isset($_SESSION['logged_in_user'])) {
    unset($_SESSION['logged_in_user']);
  };

  if(isset($_SESSION['logged_in_name'])) {
    unset($_SESSION['logged_in_name']);
  };

  if(isset($_SESSION['logged_in_household'])) {
    unset($_SESSION['logged_in_household']);
  };

  if(isset($_SESSION['logged_in_user_id'])) {
    unset($_SESSION['logged_in_user_id']);
  };

  $response = [
    'status' => 'success',
    'message' => 'user has logged out'
  ];
  echo json_encode($response);