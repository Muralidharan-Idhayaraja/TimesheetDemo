using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;
using System;
using System.Collections.Generic;
using System.Web.Services;



namespace TimesheetDemo.Layouts
{
    public partial class TimesheetService : LayoutsPageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

       


        [WebMethod]
        public static string AddTime(List<string> addTime)
        {
            string status = "";
            try
            {
                using (SPSite site = new SPSite(SPContext.Current.Site.Url))
                {
                    using (SPWeb web = site.OpenWeb())
                    {
                        web.AllowUnsafeUpdates = true;
                        SPList list = web.Lists["Timesheet"];
                        SPListItem item = list.Items.Add();
                        item[Constants.fieldTitle] = addTime[0].ToString();
                        item[Constants.fieldDescription] = addTime[1].ToString();
                        item[Constants.fieldCategory] = addTime[2].ToString();
                        item[Constants.fieldHours] = addTime[3].ToString();
                        item[Constants.fieldHoursStandard] = addTime[4].ToString();
                        item[Constants.fieldHoursOvertime] = addTime[5].ToString();
                        item.Update();
                        web.AllowUnsafeUpdates = false;
                        status = "success";

                    }

                }
            }
            catch (Exception ex)
            {
                status = ex.Message.ToString();

            }
            return status;
        }

            

        /// <summary>
        /// This retrieves all Time Entries for the Current User
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<TimesheetType> GetTimeSheet(string userId)
        {
            List<TimesheetType> timeCollection = new List<TimesheetType>();
            SPQuery qry = new SPQuery();
            qry.Query = @" <OrderBy>
                              <FieldRef Name='Created' Ascending='FALSE' />
                           </OrderBy>
                            <Where>
                                  <Eq>
                                     <FieldRef Name='Author' LookupId='True' />
                                     <Value Type='Integer'>" + userId + @"</Value>
                                  </Eq>
                               </Where>";

            SPListItemCollection itemCollection = Utility.ListItemCollection(SPContext.Current.Site.Url, "Timesheet", qry);

            if (itemCollection != null)
            {
                if (itemCollection.Count > 0)
                {
                    foreach (SPListItem item in itemCollection)
                    {
                        timeCollection.Add(new TimesheetType
                        {
                            title = item[Constants.fieldTitle] != null ? item[Constants.fieldTitle].ToString() : string.Empty,
                            description = item[Constants.fieldDescription] != null ? item[Constants.fieldDescription].ToString() : string.Empty,
                            category = item[Constants.fieldCategory] != null ? item[Constants.fieldCategory].ToString() : string.Empty,
                            hours = item[Constants.fieldHours] != null ? item[Constants.fieldHours].ToString() : string.Empty,
                            hoursStandard = item[Constants.fieldHoursStandard] != null ? item[Constants.fieldHoursStandard].ToString() : string.Empty,
                            hoursOvertime = item[Constants.fieldHoursOvertime] != null ? item[Constants.fieldHoursOvertime].ToString() : string.Empty,
                            overtimeApproval = item[Constants.fieldOvertimeApproval] != null ? item[Constants.fieldOvertimeApproval].ToString() : string.Empty,
                            created = item[Constants.fieldCreated] != null ? item[Constants.fieldCreated].ToString() : string.Empty,
                            // Network = item[Constants.RoamingPartner] != null ? item[Constants.listName].ToString() : string.Empty
                        });
                    }
                }

            }

            return timeCollection;
        }
    }


    /// <summary>
    /// This Handles Controller Part to fetch items from SP CMS
    /// </summary>
    public class Utility
    {
        /// <summary>
        /// Get All List Items Collection with the details of the following parameters
        /// </summary>
        /// <param name="siteUrl"></param>
        /// <param name="listName"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        public static SPListItemCollection ListItemCollection(string siteUrl, string listName, SPQuery query)
        {
            SPListItemCollection itemCollection = null;

            SPSecurity.RunWithElevatedPrivileges(delegate ()
            {
                using (SPSite site = new SPSite(siteUrl))
                {
                    using (SPWeb web = site.OpenWeb())
                    {
                        SPList list = web.Lists[listName];
                        itemCollection = list.GetItems(query);

                    }
                }


            });

            return itemCollection;

        }
    }
    public class TimesheetType
    {
        public string title { get; set; }
        public string description { get; set; }
        public string category { get; set; }
        public string hours { get; set; }
        public string hoursStandard { get; set; }
        public string hoursOvertime { get; set; }
        public string created { get; set; }
        public string createdby { get; set; }
        public string overtimeApproval { get; set; }

    }

    public class Constants
    {
        public const string listName = "Timesheet";
        public const string fieldTitle = "Title";
        public const string fieldDescription = "Description";
        public const string fieldCategory = "Category";
        public const string fieldHours = "SubmittedHours";
        public const string fieldHoursStandard = "Hours";
        public const string fieldHoursOvertime = "HoursOvertime";
        public const string fieldOvertimeApproval = "OvertimeApproval";
        public const string fieldCreated = "Created";
    }
}
