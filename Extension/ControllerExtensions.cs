using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using Home.V2.Models;
using MarkdownDeep;
using Blacklite.UI;
using Newtonsoft.Json;
using System.IO;
using System.Dynamic;

namespace Home.V2
{
    public static class ControllerExtensions
    {
        public static PageModel GetPageModel(this Controller controller)
        {
            var actionName = GetActionName(controller.ControllerContext.RouteData.Values).UppercaseFirst();

            var urlHelper = new UrlHelper(controller.Request.RequestContext);

            var markdown = GetMarkdownForAction(actionName).Replace("~/", controller.Request.ApplicationPath);
            var metadata = GetMetadataForAction(actionName);

            return new PageModel()
            {
                Content = markdown,
                Title = metadata.Title,
                Description = metadata.Description,
                Css = metadata.Css ?? null,
                // View controllers, will be indexed, display all the content for the crawler.
                TemplateReplace = true
            };
        }

        public static PageModel GetPageModel(this ApiController controller, string actionName)
        {
            var markdown = GetMarkdownForAction(actionName);
            var metadata = GetMetadataForAction(actionName);

            return new PageModel()
            {
                Content = markdown,
                Title = metadata.Title,
                Description = metadata.Description
            };
        }

        private static string ReadVirtualFile(string path)
        {
            using (var file = VirtualPathProvider.OpenFile(path))
            {
                using (var streamReader = new StreamReader(file))
                {
                    return streamReader.ReadToEnd();
                }
            }
        }

        private static string GetMarkdownForAction(string actionName)
        {
            var md = new Markdown();

            var content = ReadVirtualFile(String.Format("/Markdown/{0}.md", actionName));

            return md.Transform(content);
        }

        private static dynamic GetMetadataForAction(string actionName)
        {
            var content = ReadVirtualFile(String.Format("/Pages/{0}.json", actionName));

            var jsonObject = JsonConvert.DeserializeObject<dynamic>(content);

            return jsonObject;
        }

        private static string GetActionName(IDictionary<string, object> routeValues)
        {
            if (routeValues.ContainsKey("action"))
            {
                return routeValues["action"].ToString();
            }
            return string.Empty;
        }
    }
}