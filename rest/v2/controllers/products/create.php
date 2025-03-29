<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$products = new Products($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$products->products_is_active = 1;
$products->products_image = checkIndex($data, "products_image");
$products->products_title = checkIndex($data, "products_title");
$products->products_price = checkIndex($data, "products_price");
$products->products_category_id = checkIndex($data, "products_category_id");
$products->products_created = date("Y-m-d H:i:s");
$products->products_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
// isNameExist($products, $products->products_title);


$query = checkCreate($products);

returnSuccess($products, "products", $query);