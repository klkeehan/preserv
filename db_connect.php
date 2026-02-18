<?php
  // loading data from .env file **DO NOT REMOVE**
  require_once realpath(__DIR__ . "/vendor/autoload.php");
  use Dotenv\Dotenv;
  $dotenv = Dotenv::createImmutable(__DIR__);
  $dotenv->load();

  $user = $_ENV['MYSQL_USER'];
  $pw = $_ENV['MYSQL_PASSWORD'];

  $mysqli = new mysqli("localhost", $user, $pw, "preserv");
  if ($mysqli->error) {
    print "Error connecting! Message:" . $mysqli->error;
  }
  else {
    print "hello ";
    echo $user;
  }