using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace ServiceTimesheet
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract]
    public interface IService1
    {

        [OperationContract]
        [WebInvoke(Method ="GET", ResponseFormat =WebMessageFormat.Json)]
        //[WebInvoke (Method ="Get",
        //    //RequestFormat =WebMessageFormat.Json,
        //    ResponseFormat =WebMessageFormat.Json,
        //    UriTemplate ="/GetData/")]
        string GetData(int value);

        [OperationContract]
        string TestPost(int value);

        [OperationContract]
        [WebInvoke(Method ="POST", ResponseFormat =WebMessageFormat.Json,RequestFormat =WebMessageFormat.Json,UriTemplate ="/AddNewTime")]
        string AddTime(TimesheetType timeInputs);



        [OperationContract]
        List<TimesheetType> GetTimesheet(int currentUserID);

        [OperationContract]
        CompositeType GetDataUsingDataContract(CompositeType composite);

        // TODO: Add your service operations here
    }


    // Use a data contract as illustrated in the sample below to add composite types to service operations.
    [DataContract]
    public class CompositeType
    {
        bool boolValue = true;
        string stringValue = "Hello ";

        [DataMember]
        public bool BoolValue
        {
            get { return boolValue; }
            set { boolValue = value; }
        }

        [DataMember]
        public string StringValue
        {
            get { return stringValue; }
            set { stringValue = value; }
        }
    }

    [DataContract]
    public class TimesheetType
    {
        public string title { get; set; }
        public string description { get; set; }
        public string category { get; set; }
        public int hours { get; set; }
        public int hoursStandard { get; set; }
        public int hoursOvertime { get; set; }
        public string OvertimeStatus { get; set; }
        public string created { get; set; }
        public string createdby { get; set; }

    }
}
