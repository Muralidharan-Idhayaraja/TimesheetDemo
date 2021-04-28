
window.TimeLogs = [];

var control_Timesheet = window.control_Timesheet || {};

control_Timesheet.functions = function () {

    var get_Timesheet_CurrentUser = function () {
        window.TimeLogs = [];
        console.log('Get All Time Logs for Current user');
        var deferred = $.Deferred();
        control_Timesheet.functions.return_get_itemCollection(deferred);
        return deferred.promise();
    }

    var get_itemCollection = function (deferred) {

        console.log('Collection');

        var siteURL = _spPageContextInfo.siteAbsoluteUrl;
        var currentUserID = _spPageContextInfo.userId;
        return $.ajax({
            type: "POST",
            url: siteURL + "/_layouts/15/TimesheetService.aspx/GetTimeSheet",
            data: '{userId:"' + currentUserID + '"}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                //console.log(data);

                if (data.d.length > 0) {
                    $.each(data.d, function (index, item) {

                        var timeItem = {
                            title: item.title !== null ? item.title : '',
                            description: item.description !== null ? $("<div>").html(item.description).text() : '',
                            category: item.category !== null ? item.category : '',
                            hours: item.hours !== null ? item.hours : '',
                            hoursStandard: item.hoursStandard !== null ? item.hoursStandard : '',
                            hoursOvertime: item.hoursOvertime !== null ? item.hoursOvertime : '',
                            overtimeApproval: item.overtimeApproval !== null ? item.overtimeApproval : '',
                            created: item.created !== null ? item.created : ''
                        };
                        window.TimeLogs.push(timeItem);

                    });
                }

                if (data.d.__next) {
                    console.log('next:' + data.d._next);
                    var xhrURL = data.d.__next;
                    control_Timesheet.functions.return_get_itemCollection(deferred);
                }
                else {
                    deferred.resolve(window.TimeLogs);
                }
            },
            error(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                deferred.reject(errorThrown);
            }
        });
    }


    var LoadGrid = function (results) {
        $("#resultsGrid").kendoGrid({
            dataSource: {
                data: results,
                pageSize: 20
            },
            height: 550,
            groupable: true,
            sortable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            columns: [{
                field: "title",
                title: "Title"
            },
            {
                field: "description",
                title: "Description"
            },
            {
                field: "category",
                title: "Category"
            },
            {
                field: 'hours',
                title: 'Hours Submitted'
            },
            { field: 'hoursStandard', title: "Hours Standard" },
            { field: 'hoursOvertime', title: "Hours Overtime" },
            { field: 'overtimeApproval', title: "Overtime Approval" },
            { field: 'created', title: 'Date' }
            ]
        });
    }

    return {
        return_get_Timesheet_CurrentUser: get_Timesheet_CurrentUser,
        return_get_itemCollection: get_itemCollection,
        return_loadGrid: LoadGrid,
    }
}();

$(document).ready(function () {
    var currentUserID = _spPageContextInfo.userId;

    control_Timesheet.functions.return_get_Timesheet_CurrentUser().then(function (results) {
        console.log('success');
        console.log(results);
        control_Timesheet.functions.return_loadGrid(results);
        $('.preloader1').fadeOut();
    });

});