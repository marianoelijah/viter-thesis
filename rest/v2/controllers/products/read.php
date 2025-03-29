<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$products = new Products($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("productsid", $_GET)) {
  $products->products_aid = $_GET['productsid'];
  checkId($products->products_aid);
  $query = checkReadById($products);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($products);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();