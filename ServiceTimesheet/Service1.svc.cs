using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Client;

namespace ServiceTimesheet
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class Service1 : IService1
    {
        public string GetData(int value)
        {
            return string.Format("You entered: {0}", value);
        }

        public CompositeType GetDataUsingDataContract(CompositeType composite)
        {
            if (composite == null)
            {
                throw new ArgumentNullException("composite");
            }
            if (composite.BoolValue)
            {
                composite.StringValue += "Suffix";
            }
            return composite;
        }

        public List<TimesheetType> GetTimesheet(int currentUserID)
        {
            List<TimesheetType> itemCollection = new List<TimesheetType>();

            var item = new TimesheetType
            {
                title = "Murali",
                description = "Solution Deployment"
            };
            var item1 = new TimesheetType
            {
                title = "Murali",
                description = "Solutin Deployment"
            };
            itemCollection.Add(item);
            itemCollection.Add(item1);
            return itemCollection;
        }

        public string TestPost(int value)
        {
            ////Get the SP site  
            //using (SPSite oSite = new SPSite("http://miixsp.miixcrooz.com:33417/sites/Research"))
            //{
            //    //Get the Web site  
            //    using (SPWeb oWeb = oSite.OpenWeb())
            //    {
            //        // If List not exist it will throw an error  
            //        SPList oList = oWeb.Lists["Timesheet"];                   
            //        SPListItem oListItem = oList.AddItem();
            //        oListItem["Title"] = "Mr";                  
            //        oListItem.Update();

            //    }
            //}
            string siteUrl = "http://miixsp.miixcrooz.com:33417/sites/Research";
            ClientContext clientContext = new ClientContext(siteUrl);
            List oList = clientContext.Web.Lists.GetByTitle("Timesheet");
            ListItemCreationInformation listCreationInformation = new ListItemCreationInformation();
            ListItem oListItem = oList.AddItem(listCreationInformation);
            oListItem["Title"] = "Hello World";
            oListItem.Update();
            clientContext.ExecuteQuery();
            return string.Format("You entered: {0}", value);
        }

        public string AddTime(TimesheetType timeInputs)
        {
            string status = "";
            if(timeInputs!=null)
            {
                string siteUrl = "http://miixsp.miixcrooz.com:33417/sites/Research";
                ClientContext clientContext = new ClientContext(siteUrl);
                List oList = clientContext.Web.Lists.GetByTitle("Timesheet");
                ListItemCreationInformation listCreationInformation = new ListItemCreationInformation();
                ListItem oListItem = oList.AddItem(listCreationInformation);
                oListItem["Title"] = timeInputs.title;
                oListItem.Update();
                clientContext.ExecuteQuery();
                status = "Ok";
                //return string.Format("You entered: {0}", value);
            }

            return status;
        }
    }
}
