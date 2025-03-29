<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user = new User($conn);
$encrypt = new Encryption();
// use notification email
require '../../../../../notification/verify-account.php';

// check data
checkPayload($data);
// get data
$user->user_user_is_active = 1;
$user->user_user_first_name = checkIndex($data, "user_user_first_name");
$user->user_user_last_name = checkIndex($data, "user_user_last_name");
$user->user_user_email = checkIndex($data, "user_user_email");
$user->user_user_role_id = checkIndex($data, "user_user_role_id");
$user->user_user_key = $encrypt->doHash(rand());
$user->user_user_created = date("Y-m-d H:i:s");
$user->user_user_datetime = date("Y-m-d H:i:s");

$password_link = '/user/create-password';

//checks newly added data if it already exists
isEmailExist($user, $user->user_user_email);

sendEmail(
    $password_link,
    $user->user_user_first_name,
    $user->user_user_email,
    $user->user_user_key,
);

$query = checkCreate($user);
returnSuccess($user, "user", $query);