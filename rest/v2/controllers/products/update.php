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
  // check data
  checkPayload($data);
  // get data
  $products->products_aid = $_GET['productsid'];
  $products->products_image = checkIndex($data, "products_image");
  $products->products_title = checkIndex($data, "products_title");
  $products->products_price = checkIndex($data, "products_price");
  $products->products_category_id = checkIndex($data, "products_category_id");
  $products->products_created = date("Y-m-d H:i:s");
  $products->products_datetime = date("Y-m-d H:i:s");
  checkId($products->products_aid);

//checks current data to avoid same entries from being updated
// $products_title_old = checkIndex($data, 'products_title_old');
// compareTitle($products, $products_title_old, $products->products_title);
// checkId($products->products_aid);

  // update
  $query = checkUpdate($products);
  returnSuccess($products, "products", $query);
}

// return 404 error if endpoint not available
checkEndpoint();