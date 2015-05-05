using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MarkdownDeep;
using System.IO;
using Blacklite.UI.Shared.Navigation;

namespace Home.V2.Controllers
{
    public class HomeController : Blacklite.UI.Shared.ApplicationControllerBase
    {
        public HomeController()
        {
        }

        [NavigationAction("Home")]
        public ActionResult Index()
        {
            return View("Index", this.GetPageModel());
        }

        public ActionResult About()
        {
            return View("Index", this.GetPageModel());
        }

        public ActionResult Resume()
        {
            return View("Index", this.GetPageModel());
        }

        public ActionResult Projects()
        {
            return View("Index", this.GetPageModel());
        }

        public ActionResult Portfolio()
        {
            return View("Index", this.GetPageModel());
        }
    }
}
