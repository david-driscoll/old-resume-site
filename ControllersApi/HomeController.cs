using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Home.V2.Models;
using Newtonsoft.Json.Linq;
using Blacklite.UI;

namespace Home.V2.ControllersApi
{
    public class HomeController : ApiController
    {
        public HomeController()
        {
        }

        public PageModel Get(string id)
        {
            return this.GetPageModel(id.UppercaseFirst());
        }
    }
}
