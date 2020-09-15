using System.Web;
using System.Web.Optimization;

namespace RPGManager.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            Bundle externalBundle = new ScriptBundle("~/Bundles/External")
                .Include("~/Scripts/*.js");
            bundles.Add(externalBundle);

            Bundle contentBundle = new ScriptBundle("~/Bundles/Content")
                .Include("~/Content/Character.js")
                .Include("~/Content/*.js");

            contentBundle.Orderer = new NonOrderingBundleOrderer();

            bundles.Add(contentBundle);

            bundles.Add(new StyleBundle("~/Bundles/Content/Styles").Include("~/Content/Styles/*.css"));
        }
    }
}