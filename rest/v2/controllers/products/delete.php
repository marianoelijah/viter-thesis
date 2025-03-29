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
  // get data
  $products->products_aid = $_GET['productsid'];
  checkId($products->products_aid);
  

  $query = checkDelete($products);

  returnSuccess($products, "Departments", $query);
}

// return 404 error if endpoint not available
checkEndpoint();