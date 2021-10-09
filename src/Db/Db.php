<?php

/**
 * Framework Connection to Database
 */

namespace App\Db;

use PDO;
use app\Config\Config;

/**
 * Class represent a connection to database
 */
class Db
{
    /**
     * @var $db Holds the connection stream to database
     */
    protected $db;

    /**
     * @var $error Holds the connection error
     */
    protected $error = "";

    /**
     * @var $errorCode Holds the connection error code
     */
    protected $errorCode = "";

    /**
     * @var $state Connection State;
     */
    protected $state = true;

    // Hold the class instance.
    private static $instance = null;

    /**
     * Initialize MySQL database connection.
     *
     * @param $host         Host name for database connection
     * @param $port         Port on the host for database connetion
     * @param $dbname       Name of the database on MySql server
     * @param $username     Username to perform the connectio
     * @param $password     Password used to make connections
     *
     * @return void
     */
    public function __construct(string $host = null, int $port = null, string $dbname = null, string $username = null, string $password = null)
    {
        $options = [
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::MYSQL_ATTR_FOUND_ROWS => true,
        ];

        if (empty($host) || empty($port) || empty($dbname) || empty($username) || empty($password)) {
            $param = Config::get();
            if (!is_array($param)) {
                $this->error = "Config File Not Found";
            } else {
                $param = $param["DATABASE"];
                $host = $param["host"];
                $port = $param["port"];
                $dbname = $param["dbname"];
                $username = $param["user"];
                $password = $param["pass"];
            }
        }

        if (!$this->db && !empty($host) && !empty($port) && !empty($dbname) && !empty($username) && !empty($password)) {
            try {
                $this->db = new PDO('mysql:host=' . $host . ';port=' . $port . ';dbname=' . $dbname . ';charset=UTF8', $username, $password, $options);
            } catch (\Throwable $e) {
                $this->state = false;
                $this->error = $e->getMessage();
                $this->errorCode = $e->getCode();
            }
        }
    }

    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new Db();
        }
        return self::$instance;
    }

    /**
     * Destroy current database connection
     */
    public function __destruct()
    {
        $this->db = null;
    }

    /**
     * Get Current Connection
     *
     * @return PDO instance
     */
    public function getConn()
    {
        return $this->db;
    }

    /**
     * Get last Insert Id of the instance
     *
     * @return int lastInsertId
     */
    public function getLastInsertId()
    {
        return $this->db->lastInsertId();
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
