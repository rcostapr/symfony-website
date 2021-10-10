<?php

/**
 * Framework Connection to Database
 */

namespace App\Db;

use PDO;
use App\Config\Config;

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
     * Initialize Database Connection.
     *
     * @param string $dbname       Name of the database on MySql server
     * @param string $username     Username to perform the connectio
     * @param string $password     Password used to make connections
     * @param string $host         Host name for database connection
     * @param string $port         Port on the host for database connetion
     * @param string $driver       Drive to use
     *
     * @return void
     */
    public function __construct(string $dbname = null, string $username = null, string $password = null, string $host = '127.0.0.1', int $port = 3306, $driver = 'mysql')
    {
        $options = [
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::MYSQL_ATTR_FOUND_ROWS => true,
        ];

        if (empty($dbname) || empty($username) || empty($password)) {
            try {
                $param = Config::get("DATABASE");
            } catch (\Throwable $th) {
                $this->error = $th->getMessage();
                $this->errorCode = $th->getCode();
            }

            if (!is_array($param)) {
                $this->error = "Config File Not Found";
            } else {

                if (isset($param["host"])) {
                    $host = $param["host"];
                }

                if (isset($param["port"])) {
                    $port = $param["port"];
                }

                if (isset($param["driver"])) {
                    $driver = $param["driver"];
                }

                $dbname = $param["dbname"];
                $username = $param["user"];
                $password = $param["pass"];
            }
        }

        if (empty($dbname) || empty($username) || empty($password)) {
            $this->error = "Connection parameters not set.";
        }


        if (!$this->db && !empty($host) && !empty($port) && !empty($dbname) && !empty($username) && !empty($password)) {
            try {
                $dns = "$driver:host=$host;port=$port;dbname=$dbname;charset=UTF8";
                $this->db = new PDO($dns, $username, $password, $options);
            } catch (\Throwable $e) {
                $this->state = false;
                $this->error = $e->getMessage();
                $this->errorCode = $e->getCode();
            }
        }
    }

    public static function getInstance($param = null)
    {
        if (isset($param)) {
            $host = '127.0.0.1';
            if (isset($param["host"])) {
                $host = $param["host"];
            }
            $port = 3306;
            if (isset($param["port"])) {
                $port = $param["port"];
            }
            $driver = 'mysql';
            if (isset($param["driver"])) {
                $driver = $param["driver"];
            }
            if (empty($param["dbname"]) || empty($param["user"]) || empty($param["pass"])) {
                throw new \Exception("Connection parameters not set.", 1);
            }

            $dbname = $param["dbname"];
            $username = $param["user"];
            $password = $param["pass"];

            return new Db($dbname, $username, $password, $host, $port, $driver);
        }

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
