<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Blade\Blade;

class Produto
{

    /**
     * @Route("/produtos")
     */
    public function produtos()
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
        $blade = Blade::getInstance();
        $html = $blade->render(
            "default",
            [
                "page" => "Produtos",
                "a_variable" => "",
                "navigation" => $navigation,
            ]
        );

        $metatitle = "Product :: App Store Commerce";
        $metadescr = "Product Page";
        $blade = Blade::getInstance();
        $html = $blade->render(
            "home",
            [
                "metatitle" => $metatitle,
                "metadescr" => $metadescr,
                "page" => "Product Page",
                "navigation" => $navigation,
            ]
        );
        $response = new Response($html);
        return $response;
    }
}
