<?php

/**
 * Manage App configuration file
 */

namespace App\Config;

/**
 * Manage App configuration file
 */
class Config
{
    private static $configfile =  __DIR__ . "/../../config.ini";

    /**
     * return default configuration file
     */
    private static function getConfigFilePath(): String
    {
        return self::$configfile;
    }


    /**
     * Get configuration file content
     *
     * @param string    $section Section to retrieve
     * @param string    $parameter Parameter of the section to retrieve
     *
     * @return mixed    Null on Error | String if looking for parameter | Array otherwise 
     *
     */
    public static function get(string $section = null, string $parameter = null)
    {
        if (!file_exists(self::$configfile)) {
            throw new \Exception("NOT FOUND File: " . self::$configfile, 404);
        }
        // Parse with sections
        $ini_array = parse_ini_file(self::$configfile, true);

        if (isset($section) && isset($parameter)) {
            if (isset($ini_array[$section]) && isset($ini_array[$section][$parameter])) {
                return $ini_array[$section][$parameter];
            }
            return null;
        }

        if (isset($section)) {
            if (isset($ini_array[$section])) {
                return $ini_array[$section];
            }
            return null;
        }

        if (isset($parameter)) {
            return null;
        }

        return $ini_array;
    }
}
