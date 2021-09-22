<?php

namespace App\Twig;

use Twig\Loader\FilesystemLoader;

/**
 * Twig Template
 */
class Twig
{
    private static $instance;
    /**
     * New Instance
     */
    public static function new()
    {
        $loader = new FilesystemLoader('../src/views');
        $twig = new \Twig\Environment($loader, [
            'cache' => '../cache',
        ]);
        return $twig;
    }
    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = self::new();
        }
        return self::$instance;
    }
}
