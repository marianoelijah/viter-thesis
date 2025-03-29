<?php

// Read Active
function checkFilterActive($object)
{
    $query = $object->filterActive();
    checkQuery($query, "Empty records. (filter active)");
    return $query;
}

// Read Active Search
function checkFilterActiveSearch($object)
{
    $query = $object->filterActiveSearch();
    checkQuery($query, "Empty records. (filter active search)");
    return $query;
}