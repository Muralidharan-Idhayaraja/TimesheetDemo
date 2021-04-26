// define all reminder app constants
var _appConstants = window._appConstants || {};

_appConstants.Fields = function () {
    var reminderAppConstants = function () {
        window.ListName = 'Reminders';
        window.webUrl = _spPageContextInfo.webAbsoluteUrl;
        window.siteUrl = _spPageContextInfo.siteAbsoluteUrl;
        window.queryContent_Select = '$select=ID,Reminder_x0020_Status,Responsible_x0020_Person,Subject,Reminder_x0020_Description,User_x0020_Reference,Reminder_x0020_Creation_x0020_Da,Reminder_x0020_Expiration_x0020_,Amount,Notice_x0020_Period,Note';
        window.queryContent_Expand = '';
        window.queryContent_Filter = "$filter=Status eq 'Active'";
        window.queryContent_Top = '$top=2000';
        window.queryContent_OrderBy = '$orderby=Reminder_x0020_Creation_x0020_Da desc';
        window.window.gridColumns = [];
        window.fieldMapping = [];
        var selectSite = _spPageContextInfo.webAbsoluteUrl.split('/');
        window.siteName = selectSite != '' ? selectSite[selectSite.length - 1] : '';
        window.currentView = decodeURIComponent(window.location.href).split('.aspx')[0].split('/')[window.location.href.split('.aspx')[0].split('/').length - 1];
        window.listFields = {

            "SecretaryReminders": {
                "ListName": "Reminders",
                "GridFields": [
                    { "DisplayName": "Status", "InternalName": "Reminder_x0020_Status", "Width": '50' },
                    { "DisplayName": "Responsible Person", "InternalName": "ResponsiblePerson", "Width": '140' },
                    { "DisplayName": "Subject", "InternalName": "Subject", "Width": '100' },
                    { "DisplayName": "Description", "InternalName": "Reminder_x0020_Description", "Width": '200' },
                    //  { "DisplayName": "User Reference", "InternalName": "User_x0020_Reference","Width":'100' },
                    // { "DisplayName": "Creation Date", "InternalName": "Reminder_x0020_Creation_x0020_Da", "Width": '75' },
                    { "DisplayName": "Creation Date", "InternalName": "CreationDate", "Width": '75' },
                    // { "DisplayName": "Expiration Date", "InternalName": "Reminder_x0020_Expiration_x0020_", "Width": '75' },
                    { "DisplayName": "Expiration Date", "InternalName": "ExpirationDate", "Width": '75' },
                    //  { "DisplayName": "Amount", "InternalName": "Amount","Width":'100' },
                    { "DisplayName": "Notice Period", "InternalName": "Notice_x0020_Period", "Width": '60' },
                    // { "DisplayName": "Note", "InternalName": "Note","Width":'100' }
                ],
                "ViewQuery": {
                    "AllItems": "$select=ID,Reminder_x0020_Status,Responsible_x0020_Person/Id,Responsible_x0020_Person/Title,Subject,Reminder_x0020_Description,User_x0020_Reference,Created,Reminder_x0020_Expiration_x0020_,Amount,Notice_x0020_Period,Note&$top=2000&$orderby=Created desc&$expand=Responsible_x0020_Person",
                    "Active Reminders": "$select=ID,Reminder_x0020_Status,Responsible_x0020_Person/Id,Responsible_x0020_Person/Title,Subject,Reminder_x0020_Description,User_x0020_Reference,Created,Reminder_x0020_Expiration_x0020_,Amount,Notice_x0020_Period,Note&$top=2000&$orderby=Created asc&$expand=Responsible_x0020_Person&$filter=Reminder_x0020_Status eq 'Active'",
                    "Closed Reminders": "$select=ID,Reminder_x0020_Status,Responsible_x0020_Person/Id,Responsible_x0020_Person/Title,Subject,Reminder_x0020_Description,User_x0020_Reference,Created,Reminder_x0020_Expiration_x0020_,Amount,Notice_x0020_Period,Note&$top=2000&$orderby=Reminder_x0020_Expiration_x0020_ asc&$expand=Responsible_x0020_Person&$filter=Reminder_x0020_Status eq 'Closed'",
                    "View by Responsible Person": "$select=ID,Reminder_x0020_Status,Responsible_x0020_Person/Id,Responsible_x0020_Person/Title,Subject,Reminder_x0020_Description,User_x0020_Reference,Created,Reminder_x0020_Expiration_x0020_,Amount,Notice_x0020_Period,Note&$top=2000&$orderby=Reminder_x0020_Expiration_x0020_ asc&$expand=Responsible_x0020_Person&$filter=Reminder_x0020_Status eq 'Active'",
                    "View by Expiration Date": "$select=ID,Reminder_x0020_Status,Responsible_x0020_Person/Id,Responsible_x0020_Person/Title,Subject,Reminder_x0020_Description,User_x0020_Reference,Created,Reminder_x0020_Expiration_x0020_,Amount,Notice_x0020_Period,Note&$top=2000&$orderby=Reminder_x0020_Expiration_x0020_ asc&$expand=Responsible_x0020_Person&$filter=Reminder_x0020_Status eq 'Active'",
                }
            },
            "RoyaltiesReminders": {
                "ListName": "Reminders",
                "GridFields": [
                    { "DisplayName": "ClientID", "InternalName": "Status", "Width": '30' },
                    { "DisplayName": "ClientName", "InternalName": "ClientName", "Width": '40' },
                   { "DisplayName": "ClientLocation", "InternalName": "DestinationEmails", "Width": '100' },
                    { "DisplayName": "CountryCode", "InternalName": "ExpirationTypology", "Width": '54' },
                    { "DisplayName": "Email", "InternalName": "CreationDate", "Width": '45' },
                    { "DisplayName": "PhoneNumber", "InternalName": "ExpirationDate", "Width": '45' },
                    { "DisplayName": "Status", "InternalName": "NoticePeriod", "Width": '42' }
                ],
                "ViewQuery": {
                    "AllItems": "$select=ID,Reminder_x0020_Status,Notice_x0020_Period,Reminder_x0020_Expiration_x0020_,Created,ExpirationTypology,Typology,CalculationBasis,ClientName,DestinationEmails/Id,DestinationEmails/Title,CCDestinationEmails/Id,CCDestinationEmails/Title&$expand=DestinationEmails,CCDestinationEmails&$top=2000&$orderby=Created desc"
                }
            },
            "Clients": {
                "ListName": "Clients",
                "GridFields": [
                    { "DisplayName": "ClientID", "InternalName": "Status", "Width": '30' },
                    { "DisplayName": "ClientName", "InternalName": "ClientName", "Width": '40' },
                   { "DisplayName": "ClientLocation", "InternalName": "DestinationEmails", "Width": '100' },
                    { "DisplayName": "CountryCode", "InternalName": "ExpirationTypology", "Width": '54' },
                    { "DisplayName": "Email", "InternalName": "CreationDate", "Width": '45' },
                    { "DisplayName": "PhoneNumber", "InternalName": "ExpirationDate", "Width": '45' },
                    { "DisplayName": "Status", "InternalName": "NoticePeriod", "Width": '42' }
                ],
                "ViewQuery": {
                    "AllItems": "$select=ID,Reminder_x0020_Status,Notice_x0020_Period,Reminder_x0020_Expiration_x0020_,Created,ExpirationTypology,Typology,CalculationBasis,ClientName,DestinationEmails/Id,DestinationEmails/Title,CCDestinationEmails/Id,CCDestinationEmails/Title&$expand=DestinationEmails,CCDestinationEmails&$top=2000&$orderby=Created desc"
                }
            }
        }

    }
    return { return_ReadAllConstants: reminderAppConstants }
}();


_appConstants.Fields.return_ReadAllConstants();




























































//let promise = new Promise(function (resolve, reject) {
//    setTimeout(() => resolve(1), 1000);
//});

//promise.then(function (result) {
//    alert(result); // 1
//    return result * 2;
//});

//var varf1 = function () {
//    var n = 5;
//    return n;
//};

//varf1.then(function (txt) {
//    alert(n);
//});

