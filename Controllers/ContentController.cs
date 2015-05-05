using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Diagnostics.Contracts;
using System.IO;
using Microsoft.Win32;
using Upside.UI.Mvc;
using Upside.IoC;
using System.Reflection;
using Upside.UI.Mvc.Util;
using System.Globalization;
using Microsoft.Ajax.Utilities;
using Upside.Globalization;
using Upside.Resource;
using System.ComponentModel;
using System.Collections.Concurrent;
using Newtonsoft.Json;
using System.Text;

namespace Upside.UI.Mvc.Areas.Platform.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    public class ContentController : PlatformControllerBase
    {
        /// <summary>
        /// Scripts the specified script name.
        /// </summary>
        /// <param name="fileName">Name of the file.</param>
        /// <returns></returns>
        [HttpGet]
        [OutputCache(Duration = 31536000)]
        [AllowAnonymous]
        public ActionResult Scripts(string fileName)
        {
            if (fileName != null)
            {
                var stream = this.ResourceManager().GetResourceStream("/Scripts/" + fileName);
                if (stream != null)
                {
                    var mime = "text/javascript";
                    if (fileName.Length > 5 && fileName.EndsWith(".tmpl", StringComparison.Ordinal))
                        mime = "text/plain";

                    if (this.HttpContext != null) this.HttpContext.CacheContext().CompressContext();
                    return new FileStreamResult(stream, mime);
                }
                var ar = HandleTemplates(fileName);
                if (ar != null)
                {
                    return ar;
                }
            }
            return new HttpNotFoundResult(fileName);
        }
        #region Templates
        private ActionResult HandleTemplates(string fileName)
        {
            if (fileName.Contains("entity.action/component/entity.collection/"))
            {
                if (this.HttpContext != null) this.HttpContext.CacheContext().CompressContext();
                return RenderEntityCollectionTemplate(fileName);
            }
            else if (fileName.Contains("entity.action/component/edit/"))
            {
                if (this.HttpContext != null) this.HttpContext.CacheContext().CompressContext();
                return RenderComponentTemplate(fileName, FormManagerMode.Edit);
            }
            else if (fileName.Contains("entity.action/component/display/"))
            {
                if (this.HttpContext != null) this.HttpContext.CacheContext().CompressContext();
                return RenderComponentTemplate(fileName, FormManagerMode.Display);
            }
            return null;
        }

        private string GetViewModelHtml<TEntity, TAction>()
            where TEntity : Upside.Domain.Entity
            where TAction : Upside.Domain.Actions.IFormActionContext<TEntity>
        {
            var viewModel = ConfigurationProvider.GetInstance<IFormActionViewModel<TEntity, TAction>>();
            viewModel.SetActionContext(ConfigurationProvider.GetInstance<TAction>());
            var viewModelInitializer = ConfigurationProvider.GetInstance<IViewComponentsEntityActionViewModelInitializer<TEntity, TAction, IFormActionViewModel<TEntity, TAction>>>();
            viewModelInitializer.InitializeViewComponents(viewModel);

            return this.PartialViewToString("EntityChildAction", viewModel);
        }

        private ActionResult RenderEntityCollectionTemplate(string fileName)
        {
            var actionClrType = fileName.Substring(fileName.LastIndexOf("/", StringComparison.Ordinal) + 1).Replace(".kendo.tmpl", "");
            Contract.Assume(!String.IsNullOrWhiteSpace(actionClrType));
            var actionType = ConfigurationProvider.GetType(actionClrType);
            Contract.Assume(actionType.GetGenericArguments().Count() > 0);
            var entityType = actionType.GetGenericArguments().First();

            var templateString = this.GetType()
                .GetMethod("GetViewModelHtml", BindingFlags.NonPublic | BindingFlags.Instance)
                .MakeGenericMethod(entityType, actionType)
                .Invoke(this, null) as string;

            return new ContentResult() { Content = templateString, ContentType = "text/plain" };
        }

        private ActionResult RenderComponentTemplate(string fileName, FormManagerMode mode)
        {
            var componentInterface = fileName.Substring(fileName.LastIndexOf("/", StringComparison.Ordinal) + 1).Replace(".kendo.tmpl", "");
            Contract.Assume(!String.IsNullOrWhiteSpace(componentInterface));
            var componentInterfaceType = ConfigurationProvider.GetType(componentInterface);

            var interfaces = componentInterfaceType.GetInterfaces().Reverse();
            foreach (var inter in interfaces)
            {
                var viewName = String.Format(CultureInfo.InvariantCulture, "{2}{0}/{1}", "Components", inter.Name, mode.ToString());
                if (this.HasViewFor(viewName))
                {
                    return new ContentResult() { ContentType = "text/plain", Content = this.PartialViewToString(viewName) };
                }
            }
            return new HttpNotFoundResult(fileName);
        }
        #endregion
        #region Localization
        //private static ConcurrentDictionary<string, string> LocalizationStaticCache = new ConcurrentDictionary<string, string>();
        private static IEnumerable<Type> ResourceGroups;

        /// <summary>
        /// Gets the localization for the specified resource file in the application
        /// Optionally takes the specific culture and returns the localized resources.
        /// </summary>
        /// <param name="resource">The resource.</param>
        /// <param name="culture">The culture.</param>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0")]
        public ActionResult Localization(string resource, string culture)
        {
            if (ResourceGroups == null)
                ResourceGroups = GetResourceGroups();

            string resourcesName = null;
            var resourceUpper = resource.ToUpperInvariant();
            if (!resource.EndsWith("resources", StringComparison.Ordinal))
                resourcesName = (resource + "resources").ToUpperInvariant();
            var culturesProvider = ConfigurationProvider.GetInstance<ILocalizationCulturesProvider>();
            var resourceType = ResourceGroups.Where(x => x.Name.ToUpperInvariant() == resourceUpper || (resourcesName != null && x.Name.ToUpperInvariant() == resourcesName)).FirstOrDefault();
            if (resourceType == null)
                return new HttpNotFoundResult(String.Format(CultureInfo.InvariantCulture, "The given resource \"{0}\" could not be found.", resource));

            CultureInfo cultureInfo = null;
            if (culture != null)
            {
                cultureInfo = culturesProvider.LocalizationCultures.Where(x => x.Name.ToUpperInvariant() == culture.ToUpperInvariant()).FirstOrDefault();
                if (cultureInfo == null)
                    return new HttpNotFoundResult(String.Format(CultureInfo.InvariantCulture, "The given culture \"{0}\" could not be found.", culture));
            }

            var content = this.GenericMethodInvoke<ContentController, string>("ProcessResourceGroup", BindingFlags.Static | BindingFlags.NonPublic, new Type[] { resourceType }, cultureInfo);
            return new ContentResult() { Content = content, ContentType = "text/javascript" };
        }

        private static IEnumerable<Type> GetResourceGroups()
        {
            var types = ConfigurationProvider.GetTypes();
            Contract.Assume(types != null);
            return types.Where(x => typeof(ResourceGroup).IsAssignableFrom(x)).ToArray();
        }

        private const string LocalizationTemplate = "define({0});";
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Globalization", "CA1308:NormalizeStringsToUppercase")]
        private static string ProcessResourceGroup<TResourceGroup>(CultureInfo culture)
            where TResourceGroup : IResourceGroup
        {
            var culturesProvider = ConfigurationProvider.GetInstance<ILocalizationCulturesProvider>();

            var resourceGroupCache = ConfigurationProvider.GetInstance<IResourceGroupCache>();
            var resourceGroup = resourceGroupCache.GetResourceGroup<TResourceGroup>();

            var properties = TypeDescriptor.GetProperties(resourceGroup)
                .Cast<PropertyDescriptor>()
                .Where(x => x.PropertyType == typeof(string));

            var defaultValuesDictionary = properties.Select(x => new KeyValuePair<string, string>(x.Name, x.GetValue(resourceGroup) as string)).ToDictionary(x => x.Key, x => x.Value);
            if (culture != null)
            {
                var valuesDictionary = properties.Select(x => new KeyValuePair<string, string>(x.Name, resourceGroup.GetLocalizedString(x.Name, culture))).ToDictionary(x => x.Key, x => x.Value).Where(x => !defaultValuesDictionary.Any(z => z.Value != x.Value));
                if (valuesDictionary.Count() == 0)
                    return String.Format(CultureInfo.InvariantCulture, LocalizationTemplate, "{}");
                return String.Format(CultureInfo.InvariantCulture, LocalizationTemplate, JsonConvert.SerializeObject(valuesDictionary));
            }
            else
            {
                var dictionaryToSerialize = new Dictionary<string, object>();
                dictionaryToSerialize.Add("root", defaultValuesDictionary);

                foreach (var cultureInfo in culturesProvider.LocalizationCultures)
                {
                    dictionaryToSerialize.Add(cultureInfo.Name.ToLowerInvariant(), true);
                }

                return String.Format(CultureInfo.InvariantCulture, LocalizationTemplate, JsonConvert.SerializeObject(dictionaryToSerialize));
            }
        }
        #endregion
        #region Content
        /// <summary>
        /// Contents the specified file name.
        /// </summary>
        /// <param name="fileName">Name of the file.</param>
        /// <returns></returns>
        [HttpGet]
        [OutputCache(Duration = 31536000)]
        [AllowAnonymous]
        public ActionResult Contents(string fileName)
        {
            if (fileName != null)
            {
                var stream = this.ResourceManager().GetResourceStream("/Content/" + fileName);
                if (stream != null)
                {
                    if (this.HttpContext != null) this.HttpContext.CacheContext().CompressContext();
                    return new FileStreamResult(stream, GetMIMEType(fileName));
                }
            }
            return new HttpNotFoundResult(fileName);
        }
        #endregion
        #region Helper Methods
        private static string GetMIMEType(string name)
        {
            string mimeType = "application/unknown";
            var lastDotIndex = name.LastIndexOf(".", StringComparison.Ordinal);
            if (lastDotIndex > -1)
            {
                RegistryKey regKey = Registry.ClassesRoot.OpenSubKey(name.Substring(lastDotIndex));
                if (regKey != null)
                {
                    object contentType = regKey.GetValue("Content Type");

                    if (contentType != null)
                        mimeType = contentType.ToString();
                }
            }
            return mimeType;
        }
        #endregion
    }
}
