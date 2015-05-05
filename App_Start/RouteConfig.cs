using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace Home.V2
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.MapRoute(
                "About",
                "About/{id}",
                new { controller = "Home", action = "About", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                "Portfolio",
                "Portfolio/{id}",
                new { controller = "Home", action = "Portfolio", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                "Resume",
                "Resume/{id}",
                new { controller = "Home", action = "Resume", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                "Projects",
                "Projects/{id}",
                new { controller = "Home", action = "Projects", id = UrlParameter.Optional }
            );
        }
    }
}