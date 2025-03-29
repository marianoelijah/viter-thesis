<?php
// set http header
require '../../../../../core/header.php';
require '../../../../../core/Encryption.php';
// use needed functions
require '../../../../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../../../../models/user/settings/user/user/User.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user = new User($conn);
$encrypt = new Encryption();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  checkApiKey();
  checkPayload($data);

  $user->user_user_password = $encrypt->doPasswordHash($data['new_password']);
  $user->user_user_key = $data['key'];
  $user->user_user_datetime = date('Y-m-d H:i:s');

  $query = checkSetPassword($user);
  http_response_code(200);
  returnSuccess($user, 'user user set password', $query);

  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();