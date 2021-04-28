using System;

using System.Collections.Generic;

using System.Linq;

using System.Text;

using System.Threading.Tasks;

using System.ServiceModel;

using System.ServiceModel.Web;

namespace TimesheetDemo.Code

{

    [ServiceContract]

    public interface ISampleService

    {

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Xml, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "SampleServiceCall({SampleValue})")]
        string SampleServiceCall(string SampleValue);
    }
}



