


//window.actionHtml = '<span class="status-punchin">#: action #</span>';
window.actionpunchinHtml = '<span class="status-punchins on-clock">#: action #</span>';
window.actionpunchout = '<span class="status-punchin">#: action #</span>';

// ****************** Display Kendo Grid for SharePoint List Views Starts Here**********************************************************//



var _spListReminder = window._spListReminder || {};

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

    var kendoGrid = function (page) {
        window.gridColumns = [];
        var deferred = $.Deferred();


        var config_JSON = window.listFields != null ? listFields[page] : '';


        //window.gridColumns = [{
        //    template: "<div class='hoverHand'><a href='#: window._spPageContextInfo.webAbsoluteUrl #/Lists/" + window.listFields[window.siteName].ListName + "/DispForm.aspx?ID=#: id #'>View </a></div>",
        //    //  width: 30,
        //    hideQSearch: true,
        //}];
        var actionsHtml = '';
        var viewmoreHtml = '';
        var viewmoreHtml_po = '';
        //actionsHtml += '<div class="dropdown settings-icon"><i data-toggle="dropdown" aria-expanded="false" class="fa fa-cogs" aria-hidden="true"></i></div>';
        viewmoreHtml += '<a class="view-more" onclick="openpopup(this)"><i class="fa fa-external-link" aria-hidden="true"></i><span>View More</span></a>';
        viewmoreHtml_po += '<a class="view-more" onclick="openpopup_po(this)"><i class="fa fa-external-link" aria-hidden="true"></i><span>View More</span></a>';
        actionsHtml += '<div data-target="#: id #" class="dropdown-menu dropdown-menu-right"><a class="dropdown-item d-flex align-items-center"><span class="setting-dropdown"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span><span>Edit</span></a><a class="dropdown-item d-flex align-items-center"><span class="setting-dropdown"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></span><span>Send Invitation</span></a><a class="dropdown-item d-flex align-items-center"><span class="setting-dropdown"><i class="fa fa-eye-slash" aria-hidden="true"></i></span><span>Make Inactive</span></a><a class="dropdown-item d-flex align-items-center" href="#"><span class="setting-dropdown"><i class="fa fa-trash-o" aria-hidden="true"></i></span><span>Delete</span></a><a class="dropdown-item d-flex align-items-center" href="#"><span class="setting-dropdown"><i class="fa fa-exchange" aria-hidden="true"></i></span><span>Logs</span></a></div>';


        //window.gridColumns = [{
        //    template: actionsHtml,
        //    title:"Actions",            
        //    hideQSaerch:true
        //}]
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
            else if (element.DisplayName == 'ID') {
                window.gridColumns.push(
                    {
                        title: element.DisplayName,
                        field: element.InternalName,
                        hidden: true

                    });
            }
            else if (element.DisplayName == 'View') {

                if (element.InternalName == 'view_role') {
                    window.gridColumns.push(
                {
                    title: element.DisplayName,
                    template: viewmoreHtml,
                    click: openpopup

                });
                }
                else if (element.InternalName == 'view_po') {
                    window.gridColumns.push(
                {
                    title: element.DisplayName,
                    template: viewmoreHtml_po,
                    click: openpopup_po

                });

                } else {
                    window.gridColumns.push(
                {
                    title: element.DisplayName,
                    template: viewmoreHtml,
                    click: openpopup

                    // field:element.InternalName,
                    // title: element.DisplayName,
                    //template: $('#selectTemplate').html()
                    // template: $('#selectTemplate_ViewMore').html()

                });
                }


            }

            else if (element.DisplayName == 'Command') {
                window.gridColumns.push(
                    {
                        title: element.DisplayName,
                        field: element.InternalName,
                        //text:"Command"

                    });
            }
            else if (element.DisplayName == 'Punch-Out') {
                window.gridColumns.push(
                    {
                        field: element.InternalName,
                        title: element.DisplayName,
                        //field: element.InternalName,
                        template: '#if(punchout=="On Clock"){#' +
                                        '<span class="status-punchins on-clock">On Clock</span>#}else{#' +
                                    '<span>#: punchout #</span>' +
                                    '#}#'
                    });
            }
            else if (element.DisplayName == 'Action') {
                window.gridColumns.push(
                    {
                        field: element.InternalName,
                        title: element.DisplayName,
                        //field: element.InternalName,
                        template: '#if(action=="Punch In") {#<span class="status-punchin">Punch In</span>#} else {# <span class="status-punchout">Punch Out</span> #}#',
                    });
            }
            else if (element.InternalName == 'viewmore') {
                window.gridColumns.push(
                    {
                        // field:element.InternalName,
                        title: element.DisplayName,
                        //template: $('#selectTemplate').html()
                        template: '#if(workstatus=="Active") {#' + $('#selectTemplate_InActive').html() + '#} else {#' + $('#selectTemplate_Active').html() + '#}#',

                    });
            }
            else if (element.InternalName == 'viewmore_role') {
                window.gridColumns.push(
                    {
                        // field:element.InternalName,
                        title: element.DisplayName,
                        //template: $('#selectTemplate').html()
                        template: $('#selectTemplate_Role').html(),

                    });
            }
            else if (element.InternalName == 'viewmore_contact') {
                window.gridColumns.push(
                    {
                        // field:element.InternalName,
                        title: element.DisplayName,
                        //template: $('#selectTemplate').html()
                        template: $('#selectTemplate_Contact').html(),

                    });
            }
            else if (element.InternalName == 'viewmore_account') {
                window.gridColumns.push(
                    {
                        // field:element.InternalName,
                        title: element.DisplayName,
                        //template: $('#selectTemplate').html()
                        template: $('#selectTemplate_Account').html(),

                    });
            }
            else if (element.InternalName == 'viewmore_po') {
                window.gridColumns.push(
                    {
                        // field:element.InternalName,
                        title: element.DisplayName,
                        //template: $('#selectTemplate').html()
                        template: $('#selectTemplate_PO_Active').html(),

                    });
            }
            else if (element.InternalName == 'managetime') {
                window.gridColumns.push(
                    {
                        // field:element.InternalName,
                        title: element.DisplayName,
                        template: $('#selectTemplate').html()


                    });
            }
            else if (element.DisplayName == 'ClientName' || element.DisplayName == 'FirstName') {
                window.gridColumns.push(
                    {
                        field: element.InternalName,
                        title: element.DisplayName,
                        filterable: { ui: nameFilter }

                    });
            }

            else {
                window.gridColumns.push(
                    {
                        title: element.DisplayName,
                        field: element.InternalName,
                    });
            }

        });


        deferred.resolve();
        return deferred.promise();
    }

    var kendoFilterFunction = function () {


    }

    // invoke kendo data source
    var kendoDataSource = function (dataArray, quicksearch, placeholder) {

        $("#resultsGrid").html('');
        kendo.destroy(document.body);
        
        var dataSource = new kendo.data.DataSource({
            data: dataArray,
            pageSize: 20,
            change: function () {
                if (this.group().length > 1) {
                    $('#input').prop('disabled', true);
                    $('.quicksearch').hide();

                }
                else {
                    $('#input').prop('disabled', false);
                    $('.quicksearch').show();

                }
            }
        });

        if (quicksearch != '') {
            var autoComplete = $("#input").kendoAutoComplete({
                dataSource: dataSource,
                pageSize: 15,
                sortable: true,
                pageable: true,
                dataTextField: quicksearch,
                filter: "startswith",
                placeholder: placeholder
            });
        }


        $('#clear').unbind();
        $('#clear').bind('click', function (e) {
            autoComplete.data("kendoAutoComplete").value("");
            dataSource.filter({});
        });
        $('.k-i-close').bind('click', function (e) {
            autoComplete.data("kendoAutoComplete").value("");
            dataSource.filter({});
        });
        
        var grid = $("#resultsGrid").kendoGrid({
            columns: window.gridColumns,
            dataSource: dataSource,
            //columns: ["name", "Comentario", { command: { text: "Work", field: "Coment", click: function (e) { console.log("Hello") } } }],
            sortable: true,
            filterable: true,
            groupable: true,
            pageable: {
                refresh: true,
                buttonCount: 5,
                pageSizes: [20, 100, 1000, "all"],
            },

            dataBound: function (o) {
                //var g = $("#resultsGrid").data("kendoGrid");
                //for (var i = 0; i < g.columns.length; i++) {
                //    g.showColumn(i);
                //}
                //$("div.k-group-indicator").each(function (i, v) {
                //    g.hideColumn($(v).data("field"));
                //});

                //if ($("#resultsGrid").data("kendoGrid").columns[0].title == 'ID')
                //    $("#resultsGrid").data("kendoGrid").hideColumn(0);
            }

        }).data("kendoGrid");




    }



    var kendoDataSourceByID = function (dataArray, quicksearch, placeholder, gridID) {

        $(gridID).html('');
        //  kendo.destroy(document.body);
        var dataSource = '';
        if (gridID == '#grid_PO')
            dataSource = new kendo.data.DataSource({
                data: dataArray,
                pageSize: 20,
                group: { field: "po_Number" }
            });
        else
            dataSource = new kendo.data.DataSource({
                data: dataArray,
                pageSize: 20,              
            });

        if (quicksearch != '') {
            var autoComplete = $("#input").kendoAutoComplete({
                dataSource: dataSource,
                pageSize: 15,
                sortable: true,
                pageable: true,
                dataTextField: quicksearch,
                filter: "startswith",
                placeholder: placeholder
            });
        }


        $('#clear').unbind();
        $('#clear').bind('click', function (e) {
            autoComplete.data("kendoAutoComplete").value("");
            dataSource.filter({});
        });
        $('.k-i-close').bind('click', function (e) {
            autoComplete.data("kendoAutoComplete").value("");
            dataSource.filter({});
        });



        var grid = $(gridID).kendoGrid({
            columns: window.gridColumns,
            dataSource: dataSource,
            //columns: ["name", "Comentario", { command: { text: "Work", field: "Coment", click: function (e) { console.log("Hello") } } }],
            sortable: true,
            filterable: true,
            groupable: true,
            pageable: {
                refresh: true,
                buttonCount: 5,
                pageSizes: [20, 100, 1000, "all"],
            },

            dataBound: function (o) {
                // var g = $(gridID).data("kendoGrid");
                //  for (var i = 0; i < g.columns.length; i++) {
                //      g.showColumn(i);
                //  }
                // $("div.k-group-indicator").each(function (i, v) {
                //     g.hideColumn($(v).data("field"));
                // });

                // if ($(gridID).data("kendoGrid").columns[0].title == 'ID')
                //     $(gridID).data("kendoGrid").hideColumn(0);
            }

        }).data("kendoGrid");




    }

    // rest api call to get all reminder Item collection from Reminders List.



    return {
        return_setAllConstants: readAllConstants,
        return_KendoGrid: kendoGrid,
        return_kendoFilter: kendoFilterFunction,
        return_KendoDataSource: kendoDataSource,
        return_kendoDataSourceByID: kendoDataSourceByID
    }

}();



$(document).ready(function () {



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

//function foo1() {


//    return "fo'o";
//}
////#: action #
//var template = kendo.template("#=foo1()#"); #: action #
//kendo.template("#=predictHTML('Punch In')#");

function predictHTML(action) {
    if (action == 'Punch In') {
        return '<span class="status-punchin">Punch In</span>';
    }
    else if (action == 'Punch Out') {
        return '<span class="status-punchout">Punch Out</span>';
    }
}

function openpopup(param) {
    $('.popaction-save').hide();
    $('.popaction-cancel').hide();
    $('.popaction-edit').show();
    $('.popaction-edititem').show();
    var itemID = '';
    var itemID = $(param).parent().parent().children('td:first-child').html();
    if (itemID != '') {
        $('#myModal').modal('show');
    }
}

function enableControls() {
    console.log('make all pop up controls enabled for edit');
}





var _spListReminder1 = window._spListReminder1 || {};

_spListReminder1.functions = function () {

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

    var kendoGrid = function (page) {
        window.gridColumns = [];
        var deferred = $.Deferred();


        var config_JSON = window.listFields != null ? listFields[page] : '';


        //window.gridColumns = [{
        //    template: "<div class='hoverHand'><a href='#: window._spPageContextInfo.webAbsoluteUrl #/Lists/" + window.listFields[window.siteName].ListName + "/DispForm.aspx?ID=#: id #'>View </a></div>",
        //    //  width: 30,
        //    hideQSearch: true,
        //}];
        var actionsHtml = '';
        var viewmoreHtml = '';
        //actionsHtml += '<div class="dropdown settings-icon"><i data-toggle="dropdown" aria-expanded="false" class="fa fa-cogs" aria-hidden="true"></i></div>';
        viewmoreHtml += '<a class="view-more" onclick="openpopup(this)"><i class="fa fa-external-link" aria-hidden="true"></i><span>View More</span></a>';
        actionsHtml += '<div data-target="#: id #" class="dropdown-menu dropdown-menu-right"><a class="dropdown-item d-flex align-items-center"><span class="setting-dropdown"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span><span>Edit</span></a><a class="dropdown-item d-flex align-items-center"><span class="setting-dropdown"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></span><span>Send Invitation</span></a><a class="dropdown-item d-flex align-items-center"><span class="setting-dropdown"><i class="fa fa-eye-slash" aria-hidden="true"></i></span><span>Make Inactive</span></a><a class="dropdown-item d-flex align-items-center" href="#"><span class="setting-dropdown"><i class="fa fa-trash-o" aria-hidden="true"></i></span><span>Delete</span></a><a class="dropdown-item d-flex align-items-center" href="#"><span class="setting-dropdown"><i class="fa fa-exchange" aria-hidden="true"></i></span><span>Logs</span></a></div>';


        //window.gridColumns = [{
        //    template: actionsHtml,
        //    title:"Actions",            
        //    hideQSaerch:true
        //}]
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
            else if (element.DisplayName == 'ID') {
                window.gridColumns.push(
                    {
                        title: element.DisplayName,
                        field: element.InternalName,
                        hidden: true

                    });
            }
            else if (element.DisplayName == 'View') {
                window.gridColumns.push(
                    {
                        title: element.DisplayName,
                        //field: element.InternalName,
                        template: viewmoreHtml,
                        click: openpopup
                        //    title: "Actions",
                        //  width: parseInt(element.Width),
                        // hidden: true
                    });
            }
            else if (element.DisplayName == 'Command') {
                window.gridColumns.push(
                    {
                        title: element.DisplayName,
                        field: element.InternalName,
                        //text:"Command"

                    });
            }
            else if (element.DisplayName == 'Punch-Out') {
                window.gridColumns.push(
                    {
                        field: element.InternalName,
                        title: element.DisplayName,
                        //field: element.InternalName,
                        template: '#if(punchout=="On Clock"){#' +
                                        '<span class="status-punchins on-clock">On Clock</span>#}else{#' +
                                    '<span>#: punchout #</span>' +
                                    '#}#'
                    });
            }
            else if (element.DisplayName == 'Action') {
                window.gridColumns.push(
                    {
                        field: element.InternalName,
                        title: element.DisplayName,
                        //field: element.InternalName,
                        template: '#if(action=="Punch In") {#<span class="status-punchin">Punch In</span>#} else {# <span class="status-punchout">Punch Out</span> #}#',
                    });
            }
            else if (element.InternalName == 'viewmore') {
                window.gridColumns.push(
                    {
                        // field:element.InternalName,
                        title: element.DisplayName,
                        //template: $('#selectTemplate').html()
                        template: '#if(workstatus=="Active") {#' + $('#selectTemplate_InActive').html() + '#} else {#' + $('#selectTemplate_Active').html() + '#}#',

                    });
            }
            else if (element.InternalName == 'managetime') {
                window.gridColumns.push(
                    {
                        // field:element.InternalName,
                        title: element.DisplayName,
                        template: $('#selectTemplate').html()


                    });
            }
            else if (element.DisplayName == 'ClientName' || element.DisplayName == 'FirstName') {
                window.gridColumns.push(
                    {
                        field: element.InternalName,
                        title: element.DisplayName,
                        filterable: { ui: nameFilter }

                    });
            }

            else {
                window.gridColumns.push(
                    {
                        title: element.DisplayName,
                        field: element.InternalName,
                        width: element.width
                    });
            }



        });


        deferred.resolve();
        return deferred.promise();
    }

    var kendoFilterFunction = function () {


    }

    // invoke kendo data source
    var kendoDataSource = function (dataArray, quicksearch, placeholder) {

        kendo.destroy(document.body);
        var dataSource = new kendo.data.DataSource({
            data: dataArray,
            pageSize: 20,
            change: function () {
                if (this.group().length > 1) {
                    $('#input').prop('disabled', true);

                }
                else {
                    $('#input').prop('disabled', false);
                }
            }
        });

        var autoComplete = $("#input").kendoAutoComplete({
            dataSource: dataSource,
            pageSize: 15,
            sortable: true,
            pageable: true,
            dataTextField: quicksearch,
            filter: "startswith",
            placeholder: placeholder
        });

        $('#clear').unbind();
        $('#clear').bind('click', function (e) {
            autoComplete.data("kendoAutoComplete").value("");
            dataSource.filter({});
        });
        $('.k-i-close').bind('click', function (e) {
            autoComplete.data("kendoAutoComplete").value("");
            dataSource.filter({});
        });



        var grid = $("#resultsGrid").kendoGrid({
            columns: window.gridColumns,
            dataSource: dataSource,
            //columns: ["name", "Comentario", { command: { text: "Work", field: "Coment", click: function (e) { console.log("Hello") } } }],
            // sortable: true,
            //filterable: true,
            //  groupable: true,
            //pageable: {
            //    refresh: true,
            //    buttonCount: 5,
            //    pageSizes: [20, 100, 1000, "all"],
            //},

            //dataBound: function (o) {
            //    var g = $("#resultsGrid").data("kendoGrid");
            //    for (var i = 0; i < g.columns.length; i++) {
            //        g.showColumn(i);
            //    }
            //    $("div.k-group-indicator").each(function (i, v) {
            //        g.hideColumn($(v).data("field"));
            //    });

            //    if ($("#resultsGrid").data("kendoGrid").columns[0].title == 'ID')
            //        $("#resultsGrid").data("kendoGrid").hideColumn(0);
            //}

        });




    }

    // rest api call to get all reminder Item collection from Reminders List.



    return {
        return_setAllConstants: readAllConstants,
        return_KendoGrid: kendoGrid,
        return_kendoFilter: kendoFilterFunction,
        return_KendoDataSource: kendoDataSource
    }

}();

