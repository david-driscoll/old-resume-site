using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Home.V2.Actions
{
    public interface IAvailableActions
    {
        public IEnumerable<IAvailableAction> Actions { get; }
    }

    class AvailableActions : IAvailableActions
    {
        public IEnumerable<IAvailableAction> Actions
        {
            get
            {
                return new List<IAvailableAction>()
                {
                    new AvailableAction() { Name = "Home" },
                    new AvailableAction() { Name = "About" }
                };
            }
        }
    }
}