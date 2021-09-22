<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* default.html.twig */
class __TwigTemplate_db1047c63162aded763c30b7860a56099a83799d039b2f83a4dc4565a571b9c1 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo "<!DOCTYPE html>
<html>
\t<head>
\t\t<title>";
        // line 4
        echo twig_escape_filter($this->env, ($context["page"] ?? null), "html", null, true);
        echo "
\t\t\t- App Store Commerce</title>
\t</head>
\t<body>
\t\t<ul id=\"navigation\">

\t\t\t";
        // line 10
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["navigation"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["item"]) {
            // line 11
            echo "\t\t\t\t<li>
\t\t\t\t\t<a href=\"";
            // line 12
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["item"], "href", [], "any", false, false, false, 12), "html", null, true);
            echo "\">";
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["item"], "caption", [], "any", false, false, false, 12), "html", null, true);
            echo "</a>
\t\t\t\t</li>
\t\t\t";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['item'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 15
        echo "\t\t</ul>

\t\t<h1>";
        // line 17
        echo twig_escape_filter($this->env, ($context["page"] ?? null), "html", null, true);
        echo "
\t\t\t- App Store Commerce</h1>
\t\t";
        // line 19
        echo twig_escape_filter($this->env, ($context["a_variable"] ?? null), "html", null, true);
        echo "
\t</body>
</html>
";
    }

    public function getTemplateName()
    {
        return "default.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  78 => 19,  73 => 17,  69 => 15,  58 => 12,  55 => 11,  51 => 10,  42 => 4,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "default.html.twig", "/home/rcosta/html/cpanel.myfeup.com/src/views/default.html.twig");
    }
}
