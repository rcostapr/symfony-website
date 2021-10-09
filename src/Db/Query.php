<?php

/**
 * Class Query - Make query on Database
 */

namespace App\Db;

use App\Db\Db;
use PDOException;
use Exception;

/**
 * Make query on Database
 */
class Query extends Db
{

    /**
     * Query string
     * @var
     */
    private $query = "";

    /**
     * Array with values to use in query
     * @var
     */
    private $props = null;

    /**
     * Holds the affected rows on the last query execution
     */
    public $numrows = -1;

    /**
     * Dataset returned by MySql Instance
     */
    public $dataset = [];

    /**
     * Query State
     * True if it was successfully executed
     * False Otherwise
     * @var bool State
     */
    public $state = true;

    /**
     * Error handle
     * @var mixed Error
     */

    /**
     * Parent Constructor
     *
     * @param   string    $query Query string to execute
     * @param   array     $props Array with values to use with query string
     *
     * @return  void
     *
     */
    public function __construct(String $query, array $props = null)
    {
        $this->conn = Db::getInstance();

        $this->state = $this->conn->getConnectionState();
        $this->error = $this->conn->getConnectionError();
        $this->errorCode = $this->conn->getErrorCode();

        $this->query = $query;
        if (!empty($props)) {
            $this->props = $props;
        }

        if ($this->conn->getConnectionState()) {
            $this->db = $this->conn->getConn();
            $this->execQuery();
        } else {
            $this->conn->close();
        }
    }

    /**
     * Execute MySql query
     *
     * @return void
     */
    private function execQuery(): void
    {
        try {
            $this->stmt = $this->db->prepare($this->query);
            if (!empty($this->props)) {
                $this->state = $this->stmt->execute($this->props);
            } else {
                $this->state = $this->stmt->execute();
            }

            $result = $this->stmt->fetchAll();

            if (is_array($result)) {
                $this->dataset = $result;
            }

            $this->numrows = $this->stmt->rowCount();
            $this->stmt->closeCursor();
        } catch (\Throwable $th) {
            $this->stmt = null;
            $this->db = null;
            $this->state = false;
            $this->error = "Error: " . $th->getCode() . " <br> Info: " . $th->getMessage();
            $this->errorCode = $th->getCode();
            if (empty($this->error)) {
                $this->error = json_encode($th);
            }
        }
    }

    /**
     * Get last Insert Id of the instance
     *
     * @return int lastInsertId
     */
    public function getLastInsertId()
    {
        return $this->conn->getLastInsertId();
    }

    /**
     * @return string Errors on connection
     */
    public function getConnectionError()
    {
        return $this->error;
    }
    /**
     * @return bool State on connection
     */
    public function getConnectionState()
    {
        return $this->state;
    }
    /**
     * @return string Error code on connection
     */
    public function getErrorCode()
    {
        return $this->errorCode;
    }
}
