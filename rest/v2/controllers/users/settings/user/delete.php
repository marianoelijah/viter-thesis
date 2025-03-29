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
  // get data
  $user->user_user_aid = $_GET['userid'];
  $column_name = $data['item'];
  checkId($user->user_user_aid);


  $query = checkDelete($user);
  checkDropColumnName($user, $column_name);
  returnSuccess($user, "Departments", $query);
}

// return 404 error if endpoint not available
checkEndpoint();