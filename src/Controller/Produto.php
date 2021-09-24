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
                "a_variable" => var_dump($blade),
                "navigation" => $navigation,
            ]
        );
        $response = new Response($html);
        return $response;
    }
}
