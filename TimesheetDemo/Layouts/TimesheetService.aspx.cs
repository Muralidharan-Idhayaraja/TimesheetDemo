﻿using Microsoft.SharePoint;
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
        public static string TestString()
        {
            return "String works";
        }

        /// <summary>
        /// This retrieves all Time Entries for the Current User
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<TimesheetType> GetTimeSheet(int userId)
        {
            List<TimesheetType> timeCollection = new List<TimesheetType>();
            SPQuery qry = new SPQuery();
            qry.Query = @"<OrderBy>
                              <FieldRef Name='Title' />
                          </OrderBy>";
            SPListItemCollection itemCollection = Utility.ListItemCollection(SPContext.Current.Site.Url, "Timesheet", qry);

            if (itemCollection.Count > 0)
            {
                foreach (SPListItem item in itemCollection)
                {
                    timeCollection.Add(new TimesheetType
                    {
                        title = item[Constants.fieldTitle] != null ? item[Constants.fieldTitle].ToString() : string.Empty,
                        // Network = item[Constants.RoamingPartner] != null ? item[Constants.listName].ToString() : string.Empty
                    });
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
        public int hours { get; set; }
        public int hoursStandard { get; set; }
        public int hoursOvertime { get; set; }
        public string OvertimeStatus { get; set; }
        public string created { get; set; }
        public string createdby { get; set; }

    }

    public class Constants
    {
        public const string listName = "Timesheet";
        public const string fieldTitle = "Title";
        public const string fieldDescription = "Description";

    }
}