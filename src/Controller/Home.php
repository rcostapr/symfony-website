<?php

namespace App\Controller;

use App\Blade\Blade;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Twig\Twig;

class Home
{
    /**
     * @Route("/")
     */
    public function index()
    {
        $navigation = [
            1 => [
                "href" => "/",
                "caption" => "Home",
            ],
            2 => [
                "href" => "/produtos",
                "caption" => "Produtos",
            ],
            3 => [
                "href" => "/artigos",
                "caption" => "Artigos",
            ],

        ];
        $twig = Twig::getInstance();
        $html = $twig->render(
            "default.html.twig",
            [
                "page" => "Home",
                "a_variable" => "",
                "navigation" => $navigation,
            ]
        );
        $metatitle = "Home :: App Store Commerce";
        $metadescr = "Home Page";
        $blade = Blade::getInstance();
        $html = $blade->render(
            "home",
            [
                "metatitle" => $metatitle,
                "metadescr" => $metadescr,
                "page" => "Home Page",
                "navigation" => $navigation,
            ]
        );
        $response = new Response($html);
        return $response;
    }
}
