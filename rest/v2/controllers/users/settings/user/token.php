<?php
// set http header
require '../../../../../core/header.php';
// use needed functions
require '../../../../../core/functions.php';
// use jwt
require '../../../../../jwt/vendor/autoload.php';
// require 'functions.php';
// use needed classes
require '../../../../../models/user/settings/user/user/User.php';
// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user = new User($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  checkApiKey();

  $token = $data['token'];

  $key = 'jwt_admin_ko_ito';

  tokenUser($user, $token, $key);
}

http_response_code(200);