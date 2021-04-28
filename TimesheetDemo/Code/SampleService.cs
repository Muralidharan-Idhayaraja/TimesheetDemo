using System;

using System.Collections.Generic;

using System.Linq;

using System.Text;

using System.Threading.Tasks;

using System.ServiceModel;

using System.ServiceModel.Web;

using System.ServiceModel.Activation;



using Microsoft.SharePoint;



using System.Configuration;

using System.Security.Principal;

using System.Web;

using Microsoft.Web.Hosting.Administration;

namespace TimesheetDemo.Code


{

    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]

    public sealed class SampleService : ISampleService

    {

        public string SampleServiceCall(string itemId)

        {
            return "SuccessCall";
        }
    }
}

