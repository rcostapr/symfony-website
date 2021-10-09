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
                "a_variable" => "",
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
        // use this to get all the available attributes (not only routing ones):
        $routeParameters = $request->attributes->get('_route_params');
        // {"_route":"app_artigo_update","_controller":"App\\Controller\\Artigo::update","_route_params":[]}
        $allAttributes = $request->attributes->all();

        $post = $_POST;

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
        $data["html"] = "<p>Navigation ID " . $post["artigoid"] . "</p>";
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

        $scripts = ["/js/library.js", "/js/artigo.js"];
        $metatitle = "Artigo :: App Store Commerce";
        $metadescr = "Gestão de Artigos";
        $blade = Blade::getInstance();
        $html = $blade->render(
            "artigo",
            [
                "metatitle" => $metatitle,
                "metadescr" => $metadescr,
                "customScript" => $scripts,
                "page" => "Artigos",
                "artigoid" => $artigoid,
                "navigation" => $navigation,
            ]
        );
        $response = new Response($html);
        return $response;
    }
}
