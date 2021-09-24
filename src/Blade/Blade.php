<?php

/**
 * Blade Instance creation.
 */

namespace App\Blade;

use Jenssegers\Blade\Blade as Jblade;

/**
 * Initialize Blade Instance
 */
class Blade
{

    private static $instance;

    /**
     * Initialize a new blade instance with a given document root path
     * 
     * @param string $documentroot Document root of the views
     * 
     * @return Jblade Instance
     */
    public static function New(string $documentroot = null): Jblade
    {
        if ($documentroot == null) {
            $documentroot = $_SERVER["DOCUMENT_ROOT"];
        }
        $views = $documentroot . '/../src/views';
        $cache = $documentroot . '/../cache';
        return new Jblade($views, $cache);
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = self::New();
        }
        return self::$instance;
    }
}
