
window.gridColumns = [];
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
            { "DisplayName": "ClientID", "InternalName": "id", "Width": '30' },
            { "DisplayName": "ClientName", "InternalName": "clientname", "Width": '40' },
           { "DisplayName": "ClientLocation", "InternalName": "clientlocation", "Width": '100' },
            { "DisplayName": "CountryCode", "InternalName": "countrycode", "Width": '54' },
            { "DisplayName": "Email", "InternalName": "email", "Width": '45' },
            { "DisplayName": "PhoneNumber", "InternalName": "mobilenumber", "Width": '45' },
            { "DisplayName": "Status", "InternalName": "workstatus", "Width": '42' }
        ],
        "ViewQuery": {
            "AllItems": "$select=ID,Reminder_x0020_Status,Notice_x0020_Period,Reminder_x0020_Expiration_x0020_,Created,ExpirationTypology,Typology,CalculationBasis,ClientName,DestinationEmails/Id,DestinationEmails/Title,CCDestinationEmails/Id,CCDestinationEmails/Title&$expand=DestinationEmails,CCDestinationEmails&$top=2000&$orderby=Created desc"
        }
    }
}

//id: item.ID != null ? item.ID : '',
//    clientname: item.Title != null ? item.Title : '',
//clientlocation: item.Client_x002d_Location != null ? item.Client_x002d_Location : '',
//countrycode: item.CountryCode != null ? item.CountryCode : '',
//mobilenumber: item.PhoneNumber != null ? item.PhoneNumber : '',
//email: item.Email != null ? item.Email : '',
//workstatus: item.Status != null ? item.Status : ''





// ****************** Global Object _spListReminder Starts here **********************************************************//

window.currentSiteUrl = _spPageContextInfo.siteAbsoluteUrl;
window.currentWebUrl = _spPageContextInfo.webAbsoluteUrl;
window.AllReminders = [];
window.currentPage = decodeURIComponent(window.location.href).split('.aspx')[0].split('/')[window.location.href.split('.aspx')[0].split('/').length - 1];
window.reminderStatus = true;
window.clientsCollection = [];







// ****************** Display Kendo Grid for SharePoint List Views Starts Here**********************************************************//

var _spListReminder = window._spListReminder || {};
var url_js_Constants = currentWebUrl + '/SiteAssets/Customization/scripts/reminderConstants.js';
_spListReminder.functions = function () {

    // load all field constants
    var readAllConstants = function () {
        var deferred = $.Deferred();
        $.getScript(url_js_Constants, function (data, textStatus, jqxhr) {

            console.log(textStatus); // Success
            console.log(jqxhr.status); // 200
            console.log("Constants Load was performed.");
            if (textStatus == 'success')
                deferred.resolve('success')
            else
                deferred.reject('failed');
        });
        return deferred.promise();
    };

    // kendo Grid Columns
    var kendoGrid_Backup = function () {
        var deferred = $.Deferred();

        console.log('Site Name:' + window.siteName)
        var config_JSON = window.listFields != null ? listFields[window.siteName] : '';


        window.gridColumns = [{
            template: "<div class='hoverHand'><a href='#: window._spPageContextInfo.webAbsoluteUrl #/Lists/" + window.listFields[window.siteName].ListName + "/DispForm.aspx?ID=#: id #'>View </a></div>",
            //  width: 30,
            hideQSearch: true,
        }];
        $.each(config_JSON.GridFields, function (index, element) {
            if (element.DisplayName == 'Creation Date') {
                window.gridColumns.push(
                    {
                        title: element.DisplayName,
                        field: element.InternalName,
                        format: "{0:dd-MM-yyyy}",
                        // format: "{0:MMM dd, yyyy}",
                        //parseFormats: "{0:MM/dd/yyyy}",
                        //  width: parseInt(element.Width),
                        filterable: {
                            ui: function (element) {
                                element.kendoDatePicker({
                                    format: "{0:dd-MM-yyyy}"
                                    //format: "MMM dd, yyyy"
                                });
                            }

                        }
                    });
            } else if (element.DisplayName == 'Expiration Date') {
                window.gridColumns.push(
                    {
                        title: element.DisplayName,
                        field: element.InternalName,
                        format: "{0:dd-MM-yyyy}",
                        //   width: parseInt(element.Width),
                        filterable: {
                            ui: function (element) {
                                element.kendoDatePicker({
                                    format: "{0:dd-MM-yyyy}"
                                });
                            }
                        }
                    });

            }
            else if (element.DisplayName == 'Client Name') {
                window.gridColumns.push(
                    {
                        title: element.DisplayName,
                        field: element.InternalName,
                        //  width: parseInt(element.Width),
                        // hidden: true
                    });
            }
            else {
                window.gridColumns.push(
                    {
                        title: element.DisplayName,
                        field: element.InternalName,
                        //  width: parseInt(element.Width)
                    });
            }


        });



        deferred.resolve();
        return deferred.promise();
    }
    var kendoGrid = function () {
        var deferred = $.Deferred();


        var config_JSON = window.listFields != null ? listFields["Clients"] : '';


        //window.gridColumns = [{
        //    template: "<div class='hoverHand'><a href='#: window._spPageContextInfo.webAbsoluteUrl #/Lists/" + window.listFields[window.siteName].ListName + "/DispForm.aspx?ID=#: id #'>View </a></div>",
        //    //  width: 30,
        //    hideQSearch: true,
        //}];
        $.each(config_JSON.GridFields, function (index, element) {
            if (element.DisplayName == 'Creation Date') {
                window.gridColumns.push(
                    {
                        title: element.DisplayName,
                        field: element.InternalName,
                        format: "{0:dd-MM-yyyy}",
                        // format: "{0:MMM dd, yyyy}",
                        //parseFormats: "{0:MM/dd/yyyy}",
                        //  width: parseInt(element.Width),
                        filterable: {
                            ui: function (element) {
                                element.kendoDatePicker({
                                    format: "{0:dd-MM-yyyy}"
                                    //format: "MMM dd, yyyy"
                                });
                            }

                        }
                    });
            } else if (element.DisplayName == 'Expiration Date') {
                window.gridColumns.push(
                    {
                        title: element.DisplayName,
                        field: element.InternalName,
                        format: "{0:dd-MM-yyyy}",
                        //   width: parseInt(element.Width),
                        filterable: {
                            ui: function (element) {
                                element.kendoDatePicker({
                                    format: "{0:dd-MM-yyyy}"
                                });
                            }
                        }
                    });

            }
            else if (element.DisplayName == 'Client Name') {
                window.gridColumns.push(
                    {
                        title: element.DisplayName,
                        field: element.InternalName,
                        //  width: parseInt(element.Width),
                        // hidden: true
                    });
            }
            else {
                window.gridColumns.push(
                    {
                        title: element.DisplayName,
                        field: element.InternalName,
                        //  width: parseInt(element.Width)
                    });
            }


        });



        deferred.resolve();
        return deferred.promise();
    }

    var kendoFilterFunction = function () {


    }

    // invoke kendo data source
    var kendoDataSource = function (dataArray) {

        //var schema_DS = {
        //    model: {
        //        fields: {
        //            CreationDate: {
        //                type: "date",
        //                parse: function (e) {
        //                    return new Date(e)
        //                }
        //            },
        //            ExpirationDate: {
        //                type: "date",
        //                parse: function (e) {
        //                    return new Date(e)
        //                }
        //            }
        //        }
        //    }
        //};

        dataSource = {
            //schema: schema_DS,
            data: dataArray,
            pageSize: 20,
            //group: {
            //    field: "ClientName",
            //    title: 'Client Name'
            //}

        };


        $("#remindersGridLoading").hide();


        var grid = $("#remindersGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            filterable: true,
            groupable: true,
            pageable: {
                refresh: true,
                buttonCount: 5,
                pageSizes: [20, 100, 1000, "all"],
            },
            columns: window.gridColumns,
            dataBound: function (o) {
                var g = $("#remindersGrid").data("kendoGrid");
                for (var i = 0; i < g.columns.length; i++) {
                    g.showColumn(i);
                }
                $("div.k-group-indicator").each(function (i, v) {
                    g.hideColumn($(v).data("field"));
                });
            }
        });

    }

    // rest api call to get all reminder Item collection from Reminders List.
    var getAllRemindersCollection = function (deferred) {
        alert('works');
        return $.ajax({
            url: window.xhrURL,
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function (data) {

                console.log(data);
                if (data != null && data.d.results.length > 0) {

                    $.each(data.d.results, function (index, item) {

                        var users_ClientName = '',
                            users_DestinationEmails = '',
                            users_CCDestinationEMails = '';


                        if (item.DestinationEmails != null && item.DestinationEmails.results != undefined) {
                            if (item.DestinationEmails.results.length > 0) {
                                for (var i = 0; i < item.DestinationEmails.results.length; i++) {
                                    var comma = ', ';
                                    if (item.DestinationEmails.results.length == i + 1) { comma = ''; }
                                    users_DestinationEmails += item.DestinationEmails.results[i].Title + comma;

                                }
                            }
                        }
                        if (item.CCDestinationEmails != null && item.CCDestinationEmails.results != undefined) {
                            if (item.CCDestinationEmails.results.length > 0) {
                                for (var i = 0; i < item.CCDestinationEmails.results.length; i++) {
                                    var comma = ', ';
                                    if (item.CCDestinationEmails.results.length == i + 1) { comma = ''; }
                                    users_CCDestinationEMails += item.CCDestinationEmails.results[i].Title + comma;

                                }
                            }
                        }
                        var clientName = item.ClientName != null ? item.ClientName : '';
                        var reminders = {
                            id: item.ID,
                            Status: item.Reminder_x0020_Status != null ? item.Reminder_x0020_Status : '',
                            ClientName: item.ClientName != null ? item.ClientName : '',
                            DestinationEmails: users_DestinationEmails,
                            CCDestinationEmails: users_CCDestinationEMails,
                            ExpirationTypology: item.ExpirationTypology != null ? item.ExpirationTypology : '',
                            CreationDate: item.Created != null ? kendo.parseDate(new Date(item.Created)) : '',
                            ExpirationDate: item.Reminder_x0020_Expiration_x0020_ != null ? kendo.parseDate(new Date(item.Reminder_x0020_Expiration_x0020_)) : '',
                            NoticePeriod: item.Notice_x0020_Period != null ? item.Notice_x0020_Period : '',
                            Typology: item.Typology != null ? item.Typology : '',
                            CalculationBasis: item.CalculationBasis != null ? item.CalculationBasis : '',
                            Note: item.Note != null ? $(item.Note).text() : ''
                        };
                        window.clientsCollection.push(clientName);
                        window.AllReminders.push(reminders);

                    });

                    if (data.d.__next) {
                        console.log('next:' + data.d._next);
                        xhrURL = data.d.__next;
                        _spListReminder.functions.return_GetAllRemindersCollection(deferred);
                    }
                    else {
                        deferred.resolve(window.AllReminders);
                    }
                }
                else {

                    deferred.resolve(window.AllReminders);
                }
            },
            error: function (error) {
                deferred.reject(error);
            }
        });
    }

    // get all reminders data
    var getReminders = function () {

        window.xhrQuery = window.currentWebUrl + "/_api/web/lists/getbytitle('" + window.listFields[window.siteName].ListName + "')/Items?";
        window.xhrURL = window.xhrQuery + window.listFields[window.siteName].ViewQuery['AllItems'];
        console.log('current View: ' + window.currentView + ' And xhr Request:' + window.xhrURL); // Rest End Point
        var deferred = $.Deferred();
        _spListReminder.functions.return_GetAllRemindersCollection(deferred);
        return deferred.promise();
    }


    var get_Clients1 = function () {
        console.log('Get Clients');
        var requestUri = window.SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/lists/getbytitle('" + window.ListName_Clients + "')/items?@target='" + window.SPHostWebUrl + "'&$top=2000&$orderby=Modified desc";
        window.xhrURL = requestUri;
        console.log('And xhr Request:' + window.xhrURL); // Rest End Point
        var deferred = $.Deferred();
        _spListReminder.functions.return_getCollection(deferred);
        return deferred.promise();
    }

    var get_ClientsCollection1 = function (deferred) {
        alert('call works');
        console.log('Collection');
        window.AllClients = [];
        return $.ajax({
            url: window.xhrURL,
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function (data) {

                //console.log(data);
                if (data != null && data.d.results.length > 0) {

                    $.each(data.d.results, function (index, item) {

                        var employees = {
                            id: item.ID != null ? item.ID : '',
                            clientname: item.Title != null ? item.Title : '',
                            clientlocation: item.Client_x002d_Location != null ? item.Client_x002d_Location : '',
                            countrycode: item.CountryCode != null ? item.CountryCode : '',
                            mobilenumber: item.PhoneNumber != null ? item.PhoneNumber : '',
                            email: item.Email != null ? item.Email : '',
                            workstatus: item.Status != null ? item.Status : ''

                        };
                        window.AllClients.push(employees);

                    });


                    if (data.d.__next) {
                        console.log('next:' + data.d._next);
                        xhrURL = data.d.__next;
                        ctrl_Client.Functions.return_get_ClientsCollection(deferred);
                    }
                    else {
                        deferred.resolve(window.AllClients);
                    }
                }
                else {

                    deferred.resolve(window.AllClients);
                }
            },
            error: function (error) {
                deferred.reject(error);
            }
        });
    }

    // format SPDate to Date
    var formateDate = function (date) {
        if (date == '')
            return ''

        var day = date.getDate();
        var monthIndex = date.getMonth() + 1;
        var year = date.getFullYear();

        return monthIndex + '/' + day + '/' + year;
    }

    // hide SP Components
    var hide_SPComponents = function () {

        var deferred = $.Deferred();
        if (document.location.href.toLowerCase().indexOf('/home.aspx') != -1) {
            $("#FilterIframe3").hide();
            $("#scriptPagingWPQ2").hide();
            $($("#scriptWPQ2 > table")[1]).hide();
        }
        else {
            $("#inplaceSearchDiv_WPQ2").remove();
            $("#bottomPagingCellWPQ2").hide();
            $("#FilterIframe22").hide();
            $("#scriptPagingWPQ2").hide();
            $($("#scriptWPQ2 > table")[1]).hide();
        }

        // List Tool Bars
        $(".ms-textXLarge").removeClass("ms-textXLarge").addClass("ms-textLarge");
        var newItem = $('.ms-list-addnew a')[0];
        $('.ms-list-addnew').html('').html(newItem);
        $($(".ms-list-addnew-imgSpan20")[0]).next().html("New Reminder");

        // webpart font
        $('#s4-workspace .ms-webpart-zone').addClass('ms-rte-wpbox');

        // Grid Div
        $("#scriptWPQ2").append("<div id='remindersGridLoading'>Please wait, Loading Reminders...</div>");
        $("#scriptWPQ2").append("<div id='remindersGrid'></div>");

        deferred.resolve();
        return deferred.promise();
    }


    var registerClickEvents = function () {
        $("th[data-title='Expiration Date'] a").click(function () {

            //  _spListReminder.functions.return_kendoFilter();
            filter_ExpirationDate();
        });

        $("th[data-title='Creation Date'] a").click(function () {

            // _spListReminder.functions.return_kendoFilter();
            filter_CreationDate();
        });

    }

    var getCurrentItem = function (itemID) {
        var deferred = $.Deferred();
        var restURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + window.listFields[window.siteName].ListName + "')/Items(" + itemID + ")?$select=Created,Reminder_x0020_Status";
        $.ajax({
            url: restURL,
            type: "GET",
            headers: { "accept": "application/json;odata=verbose" },
            success: function (data) {

                if (data) {
                    if (data.d) {
                        console.log(data);
                        console.log(data.d.Created);
                        if (data.d.Created != null && data.d.Created != undefined)
                            // window.itemCreatedDate = new Date(data.d.Created).format('dd/MM/yyyy');
                            window.itemCreatedDate = new Date(data.d.Created);
                        if (data.d.Reminder_x0020_Status != null && data.d.Reminder_x0020_Status != undefined) {
                            if (data.d.Reminder_x0020_Status == 'Active')
                                window.reminderStatus = true;
                            else if (data.d.Reminder_x0020_Status == 'Closed')
                                window.reminderStatus = false;
                        }
                        deferred.resolve(window.itemCreatedDate);
                    }
                }

            },
            error: function (xhr) {
                deferred.reject(xhr.status + ': ' + xhr.statusText);
            }
        });
        return deferred.promise();
    }

    var getQueryString = function () {
        var deferred = $.Deferred();
        (function ($) {
            $.getUrlVar = function (key) {
                var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
                return result && unescape(result[1]) || "";
            };
        })(jQuery);
        window.CurrentItemID = $.getUrlVar('ID');
        if (window.CurrentItemID != '')
            deferred.resolve(window.CurrentItemID);
        else
            deferred.reject('error in getting current Item ID');
        return deferred.promise();
    }

    return {
        return_setAllConstants: readAllConstants,
        return_KendoGrid: kendoGrid,
        return_kendoFilter: kendoFilterFunction,
        return_KendoDataSource: kendoDataSource,
        return_GetReminders: get_Clients1,
        return_FormatDate: formateDate,
        return_HideSPComponents: hide_SPComponents,
        return_RegisterClickHandler: registerClickEvents,
        return_getCurrentItem: getCurrentItem,
        return_getQueryString: getQueryString,
        return_getCollection: get_ClientsCollection1
    }

}();








// ********************New Form Control Starts Here *************************************************
var _spListReminderNewFormControl = window._spListReminderNewFormControl || {};
_spListReminderNewFormControl.functions = function () {

    var setup_SPFormElements = function () {

        var deferred = $.Deferred();

        $('.ms-standardheader').filter(':contains("Client Name")').parent().next().after('<td id="reminderStatus">' +
            '<label class="switchname">Reminder Status :  </label>' +
            '<input type="checkbox" checked id="chkStatus">' +
            '</td>');
        $('#chkStatus').bootstrapToggle({
            on: 'Active',
            off: 'Closed'
        });

        $('#Reminder_x0020_Status').hide();
        $('#Reminder_x0020_Status').parent().next().hide();

        var status = $('select[title="Reminder Status"]').val();

        if (status == 'Active') {
            $('#chkStatus').bootstrapToggle('on');
        }
        else {
            $('#chkStatus').bootstrapToggle('off');
        }
        $('#chkStatus').bootstrapToggle('disable');
        $('#chkStatus').change(function () {
            if ($(this).prop('checked'))
                $('select[title="Reminder Status"]').val('Active');
            else
                $('select[title="Reminder Status"]').val('Closed');

        });
        $('[id^="Percentage"][id$="NumberField"]').next().remove();
        $('[id^="Percentage"][id$="NumberField"]').parent().append('<span style="padding-left:7px;">%</span>');
        deferred.resolve();
        return deferred.promise();
    }

    return {
        return_setupSPFormElemetns: setup_SPFormElements
    }

}();







// ****************** Edit Form Controls Starts Here **********************************************************//

var _spListReminderEditFormControl = window._spListReminderEditFormControl || {};
_spListReminderEditFormControl.functions = function () {

    var setup_SPFormElements = function () {

        var deferred = $.Deferred();

        $('.ms-standardheader').filter(':contains("Client Name")').parent().next().after('<td id="reminderStatus">' +
            '<label class="switchname">Reminder Status :  </label>' +
            '<input type="checkbox" checked id="chkStatus">' +
            '</td>');

        $('#chkStatus').bootstrapToggle({
            on: 'Active',
            off: 'Closed'
        });

        $('#Reminder_x0020_Status').hide();
        $('#Reminder_x0020_Status').parent().next().hide();

        var status = $('select[title="Reminder Status"]').val();

        if (status == 'Active') {
            $('#chkStatus').bootstrapToggle('on');
        }
        else {
            $('#chkStatus').bootstrapToggle('off');
        }

        $('#chkStatus').change(function () {

            if ($(this).prop('checked')) {
                $('select[title="Reminder Status"]').val('Active');
                window.reminderStatus = true;
                PreSaveAction();
            }
            else {
                $('select[title="Reminder Status"]').val('Closed');
                window.reminderStatus = false;
                PreSaveAction();
            }

        });
        $('[id^="Percentage"][id$="NumberField"]').next().remove();
        $('[id^="Percentage"][id$="NumberField"]').parent().append('<span style="padding-left:7px;">%</span>');
        deferred.resolve();
        return deferred.promise();
    }

    return {
        return_setupSPFormElemetns: setup_SPFormElements
    }

}();









$(document).ready(function () {

    ctrl_Client.Functions.return_get_AllAppConstants().then(function (nothing) {
        _spListReminder.functions.return_KendoGrid().then(function (defineColumns) {
            console.log('Ready : Grid Fields Set Up Completed');                                        // to confirm the grid columns set up 
            _spListReminder.functions.return_GetReminders().then(function (AllReminders) {
                console.log(window.gridColumns);                                                        // display grid columns
                console.log('Ready : Reminders Data Available');
                console.log(AllReminders);
                // display Reminders data
                _spListReminder.functions.return_KendoDataSource(AllReminders);                        // invoke Kendo Grid with datasource.                        

                // _spListReminder.functions.return_RegisterClickHandler();                                // Register Filter click event Handlers
            });
        });
    });
})




function filter_ExpirationDate() {

    $("th[data-title='Expiration Date']").data("kendoFilterMenu").form.find("button[type=submit]").click(function (e) {
        var filterType = $(this.form).find($("select[data-role=dropdownlist]")).eq(0).val();
        var selectedDate = $(this.form).find($("input[data-role=datepicker]")).eq(0).val();
        var ds = $("#remindersGrid").data("kendoGrid").dataSource;
        var ds_Filter = [];
        if (ds.filter() != undefined && ds.filter() != null) {
            var refresh_Filters = ds.filter()["filters"];
            ds_Filter = refresh_Filters.filter(function (item) { return item.field != 'ExpirationDate' });
        }
        //console.log(ds_Filter);       
        console.log(ds_Filter);
        //if filter is "Is equal to"
        if (filterType == "eq") {
            e.preventDefault();
            ds_Filter.push(
                {
                    field: "ExpirationDate",
                    //create custom filter operator
                    operator: function (fieldDate) {
                        var parsedFieldDate = new Date(fieldDate.getFullYear(), fieldDate.getMonth(), fieldDate.getDate());
                        var formattedDate = kendo.toString(parsedFieldDate, 'dd-MM-yyyy');
                        //  console.log(formattedDate);
                        var result = (formattedDate == selectedDate);
                        return result;
                    },
                    value: selectedDate
                });

            ds.filter(ds_Filter);
            //close filter window
            $("th[data-title='Expiration Date']").data("kendoFilterMenu").popup.close();
        } else if (filterType == "neq") {
            e.preventDefault();
            ds_Filter.push(
                {
                    field: "ExpirationDate",
                    //create custom filter operator
                    operator: function (fieldDate) {
                        var parsedFieldDate = new Date(fieldDate.getFullYear(), fieldDate.getMonth(), fieldDate.getDate());
                        var formattedDate = kendo.toString(parsedFieldDate, 'dd-MM-yyyy');
                        // console.log(formattedDate);
                        var result = (formattedDate != selectedDate);
                        return result;
                    },
                    value: selectedDate
                });
            //  create a filter         
            // ds.filter([]);            
            ds.filter(ds_Filter);
            //close filter window
            $("th[data-title='Expiration Date']").data("kendoFilterMenu").popup.close();
        }

    });
}

function filter_CreationDate() {
    $("th[data-title='Creation Date']").data("kendoFilterMenu").form.find("button[type=submit]").click(function (e) {
        var filterType = $(this.form).find($("select[data-role=dropdownlist]")).eq(0).val();
        //$("#selectBox option[value='option1']").remove();
        var selectedDate = $(this.form).find($("input[data-role=datepicker]")).eq(0).val();
        var ds = $("#remindersGrid").data("kendoGrid").dataSource;
        var ds_Filter = [];
        if (ds.filter() != undefined && ds.filter() != null) {
            var refresh_Filters = ds.filter()["filters"];
            ds_Filter = refresh_Filters.filter(function (item) { return item.field != 'CreationDate' });
        }
        //console.log(ds_Filter);       
        console.log(ds_Filter);
        //if filter is "Is equal to"
        if (filterType == "eq") {
            e.preventDefault();
            ds_Filter.push(
                {
                    field: "CreationDate",
                    //create custom filter operator
                    operator: function (fieldDate) {
                        var parsedFieldDate = new Date(fieldDate.getFullYear(), fieldDate.getMonth(), fieldDate.getDate());
                        var formattedDate = kendo.toString(parsedFieldDate, 'dd-MM-yyyy');
                        console.log(formattedDate);
                        var result = (formattedDate == selectedDate);
                        return result;
                    },
                    value: selectedDate
                });

            ds.filter(ds_Filter);
            //close filter window
            $("th[data-title='Creation Date']").data("kendoFilterMenu").popup.close();
        } else if (filterType == "neq") {
            e.preventDefault();
            ds_Filter.push(
                {
                    field: "CreationDate",
                    //create custom filter operator
                    operator: function (fieldDate) {
                        var parsedFieldDate = new Date(fieldDate.getFullYear(), fieldDate.getMonth(), fieldDate.getDate());
                        var formattedDate = kendo.toString(parsedFieldDate, 'dd-MM-yyyy');
                        //console.log(formattedDate);
                        var result = (formattedDate != selectedDate);
                        return result;
                    },
                    value: selectedDate
                });
            //  create a filter         
            // ds.filter([]);            
            ds.filter(ds_Filter);
            //close filter window
            $("th[data-title='Creation Date']").data("kendoFilterMenu").popup.close();
        }

    });
}



function filterBackUP_ExpirationDate() {

    $("th[data-title='Expiration Date']").data("kendoFilterMenu").form.find("button[type=submit]").click(function (e) {
        var filterType = $(this.form).find($("select[data-role=dropdownlist]")).eq(0).val();
        var selectedDate = $(this.form).find($("input[data-role=datepicker]")).eq(0).val();

        //if filter is "Is equal to"
        if (filterType == "eq") {
            e.preventDefault();
            //create a filter
            $("#remindersGrid").data("kendoGrid").dataSource.filter({
                field: "ExpirationDate",
                //create custom filter operator
                operator: function (fieldDate) {
                    var parsedFieldDate = new Date(fieldDate.getFullYear(), fieldDate.getMonth(), fieldDate.getDate());
                    var formattedDate = kendo.toString(parsedFieldDate, 'dd-MM-yyyy');
                    console.log(formattedDate);
                    var result = (formattedDate == selectedDate);
                    return result;
                },
                value: selectedDate
            });
            //close filter window
            $("th[data-title='Expiration Date']").data("kendoFilterMenu").popup.close();
        }
    });
}



function PreSaveAction() {

    //$('[id^="Reminder_x0020_Expiration"][id$="DateTimeFieldDate"]').change(function () {
    //    $('.validateExpiry').hide();
    //});
    //'<div class="ms-formvalidation validateExpiry"><span role="alert"><b>You cannot leave this blank</b></span></div>';
    var errorText = window.currentPage.toLowerCase() == 'newform' ? 'cannot be in the past' : (window.currentPage.toLowerCase() == 'editform' ? 'cannot be in the past and also should be greater than Created date' : '');
    if (window.currentPage.toLowerCase() == 'newform') {
        return true;
    }
    if (!window.reminderStatus) {
        $('.validateExpiry').remove();
        return true;

    }
    $('.validateExpiry').remove();
    var datePicker = $('[id^="Reminder_x0020_Expiration"][id$="DateTimeFieldTopTable"]');
    var selectedDate = $('[id^="Reminder_x0020_Expiration"][id$="DateTimeFieldDate"]').val();

    if (selectedDate != '') {
        var formatSelectedDate = new Date(selectedDate);
        if (formatSelectedDate < window.itemCreatedDate) {

            $('.validateExpiry').remove();
            console.log('false');
            var erremail = '<div class="ms-formvalidation validateExpiry"></div>';
            datePicker.parent().next().append(erremail);
            $('.validateExpiry').html('<span role="alert"><b>Expiry Date</b> ' + errorText + '</span>');
            datePicker.focus();
            return false;
        }
        return true;
    } else {
        $('.validateExpiry').remove();
        var erremail = '<div class="ms-formvalidation validateExpiry"></div>';
        datePicker.parent().next().append(erremail);
        $('.validateExpiry').html('<span role="alert"><b>You cannot leave this blank</b></span>');
        datePicker.focus();
        return false;
    }


}




function GetUniqueValues(listName, fieldInternalName) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')?$select=Id",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" }
    })
        .then(function (response) {
            var ListId = $(response)[0].d.Id;
            $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/DefaultView?$select=id",
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" }
            })
                .then(function (response) {
                    var viewId = $(response)[0].d.Id;
                    console.log("ListId :" + ListId);
                    console.log("ViewId (Default View) :" + viewId);
                    $.ajax({
                        url: _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/filter.aspx?ListId={" + ListId + "}&FieldInternalName=" + fieldInternalName + "&ViewId={" + viewId + "}&FilterOnly=1&Filter=1",
                        method: "GET",
                        headers: { "Accept": "application/json; odata=verbose" }
                    })
                        .then(function (response) {
                            var uniqueVals = [];
                            $(response).find('OPTION').each(function (a, b) {
                                if ($(b)[0].value) {
                                    uniqueVals.push($(b)[0].value);
                                    window.clientsCollection.push($(b)[0].value);
                                }
                            })
                            console.log(uniqueVals);
                            if (window.clientsCollection.length > 0) {
                                $('[id^="ClientName"][id$="TextField"]').kendoAutoComplete({
                                    dataSource: window.clientsCollection,
                                    filter: "startswith",
                                    placeholder: "Enter the Client Name...",
                                    separator: "",
                                    change: function () {
                                        var found = false;
                                        var value = this.value();
                                        var data = this.dataSource.view();

                                        for (var idx = 0, length = data.length; idx < length; idx++) {
                                            if (data[idx] === value) {
                                                found = true;
                                                break;
                                            }
                                        }


                                    }
                                });
                                $('[id^="ClientName"][id$="TextField"]').parent().css('width', '371px');
                                $('[id^="ClientName"][id$="TextField"]').parent().css('border', 'none');
                                $('[id^="ClientName"][id$="TextField"]').css('border', '1px solid #ababab');
                                $('[id^="ClientName"][id$="TextField"]').focus(function () {
                                    $(this).css('background', 'transparent');
                                    $(this).parent().css('background', 'transparent');
                                });
                            }
                        })
                })
        });

}


// *************************  Required Changes while implementing this in other app **********************************//
// changes needed while missing the generic cases.
// ScriptWPQ Id need to be updated in HideSPComponent Function.
// List Fields Need to be added in JSON Configuration.
// Get All Data New function need to be added based on the list schema.
// Qurey Fields need to be updated.
// Form Controls Function need to be updated.
// ************************************************************************************//
