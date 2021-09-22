<?php

namespace Twig;

use Twig\Loader\FilesystemLoader;

class Twig
{
    public static function new()
    {
        $loader = new FilesystemLoader('/path/to/templates');
        $twig = new \Twig\Environment($loader, [
            'cache' => '/path/to/compilation_cache',
        ]);
    }
}
