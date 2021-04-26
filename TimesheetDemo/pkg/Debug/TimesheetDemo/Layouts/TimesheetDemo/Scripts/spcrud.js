'use strict';

// Employee Module Pattern
var control_Employee = window.control_Employee || {};
control_Employee.functions = function () {

    var get_Employees = function () {

        return 'nothing';
    }

    var get_EmployeesCollection = function () {
        return 'Nothing';
    }

    var add_NewEmployee = function () {
        return 'nothing';
    }

    return
    {
        return_getEmployees: get_Employees;
        return_get_EmployeesCollection: get_EmployeesCollection;


    }
}();




// Document ready
$(document).ready(function () {
 
    control_Employee.functions.return_get_Employees();
});


var _typology = window._typology || {};
_typology.functions = function () {

    var checkTypologyCategoryList = function (typology) {
        console.log(
        }

    var checkTypologyGroupList = function (userId) {

    }

    var controlTypology = function () {

    }


    var controlTypologyChange = function () {

    }

    return {
        return_checkTypologyGroupList: checkTypologyGroupList,
        return_controlTypology: controlTypology,
        return_checkTypologyCategoryList: checkTypologyCategoryList,
        return_controlTypologyChange: controlTypologyChange
    }

}();

var nothing = window.nothing || {};
nothing.functions = function () {
    var function1 = function (n) {
        console.log('Function1');
        return n;
    }
    var function2 = function () {
        console.log('function2');
    }
    return {
        return_function1: function1,
        return_function2: function2
    }
}();

$(document).ready(function () {

    var dummy = new window.nothing.functions();
    dummy.return_function1();
    dummy.return_function2();
});




var timesheetArray =[];
function getTimesheetDetails(timeSheetListName){
    var formDigest = $("[name='__REQUESTDIGEST']").val();
    var requestUri = appweburl + "/_api/SP.AppContextSite(@target)" +
		"/web/lists/getbytitle('" + timeSheetListName + "')/items?@target='" + hostweburl + "'&$filter=EmployeeId eq 9 and StartHour ge datetime'2016-08-01T00:00:00Z' and EndHour le datetime'2018-08-30T00:00:00Z'";
    var Header_Body = {
        "Accept": "application/json;odata=verbose",
        "content-type": "application/json; odata=verbose",
        "X-RequestDigest": formDigest
    };
    $.ajax(
		{
		    url: requestUri,
		    async: false,
		    type: "GET",
		    headers: Header_Body,
		    success: function (data) {
		        if (data.d != null && data.d.results.length > 0) {
		            for(var ts=0;ts<data.d.results.length;ts++)
		            {
			
		                timesheetArray.push
                            ({
                                "EventType":data.d.results[ts].EventType,
                                "ApprovalStatus":data.d.results[ts].ApprovalStatus,
                                "StartHour":orderDate(moment(new Date(data.d.results[ts].StartHour)).format("MM/DD/YYYY")),
                                "EndHour":orderDate(moment(new Date(data.d.results[ts].EndHour)).format("MM/DD/YYYY")),
                                "ID":data.d.results[ts].ID
                            });
		            }
		            console.log(timesheetArray);
		        }
		    },
		    error: function (err) {
		        console.log("List Item Error Message: " + JSON.stringify(err));
		    }
		});
}
getTimesheetDetails("Timesheet");
function tableDetails(){
    //debugger;
    for(var table = 0;table< $(".calendar-August2018 tr .calendarDay").length;table++)
    {
        var filterDateDetails = [];
        var  calendarDay = $(".calendar-August2018 tr .calendarDay:eq("+table+")").attr("data-id");
		
        if(calendarDay != undefined){
            filterDateDetails = timesheetArray.filter(function(item){
                if(item.StartHour == calendarDay){
                    return item;
                }
            });
            if(filterDateDetails.length >0){
                $(".calendar-August2018 tr .calendarDay:eq("+table+")").attr("data-itemId",filterDateDetails[0].ID);
                $(".calendar-August2018 tr .calendarDay:eq("+table+")").attr("data-status",filterDateDetails[0].ApprovalStatus);
            }
        }
    }
}tableDetails()

function orderDate(orderDateDetails){
    var TimeZoneUtilities = {
        utcToLocalTime: function getSPCurrentTime(webUrl, value) {
            return $.ajax({
                url: webUrl + "/_api/web/RegionalSettings/TimeZone",
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" }
            }).then(function (data) {
                var offset = -(data.d.Information.Bias + data.d.Information.StandardBias + data.d.Information.DaylightBias) / 60.0;
                console.log('Offset value=' + offset)
                return moment.utc(orderDateString).utcOffset(offset).toDate();
            });
        }
    };
    var orderDateString = orderDateDetails;
    var orderDate = new Date(orderDateString);
    TimeZoneUtilities.utcToLocalTime(_spPageContextInfo.webAbsoluteUrl, orderDate)
        .done(function (value) {
            DateTimeOffset = value;
            console.log("Server Time " + value)
            //   console.log("Server time: " + value.format("yyyy MM dd"));
        })
        .fail(function (error) {
            console.log(JSON.stringify(error));
        });
    return orderDateString;
}