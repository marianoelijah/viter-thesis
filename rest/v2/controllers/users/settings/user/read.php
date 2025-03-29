<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user = new User($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("userid", $_GET)) {
  $user->user_user_aid = $_GET['userid'];
  checkId($user->user_user_aid);
  $query = checkReadById($user);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($user);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();