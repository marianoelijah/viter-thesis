<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../models/products/Products.php';


// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$products = new Products($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $products->products_start = $_GET['start'];
        $products->products_total = 4;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($products->products_start, $products->products_total);

        $query = checkReadLimit($products);
        $total_result = checkReadAll($products);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $products->products_total,
            $products->products_start
        );
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();