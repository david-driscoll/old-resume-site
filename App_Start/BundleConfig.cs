using System.Web;
using System.Web.Optimization;
using Blacklite.UI.Shared;

namespace Home.V2
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            //BundleContainer.LevelOne.Include("~/Scripts/thrust.*");
            BundleContainer.Css.Include("~/Content/home.v2.less");
        }
    }
}