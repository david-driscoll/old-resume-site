using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Home.V2.Actions
{
    public interface IAvailableAction
    {
        string Name { get; }
    }

    class AvailableAction : IAvailableAction
    {
        public string Name { get; set; }
    }
}
