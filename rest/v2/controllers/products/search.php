<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
require 'functions.php'; // NEED FOR LATER
// use needed classes
require '../../models/products/Products.php';


// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$products = new Products($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);


    $products->products_search = $data['searchValue'];

    http_response_code(200);

    if ($data['isFilter']) {
        $products->products_is_active = checkIndex($data, 'statusFilter');

        if ($products->products_search != '') {
            $query = checkFilterActiveSearch($products);
            getQueriedData($query);
        }
        $query = checkFilterActive($products);
        getQueriedData($query);
    }

    $query = checkSearch($products);
    getQueriedData($query);


    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();