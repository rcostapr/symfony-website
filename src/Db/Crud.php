<?php

namespace App\Db;

use App\Db\Query;

class Crud
{
    /**
     * Table on Database
     */
    protected static $table = "";

    /**
     * Get All Elements
     * ----------------
     * @param string $table Table Name
     *
     * @return array Dataset
     */
    public static function getAll($table = null)
    {
        if (empty($table)) {
            $table = static::$table;
        }
        $query = <<<SQL
        SELECT * FROM $table;
SQL;
        try {
            $conn = new Query($query);
            if (!$conn->getConnectionState()) {
                return $conn->getConnectionError();
            }
            return $conn->dataset;
        } catch (\Throwable $e) {
            return $e->getMessage();
        }
    }


    /**
     * Get Single Element
     * ------------------
     * @param string $table Table Name
     *
     * @return array Dataset table
     */
    public static function get($id, $idFieldName = "id", $table = null)
    {
        if (empty($table)) {
            $table = static::$table;
        }
        $query = <<<SQL
        SELECT * FROM $table WHERE $idFieldName = ?;
SQL;
        try {
            $conn = new Query($query, [$id]);
            if (!$conn->getConnectionState()) {
                return $conn->getConnectionError();
            }
            if (count($conn->dataset) == 1) {
                return $conn->dataset[0];
            }
            return [];
        } catch (\Throwable $e) {
            return $e->getMessage();
        }
    }

    /**
     * Get Active Elements
     * -------------------
     * @param string $table Table Name
     *
     * @return array Dataset
     */
    public static function getActive($table = null)
    {
        if (empty($table)) {
            $table = static::$table;
        }
        $query = <<<SQL
        SELECT * FROM $table WHERE active = 1;
SQL;
        try {
            $conn = new Query($query);
            if (!$conn->getConnectionState()) {
                return $conn->getConnectionError();
            }
            return $conn->dataset;
        } catch (\Throwable $e) {
            return $e->getMessage();
        }
    }

    /**
     * Update Element
     * -------------------
     * @param string $table Table Name
     *
     * @return mixed True on success | String error otherwise
     */
    public static function update($record, $idFieldName = "id", $table = null)
    {
        if (empty($table)) {
            $table = static::$table;
        }
        $vars = [];
        $params = [];
        foreach ($record as $key => $value) {
            if ($key !== $idFieldName) {
                $vars[] = $key . " = ?";
                $params[] = $value;
            }
        }
        $vars[] = "updated_at = ?";
        $values = implode(",", $vars);

        $today = Date("Y-m-d H:i:s");
        $params[] = $today;
        $params[] = $record[$idFieldName];

        $query = <<<SQL
        UPDATE $table
            SET
            $values
            WHERE $idFieldName = ?
SQL;
        try {
            $conn = new Query($query, $params);
            if (!$conn->getConnectionState()) {
                return $conn->getConnectionError();
            }
            return $conn->getConnectionState();
        } catch (\Throwable $e) {
            return $e->getMessage();
        }
    }

    /**
     * Delete Element
     * -------------------
     * @param string $table Table Name
     *
     * @return mixed True on success | String error otherwise
     */
    public static function delete($elementid, $idFieldName = "id", $table = null)
    {
        if (empty($table)) {
            $table = static::$table;
        }
        $query = <<<SQL
        DELETE FROM $table
            WHERE $idFieldName = ?
SQL;
        try {
            $conn = new Query($query, [$elementid]);
            if (!$conn->getConnectionState()) {
                return $conn->getConnectionError();
            }
            if ($conn->numrows !== 1) {
                return "Element Not Found";
            }
            return $conn->getConnectionState();
        } catch (\Throwable $e) {
            return $e->getMessage();
        }
    }

    /**
     * INSERT VALUES IN TABLE
     * ----------------------
     * @param array     $record List of pairs field => value
     * @param string    $insert Table to fill
     *
     * @return mixed    ID of the record insert on success | Sting error otherwise
     */
    public static function insert($record, $table = null)
    {
        if (empty($table)) {
            $table = static::$table;
        }
        $keys = [];
        $vars = [];
        $params = [];
        foreach ($record as $key => $value) {
            $keys[] = $key;
            $vars[] = "?";
            $params[] = $value;
        }

        $fields = implode(",", $keys);
        $values = implode(",", $vars);

        $query = <<<SQL
        INSERT INTO $table (
                $fields
            ) VALUES (
                $values
            );
SQL;
        try {
            $conn = new Query($query, $params);
            if (!$conn->getConnectionState()) {
                return $conn->getConnectionError();
            }
            return $conn->getLastInsertId();
        } catch (\Throwable $e) {
            return $e->getMessage();
        }
    }
}
