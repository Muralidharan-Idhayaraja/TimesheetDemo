


'use strict';

//ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");
var scriptbase = 'https://chennaitillidsoft.sharepoint.com/sites/developer/_layouts/15/';
var hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
var appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));

$(document).ready(function () {
    //getUserName();

    $.getScript(scriptbase + "SP.js", function (data, textStatus, jqxhr) {
        console.log(textStatus); // Success
        console.log(jqxhr.status); // 200
        console.log("sp.js Load was performed.");
        isListAlreadyExists();
    });
    $.getScript(appweburl + "/scripts/AppConstants.js", function (data, textStatus, jqxhr) {
        console.log(textStatus); // Success
        console.log(jqxhr.status); // 200
        console.log("App constants js Load was performed.");
        //isListAlreadyExists();
    });
    //  isListAlreadyExists();
});
function isListAlreadyExists() {
    var requestUri = appweburl + "/_api/SP.AppContextSite(@target)" +
        "/web/lists/getbytitle('Employees')/items?@target='" + hostweburl + "'";
    jQuery.ajax({
        url: requestUri,
        type: "GET",
        async: false,
        headers: { "accept": "application/json;odata=verbose" },
        success: function (data) {
            console.log("Success");
            console.log(data.d);
        },
        error: function (err) {
            console.log("Error Occured:" + JSON.stringify(err));
        }
    });
}
function getQueryStringParameter(paramToRetrieve) {
    var params = document.URL.split("?")[1].split("&");
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] === paramToRetrieve)
            return singleParam[1];
    }
    return "";
}
function initializePage() {
    var hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    var appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));

    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();

    // This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
    $(document).ready(function () {
        getUserName();
        $.getScript(scriptbase + "SP.js", function (data, textStatus, jqxhr) {
            console.log(textStatus); // Success
            console.log(jqxhr.status); // 200
            console.log("sp.js Load was performed.");
            isListAlreadyExists();
        });
        //  isListAlreadyExists();
    });

    // This function prepares, loads, and then executes a SharePoint query to get the current users information
    function getUserName() {
        context.load(user);
        context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
    }

    // This function is executed if the above call is successful
    // It replaces the contents of the 'message' element with the user name
    function onGetUserNameSuccess() {
        $('#message').text('Hello ' + user.get_title());
    }

    // This function is executed if the above call fails
    function onGetUserNameFail(sender, args) {
        alert('Failed to get user name. Error:' + args.get_message());
    }

}

function createItemAppContextSite() {
    var title = "Lorem ipsum AppContextSite";
    // item to be created
    var itemType = "SP.Data.EmployeesListItem";
    var item = {
        "__metadata": { "type": itemType },
        "Title": title
    };
    // Note: to find the item type, open this URL and look for "SP.Data."
    // http://YOUR-SP-URL/sites/Lab1/_api/web/lists/GetByTitle('Test')/items
    var url = window.SPAppWebUrl + "/_api/SP.AppContextSite(@target)" +
        "/web/lists/getbytitle('Employees')/items?" +
        "@target='" + SPHostWebUrl + "'";
    var bodyItem = JSON.stringify(item);
    // perform a POST operation to create the item.
    // Note: when writing, updating or deleting it's required to pass
    // the X-RequestDigest with the __REQUESTDIGEST value
    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        headers: {
            "Accept": "application/json;odata=verbose", // return data format
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            console.log("Item created in the host web.");
        },
        error: function (data) {
           console.log("Failed to create item in host web.");
        }
    });
}



var itemType = "SP.Data.EmployeesListItem";
var item = {
    "__metadata": { "type": itemType },
    "Title": 'aaaaaaaaaa'
};
//var requestUri = window.SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/lists/getbytitle('Employees')/items?@target='" + window.SPHostWebUrl + "'";
var url = window.SPAppWebUrl + "/_api/SP.AppContextSite(@target)" +
    "/web/lists/getbytitle('Employees')/items?" +
    "@target='" + SPHostWebUrl + "'";
console.log(url);
$.ajax({
    url: url,
    type: "POST", //Specifies the operation to create the list item
    contentType: "application/json;odata=verbose",
    data: JSON.stringify(item),
    headers:
    {
        "Accept": "application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
    },

    success: function (data) {

        alert("Item created successfully");

    },
    error: function (error) {
        console.log(JSON.stringify(error));

    }

});
























// Gopal

'use strict';

//ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");
var scriptbase = 'https://chennaitillidsoft.sharepoint.com/sites/CallReportApp/_layouts/15/';
var hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
var appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
var punchInID = decodeURIComponent(getQueryStringParameter("punchin"));
var Entry_punchin = '';
var Entry_punchout = '';
var punch_id = '';
var interval;
var executor;
var scriptbase = hostweburl + "/_layouts/15/";
var updateTimerValue = '';

$(document).ready(function () {
    loadScript(scriptbase + "/init.js", function () {
        loadScript(scriptbase + "/MicrosoftAjax.js", function () {
            loadScript(scriptbase + "/sp.runtime.js", function () {
                loadScript(scriptbase + "/sp.js", function () {
                    loadScript(scriptbase + "/SP.RequestExecutor.js", function () {
                        loadScript(scriptbase + "/PS.js", function () {
                            buttonMethod();
                        });
                    });
                });
            });
        });
    });

    if (punchInID != "" && punchInID != undefined) {
        updateTimerValue = getPunchInTime();
        timermethod();
    }


});

function pageLoad() {

    setInterval(function () {
        //var newurl;
        //if (history.pushState) {
        //    if (window.location.href.indexOf('Punchin') == -1) {
        //        newurl = window.location.href + '&Punchin=' + punch_id;
        //    }
        //    else {
        //        var url =window.location.href;
        //        newurl = replaceUrlParam(url, 'Punchin', punchInID);
        //    }
        //    window.history.pushState({ path: newurl }, '', newurl);
        //    setTimeout(location.reload(), 200);
        //}

        var oURL = document.URL;
        var nURL = oURL;
        if (window.location.href.indexOf('&punchin=') == -1) {
            nURL = oURL + '&punchin=' + punch_id;
        }
        window.location.href = nURL;

    }, 20000);
}

function replaceUrlParam(url, paramName, paramValue) {
    if (paramValue == null) {
        paramValue = '';
    }
    var pattern = new RegExp('\\b(' + paramName + '=).*?(&|#|$)');
    if (url.search(pattern) >= 0) {
        return url.replace(pattern, '$1' + paramValue + '$2');
    }
    url = url.replace(/[?#]$/, '');
    return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
}

function buttonMethod() {
    $("#btnpuchin").unbind('click');
    $("#btnpuchin").bind('click', function () {
        Entry_punchin = new Date();
        console.log("Before Store", Entry_punchin);
        $.getScript(scriptbase + "SP.RequestExecutor.js", function () {
            bindtimer("punchin");
            timermethod();
        });
    });

    $("#btnpuchout").unbind('click');
    $("#btnpuchout").bind('click', function () {
        Entry_punchout = new Date();
        $.getScript(scriptbase + "SP.RequestExecutor.js", function () {
            bindtimer("punchout");
            clearIntervalMethod();
        });

    });
}

function bindtimer(punchtype) {
    executor = new SP.RequestExecutor(appweburl);
    var requestUri;
    var Header_Body;
    var metdata;
    var itemtype = getListItemType("Punchin");
    var formDigest = $("[name='__REQUESTDIGEST']").val();
    if (punchtype === "punchin") {
        requestUri = appweburl + "/_api/SP.AppContextSite(@target)" +
            "/web/lists/getbytitle('Punchin')/items?@target='" + hostweburl + "'";
        Header_Body = {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json; odata=verbose",
            "X-RequestDigest": formDigest,
            //"X-HTTP-Method": "MERGE",
            //"If-Match": "*"
        };
        metdata = {
            '__metadata': { 'type': itemtype },
            'Title': Entry_punchin
        };
    }
    else if (punchtype === "punchout") {
        requestUri = appweburl + "/_api/SP.AppContextSite(@target)" +
            "/web/lists/getbytitle('Punchin')/items(" + punch_id + ")?@target='" + hostweburl + "'";
        Header_Body = {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json; odata=verbose",
            "X-RequestDigest": formDigest,
            "X-HTTP-Method": "MERGE",
            "If-Match": "*"
        };
        metdata = {
            '__metadata': { 'type': itemtype },
            'punchout': Entry_punchout
        };

    }

    executor.executeAsync(
        {
            url: requestUri,
            method: "POST",
            async: false,
            data: JSON.stringify(metdata),
            body: JSON.stringify(metdata),
            headers: Header_Body,
            contentType: "application/json;odata=verbose",
            success: function (data) {

                console.log("Timer value updated");
                if (punchtype === "punchin") {
                    var info = JSON.parse(data.body);
                    punch_id = info.d.Id;
                    console.log(punch_id);
                    pageLoad();
                }
            },
            error: function (err) {
                console.log("Error while adding config store list item - : " + JSON.stringify(err));
            }
        }
    );

    //$.ajax(
    //    {
    //        url: requestUri,
    //        async: false,
    //        type: "POST",
    //        data: JSON.stringify(metdata),
    //        headers: Header_Body,
    //        success: function (data) {
    //            console.log("Timer value updated");
    //            if (punchtype == "punchin") {
    //                punch_id = data.d.Id;
    //                console.log(punch_id);
    //            }
    //        },
    //        error: function (err) {
    //            console.log("List Item Error Message: " + JSON.stringify(err));
    //        }
    //    });
}

function getPunchInTime() {
    var requestUri;
    var Header_Body;
    var title = '';
    var itemtype = getListItemType("Punchin");
    var formDigest = $("[name='__REQUESTDIGEST']").val();
    requestUri = appweburl + "/_api/SP.AppContextSite(@target)" +
        "/web/lists/getbytitle('Punchin')/items(" + punchInID + ")?@target='" + hostweburl + "'";
    Header_Body = {
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
                title = data.d.Title;
            },
            error: function (err) {
                console.log("List Item Error Message: " + JSON.stringify(err));
            }
        });
    return title;
}


function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
        // handle IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        // handle other browsers
        script.onload = function () {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}


// Getting the item type for the list
function getListItemType(name) {
    return "SP.Data." + name[0].toUpperCase() + name.substring(1) + "ListItem";
}

function timermethod() {
    // Set the date we're counting down to

    var countDownDate;
    if (updateTimerValue != '' && updateTimerValue != undefined) {
        countDownDate = new Date(updateTimerValue).getTime();
    }
    else {
        countDownDate = new Date(Entry_punchin).getTime();
    }
    console.log("After Store", Entry_punchin);
    console.log("After Timer", countDownDate);
    // Update the count down every 1 second
    interval = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = now - countDownDate;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("demo").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);
}

function clearIntervalMethod() {
    clearInterval(interval);
    console.log("After Timer clear", new Date());
}

function getQueryStringParameter(paramToRetrieve) {
    var params = document.URL.split("?")[1].split("&");
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] === paramToRetrieve)
            return singleParam[1];
    }
    return "";
}