using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Home.V2.Models
{
    public class PageModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool TemplateReplace { get; set; }
        public IEnumerable<object> Css { get; set; }

        private string _content;
        private string _contentCache;
        public string Content
        {
            get
            {
                if (TemplateReplace && _contentCache == null)
                {
                    var result = _content;
                    foreach (var prop in typeof(PageModel).GetProperties().Where(x => x.Name != "Content"))
                    {
                        result = result
                            .Replace(String.Format("{{{{= it.{0} }}}}", prop.Name), prop.GetValue(this, null) as string)
                            .Replace(String.Format("{{{{=it.{0}}}}}", prop.Name), prop.GetValue(this, null) as string);
                    }
                    _contentCache = result;
                }
                return _contentCache ?? _content;
            }
            set
            {
                _content = value;
                _contentCache = null;
            }
        }
    }
}