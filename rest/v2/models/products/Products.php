<?php

class Products
{
  public $products_aid;
  public $products_is_active;
  public $products_image;
  public $products_title;
  public $products_price;
  public $products_category_id;
  public $products_datetime;
  public $products_created;

  public $category_aid;
  public $category_is_active;
  public $category_image;
  public $category_title;
  public $category_datetime;
  public $category_created;


  public $connection;
  public $lastInsertedId;
  public $products_start;
  public $products_total;
  public $products_search;
  public $category_start;
  public $category_total;


  public $tblCategory;
  public $tblProducts;


  public function __construct($db)
  {
    $this->connection = $db;
    $this->tblCategory = "worldpeas_category";
    $this->tblProducts = "worldpeas_products";
  }


  public function readAll()
  {
    try {
      $sql = "select * ";
      $sql .= "from ";
      $sql .= "{$this->tblCategory} as readCategory, ";
      $sql .= "{$this->tblProducts} as readProducts ";
      $sql .= "where readCategory.category_aid = readProducts.products_category_id ";
      $sql .= "order by readProducts.products_is_active desc, ";
      $sql .= "readProducts.products_aid asc ";
      $query = $this->connection->query($sql);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function ReadAllByCategoryId()
  {
    try {
      $sql = "select * ";
      $sql .= "from ";
      $sql .= "{$this->tblCategory} as readCategory, ";
      $sql .= "{$this->tblProducts} as readProducts ";
      $sql .= "where readCategory.category_aid = readProducts.products_category_id ";
      $sql .= "and readCategory.category_aid = :products_category_id ";
      $sql .= "order by readProducts.products_is_active desc, ";
      $sql .= "readProducts.products_aid asc ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "products_category_id" => $this->products_category_id,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }


  public function readLimit()
  {
    try {
      $sql = "select * ";
      $sql .= "from ";
      $sql .= "{$this->tblCategory} as readCategory, ";
      $sql .= "{$this->tblProducts} as readProducts ";
      $sql .= "where readCategory.category_aid = readProducts.products_category_id ";
      $sql .= "order by readProducts.products_is_active desc, ";
      $sql .= "readProducts.products_aid asc ";
      $sql .= "limit :start, ";
      $sql .= ":total ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "start" => $this->products_start - 1,
        "total" => $this->products_total,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }


  public function readById()
  {
    try {
      $sql = "select * from {$this->tblProducts} ";
      $sql .= "where products_aid = :products_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "products_aid" => $this->products_aid,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }


  public function create()
  {
    try {
      $sql = "insert into {$this->tblProducts} ";
      $sql .= "(products_is_active, ";
      $sql .= "products_image, ";
      $sql .= "products_title, ";
      $sql .= "products_price, ";
      $sql .= "products_category_id, ";
      $sql .= "products_created, ";
      $sql .= "products_datetime ) values ( ";
      $sql .= ":products_is_active, ";
      $sql .= ":products_image, ";
      $sql .= ":products_title, ";
      $sql .= ":products_price, ";
      $sql .= ":products_category_id, ";
      $sql .= ":products_created, ";
      $sql .= ":products_datetime ) ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "products_is_active" => $this->products_is_active,
        "products_image" => $this->products_image,
        "products_title" => $this->products_title,
        "products_price" => $this->products_price,
        "products_category_id" => $this->products_category_id,
        "products_datetime" => $this->products_datetime,
        "products_created" => $this->products_created,


      ]);
      $this->lastInsertedId = $this->connection->lastInsertId();
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }


  // public function checkName()
  // {
  //   try {
  //     $sql = "select products_title from {$this->tblProducts} ";
  //     $sql .= "where products_title = :products_title ";
  //     $query = $this->connection->prepare($sql);
  //     $query->execute([
  //       "products_title" => "{$this->products_title}",
  //     ]);
  //   } catch (PDOException $ex) {
  //     $query = false;
  //   }
  //   return $query;
  // }


  public function update()
  {
    try {
      $sql = "update {$this->tblProducts} set ";
      $sql .= "products_image = :products_image, ";
      $sql .= "products_title = :products_title, ";
      $sql .= "products_price = :products_price, ";
      $sql .= "products_category_id = :products_category_id, ";
      $sql .= "products_datetime = :products_datetime ";
      $sql .= "where products_aid  = :products_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "products_image" => $this->products_image,
        "products_title" => $this->products_title,
        "products_price" => $this->products_price,
        "products_category_id" => $this->products_category_id,
        "products_datetime" => $this->products_datetime,
        "products_aid" => $this->products_aid
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }


  public function delete()
  {
    try {
      $sql = "delete from {$this->tblProducts} ";
      $sql .= "where products_aid = :products_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "products_aid" => $this->products_aid,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }


  public function active()
  {
    try {
      $sql = "update {$this->tblProducts} set ";
      $sql .= "products_is_active = :products_is_active, ";
      $sql .= "products_datetime = :products_datetime ";
      $sql .= "where products_aid  = :products_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "products_is_active" => $this->products_is_active,
        "products_datetime" => $this->products_datetime,
        "products_aid" => $this->products_aid,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  //   $sql = "select * ";
  // $sql .= "from ";
  // $sql .= "{$this->tblCategory} as readCategory, ";
  // $sql .= "{$this->tblProducts} as readProducts ";
  // $sql .= "where readCategory.category_aid = readProducts.products_category_id ";
  // $sql .= "order by readProducts.products_is_active desc, ";
  // $sql .= "readProducts.products_aid asc ";

  //       $sql = "select * ";
  // $sql .= "from ";
  // $sql .= "{$this->tblCategory} as readCategory, ";
  // $sql .= "{$this->tblProducts} as readProducts ";
  // $sql .= "where readCategory.category_aid = readProducts.products_category_id ";
  // $sql .= "and readCategory.category_aid = :products_category_id ";
  // $sql .= "order by readProducts.products_is_active desc, ";
  // $sql .= "readProducts.products_aid asc ";


  public function search()
  {
    try {
      $sql = "select * ";
      $sql .= "from ";
      $sql .= "{$this->tblCategory} as searchCategory, ";
      $sql .= "{$this->tblProducts} as searchProducts ";
      $sql .= "where searchProducts.products_title like :products_title ";
      $sql .= "and searchCategory.category_aid = searchProducts.products_category_id ";
      $sql .= "order by products_is_active desc, ";
      $sql .= "products_title ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "products_title" => "%{$this->products_search}%",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function filterActive()
  {
    try {
      $sql = "select * from {$this->tblProducts} ";
      $sql .= "where products_is_active like :products_is_active ";
      $sql .= "order by products_is_active desc, ";
      $sql .= "products_title ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "products_is_active" => "%{$this->products_is_active}%",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }



  public function filterActiveSearch()
  {
    try {
      $sql = "select * from {$this->tblProducts} ";
      $sql .= "where products_is_active like :products_is_active ";
      $sql .= "and products_title like :products_title ";
      $sql .= "order by products_is_active desc, ";
      $sql .= "products_title ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "products_is_active" => "$this->products_is_active",
        "products_title" => "%{$this->products_search}%",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }
}