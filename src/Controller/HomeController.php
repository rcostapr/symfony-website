<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController
{
    /**
     * @Route("/")
     */
    public function index()
    {

        $html = "<h1>Index page</h1>";
        $response = new Response($html);
        return $response;
    }
}
