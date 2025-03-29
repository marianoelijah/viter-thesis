<?php
// set http header
require '../../../../../core/header.php';
// use needed functions
require '../../../../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../../../../models/user/settings/user/user/User.php';


// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user = new User($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $user->user_start = $_GET['start'];
        $user->user_total = 11;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($user->user_start, $user->user_total);

        $query = checkReadLimit($user);
        $total_result = checkReadAll($user);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $user->user_total,
            $user->user_start
        );
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();