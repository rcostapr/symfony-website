<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Blade\Blade;
use App\Twig\Twig;

class Artigo
{
    /**
     * @Route("/artigos")
     */
    public function artigos(Request $request)
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
                "page" => "Artigos",
                "a_variable" => var_dump($request),
                "navigation" => $navigation,
            ]
        );
        $response = new Response($html);
        return $response;
    }

    /**
     * @Route("/artigos/update", methods={"POST"})
     */
    public function update(Request $request): Response
    {
        $routeName = $request->attributes->get('_route');
        $routeParameters = $request->attributes->get('_route_params');

        // use this to get all the available attributes (not only routing ones):
        $allAttributes = $request->attributes->all();

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

        $data["navigation"] = $navigation;
        $data["success"] = true;
        $response = new Response(json_encode($data));
        return $response;
    }

    /**
     * @Route("/artigos/{artigoid}", methods={"GET","HEAD"}, requirements={"artigoid"="\d+"})
     */
    public function artigo(int $artigoid): Response
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
            "artigo",
            [
                "page" => "Artigos",
                "a_variable" => var_dump($artigoid),
                "navigation" => $navigation,
            ]
        );
        $response = new Response($html);
        return $response;
    }
}
