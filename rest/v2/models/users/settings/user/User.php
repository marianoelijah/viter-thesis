<?php

class User{
    public $user_user_aid;
    public $user_user_is_active;
    public $user_user_first_name;
    public $user_user_last_name;
    public $user_user_email;
    public $user_user_new_email;
    public $user_user_role_id;
    public $user_user_key;
    public $user_user_password;
    public $user_user_created;
    public $user_user_datetime;

    public $connection;
    public $lastInsertedId;
    public $user_start;
    public $user_total;
    public $user_search;

    public $tblRole;
    public $tblUser;


    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblRole = " worldpeas_settings_role";
        $this->tblUser = "worldpeas_settings_user_user";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblUser} ";
            $sql .= "( user_user_is_active, ";
            $sql .= "user_user_first_name, ";
            $sql .= "user_user_last_name, ";
            $sql .= "user_user_email, ";
            $sql .= "user_user_role_id, ";
            $sql .= "user_user_key, ";
            $sql .= "user_user_created, ";
            $sql .= "user_user_datetime ) values ( ";
            $sql .= ":user_user_is_active, ";
            $sql .= ":user_user_first_name, ";
            $sql .= ":user_user_last_name, ";
            $sql .= ":user_user_email, ";
            $sql .= ":user_user_role_id, ";
            $sql .= ":user_user_key, ";
            $sql .= ":user_user_created, ";
            $sql .= ":user_user_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_user_is_active" => $this->user_user_is_active,
                "user_user_first_name" => $this->user_user_first_name,
                "user_user_last_name" => $this->user_user_last_name,
                "user_user_email" => $this->user_user_email,
                "user_user_role_id" => $this->user_user_role_id,
                "user_user_key" => $this->user_user_key,
                "user_user_created" => $this->user_user_created,
                "user_user_datetime" => $this->user_user_datetime,

            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblUser} ";
            $sql .= "order by user_user_is_active desc, ";
            $sql .= "user_user_first_name, ";
            $sql .= "user_user_last_name ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select * from {$this->tblUser} ";
            $sql .= "order by user_user_is_active desc, ";
            $sql .= "user_user_first_name, ";
            $sql .= "user_user_last_name ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->user_start - 1,
                "total" => $this->user_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function search()
    {
        try {

            $sql = "select * from {$this->tblUser} ";
            $sql .= "where ";
            $sql .= "user_user_first_name like :user_user_first_name ";
            $sql .= "or user_user_last_name like :user_user_last_name ";
            $sql .= "or user_user_email like :user_user_email ";
            $sql .= "order by user_user_is_active desc, ";
            $sql .= "user_user_first_name, ";
            $sql .= "user_user_last_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_user_first_name" => "%{$this->user_search}%",
                "user_user_last_name" => "%{$this->user_search}%",
                "user_user_email" => "%{$this->user_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterActive()
    {
        try {

            $sql = "select ";
            $sql .= "dev.*, ";
            $sql .= "role.* ";
            $sql .= "from {$this->tblUser} as dev, ";
            $sql .= "{$this->tblRole} as role ";
            $sql .= "where ";
            $sql .= "dev.user_user_role_id = role.role_aid ";
            $sql .= "and dev.user_user_is_active = :user_user_is_active ";
            $sql .= "order by dev.user_user_is_active desc, ";
            $sql .= "dev.user_user_first_name, ";
            $sql .= "dev.user_user_last_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_user_is_active" => $this->user_user_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterActiveSearch()
    {
        try {

            $sql = "select ";
            $sql .= "dev.*, ";
            $sql .= "role.* ";
            $sql .= "from {$this->tblUser} as dev, ";
            $sql .= "{$this->tblRole} as role ";
            $sql .= "where ";
            $sql .= "dev.user_user_aid = role.role_aid ";
            $sql .= "and dev.user_user_is_active = :user_user_is_active ";
            $sql .= "and ";
            $sql .= " ( ";
            $sql .= "dev.user_user_first_name like :user_user_first_name, ";
            $sql .= "or dev.user_user_last_name like :user_user_last_name, ";
            $sql .= "or dev.user_user_email like :user_user_email ";
            $sql .= " ) ";
            $sql .= "order by dev.user_user_is_active desc, ";
            $sql .= "dev.user_user_first_name, ";
            $sql .= "dev.user_user_last_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_user_is_active" => $this->user_user_is_active,
                "user_user_first_name" => "%{$this->user_search}%",
                "user_user_last_name" => "%{$this->user_search}%",
                "user_user_email" => "%{$this->user_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readById()
    {
        try {
            $sql = "select ";
            $sql .= "dev.*, ";
            $sql .= "role.* ";
            $sql .= "from {$this->tblUser} as dev, ";
            $sql .= "{$this->tblRole} as role ";
            $sql .= "where ";
            $sql .= "dev.user_user_role_aid = role.role_aid ";
            $sql .= "and user_user_aid = :user_user_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_user_aid" => $this->user_user_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLogin()
    {
        try {
            $sql = "select ";
            $sql .= "dev.*, ";
            $sql .= "role.* ";
            $sql .= "from {$this->tblUser} as dev, ";
            $sql .= "{$this->tblRole} as role ";
            $sql .= "where ";
            $sql .= "dev.user_user_role_id = role.role_aid ";
            $sql .= "and dev.user_user_email = :user_user_email ";
            $sql .= "and role.role_is_user = 1 ";
            $sql .= "and dev.user_user_is_active = 1 ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_user_email" => $this->user_user_email,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readKey()
    {
        try {
            $sql = "select ";
            $sql .= "dev.*, ";
            $sql .= "role.* ";
            $sql .= "from {$this->tblUser} as dev, ";
            $sql .= "{$this->tblRole} as role ";
            $sql .= "where ";
            $sql .= "dev.user_user_role_id = role.role_aid ";
            $sql .= "and user_user_key = :user_user_key ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_user_key" => $this->user_user_key,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readKeyChangeEmail()
    {
        try {
            $sql = "select ";
            $sql .= "dev.*, ";
            $sql .= "role.* ";
            $sql .= "from {$this->tblUser} as dev, ";
            $sql .= "{$this->tblRole} as role ";
            $sql .= "where ";
            $sql .= "dev.user_user_role_id = role.role_aid ";
            $sql .= "and user_user_key = :user_user_key ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_user_key" => $this->user_user_key,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function update()
    {
        try {
            $sql = "update {$this->tblUser} set ";
            $sql .= "user_user_first_name = :user_user_first_name, ";
            $sql .= "user_user_last_name = :user_user_last_name, ";
            $sql .= "user_user_datetime = :user_user_datetime ";
            $sql .= "where user_user_aid  = :user_user_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_user_first_name" => $this->user_user_first_name,
                "user_user_last_name" => $this->user_user_last_name,
                "user_user_datetime" => $this->user_user_datetime,
                "user_user_aid" => $this->user_user_aid
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkEmail()
    {
        try {
            $sql = "select user_user_email from {$this->tblUser} ";
            $sql .= "where user_user_email = :user_user_email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_user_email" => "{$this->user_user_email}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblUser} set ";
            $sql .= "user_user_is_active = :user_user_is_active, ";
            $sql .= "user_user_datetime = :user_user_datetime ";
            $sql .= "where user_user_aid  = :user_user_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_user_is_active" => $this->user_user_is_active,
                "user_user_datetime" => $this->user_user_datetime,
                "user_user_aid" => $this->user_user_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function updateEmailForUser()
    {
        try {
            $sql = "update {$this->tblUser} set ";
            $sql .= "user_user_email = :user_user_email, ";
            $sql .= "user_user_new_email = '' ";
            $sql .= "user_user_key = '' ";
            $sql .= "user_user_datetime = :user_user_datetime, ";
            $sql .= "where user_user_key  = :user_user_key ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_user_email" => $this->user_user_email,
                "user_user_datetime" => $this->user_user_datetime,
                "user_user_key" => $this->user_user_key
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function updateUserKeyAndNewEmail()
    {
        try {
            $sql = "update {$this->tblUser} set ";
            $sql .= "user_user_key = :user_user_key, ";
            $sql .= "user_user_new_email = :user_user_new_email ";
            $sql .= "user_user_datetime = :user_user_datetime, ";
            $sql .= "where user_user_aid  = :user_user_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_user_key" => $this->user_user_key,
                "user_user_new_email" => $this->user_user_new_email,
                "user_user_datetime" => $this->user_user_datetime,
                "user_user_aid" => $this->user_user_aid
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function setPassword()
    {
        try {
            $sql = "update {$this->tblUser} set ";
            $sql .= "user_user_password = :user_user_password, ";
            $sql .= "user_user_key = '', ";
            $sql .= "user_user_datetime = :user_user_datetime ";
            $sql .= "where user_user_key  = :user_user_key ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_user_password" => $this->user_user_password,
                "user_user_datetime" => $this->user_user_datetime,
                "user_user_key" => $this->user_user_key
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function resetPassword()
    {
        try {
            $sql = "update {$this->tblUser} set ";
            $sql .= "user_user_key = :user_user_key, ";
            $sql .= "user_user_datetime = :user_user_datetime, ";
            $sql .= "where user_user_email  = :user_user_email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_user_key" => $this->user_user_key,
                "user_user_datetime" => $this->user_user_datetime,
                "user_user_email" => $this->user_user_email
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}