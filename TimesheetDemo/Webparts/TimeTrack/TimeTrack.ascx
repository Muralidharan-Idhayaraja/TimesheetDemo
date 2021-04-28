<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="TimeTrack.ascx.cs" Inherits="TimesheetDemo.Webparts.TimeTrack.TimeTrack" %>


<!-- Required meta tags -->
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />


<!-- Bootstrap CSS -->
<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.0.0/css/tempusdominus-bootstrap-4.min.css" />
<link rel="stylesheet" type="text/css" href="https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css" />

<!-- Datatable CSS -->

<link href="../../../_layouts/15/TimesheetDemo/Designs/toastr/toastr.css" rel="stylesheet" />

<!-- Custom CSS -->

<%--<link rel="stylesheet" type="text/css" href="../../Content/Kendo/kendo.common.min.css" />--%>
<%-- <link rel="stylesheet" type="text/css" href="../../Content/Kendo/kendo.man.min.css" />--%>

<link href="../../../_layouts/15/TimesheetDemo/Designs/Kendo/kendo.common-bootstrap.min.css" rel="stylesheet" />
<link href="../../../_layouts/15/TimesheetDemo/Designs/Kendo/kendo.bootstrap.min.css" rel="stylesheet" />

<link rel="stylesheet" href="../../../_layouts/15/TimesheetDemo/Designs/css/main.css" />
<link rel="stylesheet" href="../../../_layouts/15/TimesheetDemo/Designs/css/ovewrite.css" />
<link rel="stylesheet" href="../../../_layouts/15/TimesheetDemo/Designs/css//responsive.css" />


<script type="text/javascript" src="../../../_layouts/15/TimesheetDemo/Scripts/jquery-1.9.1.js"></script>
<title>Timesheet - Log Your Time</title>
<meta name="WebPartPageExpansion" content="full" />

<!-- Header -->

<SharePoint:ScriptLink Name="clienttemplates.js" runat="server" LoadAfterUI="true" Localizable="false" />
<SharePoint:ScriptLink Name="clientforms.js" runat="server" LoadAfterUI="true" Localizable="false" />
<SharePoint:ScriptLink Name="clientpeoplepicker.js" runat="server" LoadAfterUI="true" Localizable="false" />
<SharePoint:ScriptLink Name="autofill.js" runat="server" LoadAfterUI="true" Localizable="false" />
<SharePoint:ScriptLink Name="sp.js" runat="server" LoadAfterUI="true" Localizable="false" />
<SharePoint:ScriptLink Name="sp.runtime.js" runat="server" LoadAfterUI="true" Localizable="false" />
<SharePoint:ScriptLink Name="sp.core.js" runat="server" LoadAfterUI="true" Localizable="false" />





<section class="wrapper">

    <div class="container-fluid">
        <div class="row">


            <div class="col maincontainer p-3">
                <div class="container">

                    <!-- The Modal -->

                </div>
                <div class="row" id="buttons_AddEmployee">
                    <div class="col mb-3">
                        <div class="p-2 ribbon-btn search-filter">
                            <button type="button" class="btn btn-success mr-3 add-button" id="addemployee"><i class="fa fa-plus-circle" aria-hidden="true"></i>Add Time </button>
                            <button type="button" style="display: none;" class="btn btn-success mr-3 close-button close-client" id="close-addemployee"><i class="fa fa-close" aria-hidden="true"></i>Close</button>

                        </div>

                    </div>

                </div>
                <div id="form_AddEmployee">
                    <div class="add-employee add-form p-3 mb-3">
                        <h6 class="mb-3 emp-details">Submit Your Time:</h6>
                        <div class="row">
                            <div class="col-md-4 mb-2">
                                <div class="form-group">
                                    <label for="First Name">Title<em>*</em></label>
                                    <input type="text" class="form-control" id="txtTitle" placeholder="Task Title">
                                </div>
                            </div>
                            <div class="col-md-4 mb-2">
                                <div class="form-group">
                                    <label for="First Name">Description<em>*</em></label>
                                    <textarea class="form-control" id="txtDescription" placeholder="Task Description"></textarea>
                                </div>
                            </div>
                            <div class="col-md-4 mb-2">
                                <div class="form-group">
                                    <label for="Country Code">Category</label>
                                    <select class="form-control" id="drpCategory" placeholder="">
                                        <option value="Select">Select</option>
                                        <option value="Billable">Billing</option>
                                        <option value="Non-Billable">Non-Billable</option>
                                        <option value="Upskilling">Upskilling</option>
                                        <option value="Meeting">Meeting</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4 mb-2">
                                <div class="form-group">
                                    <label for="Mobile Number">Hours</label>
                                    <input type="text" class="form-control" id="txtHours" placeholder="Enter the hours">
                                </div>
                            </div>
                            <div class="col-md-4 mb-2">
                                <div class="form-group">
                                    <label for="Email">Hours (Allowed)</label>
                                    <input type="text" class="form-control" id="txtHoursAllowed" placeholder="">
                                </div>
                            </div>
                            <div class="col-md-4 mb-2">
                                <div class="form-group">
                                    <label for="Email">Hours (Overtime)</label>
                                    <input type="text" class="form-control" id="txtHoursOvertime" placeholder="">
                                </div>

                            </div>
                        </div>

                        <br />
                        <br />

                        <div class="row">
                            <div class="col mb-2">
                                <div class="form-group text-right">
                                    <button type="button" id="btnSave" class="sm-btn btn-outline-primary  mr-3" value="Save">Save</button>
                                    <button type="button" id="btnCancel" class="sm-btn btn-outline-primary" value="Cancel">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <!--Add Customer Ends-->
                <div class="row tab_Results" id="tab_Employees">
                    <div class="col loaderContent1">
                        <ul class="nav nav-tabs" id="employeetab" role="tablist">
                            <li class="nav-item col pl-0 pr-0">
                                <a class="nav-link emp_ViewAll active" id="tab-all-clients" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">All Clients</a>
                            </li>
                            <li class="nav-item col pl-0 pr-0">
                                <a class="nav-link emp_Active" id="tab-active-clients" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Active Clients</a>
                            </li>
                            <li class="nav-item col pl-0 pr-0">
                                <a class="nav-link emp_InActive" id="tab-inactive-clients" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Inactive Clients</a>
                            </li>


                        </ul>
                        <div class="preloader1"><span class="preloader-content" id="preloader-Clients">Loading All Data...</span></div>
                        <div class="tab-content p-3" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <%--<div class="form-group text-right">
                                    <label for="input" class="inf">Quick Search:</label>
                                        <input id="input" class="form-control" />                                    
                                        <button type="button" id="clear" class="sm-btn btn-outline-primary" value="Cancel">Clear Filter</button>

                                         </div>--%>
                                <div id="resultsGrid"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</section>


<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.0.0/js/tempusdominus-bootstrap-4.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>

<!-- Datatable JS -->

<script type="text/x-kendo-template" id="selectTemplate_ViewMore">
    <a class="view-more item-viewmore" onclick="openpopup(this)"><i class="fa fa-external-link" aria-hidden="true"></i><span>View More</span></a>
</script>



<script type="text/x-kendo-template" id="selectTemplate_InActive">
  
         <div class="dropdown settings-icon" data-id="#=data.id#">                                                                                                                                                                 
     <i data-toggle="dropdown" aria-expanded="false" class="fa fa-cogs" aria-hidden="true"></i>                                                                                                       
     <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item item-edit d-flex align-items-center" onclick='EditListItem(this)'><span class="setting-dropdown"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span><span>Edit</span></a> 
            <a class="dropdown-item d-flex align-items-center" onclick='SendInvitation(this)'><span class="setting-dropdown"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></span><span>Send Invitation</span></a>     
            <a class="dropdown-item item-inactive d-flex align-items-center" onclick='UpdateItemToInActive(this)'><span class="setting-dropdown"><i class="fa fa-eye-slash" aria-hidden="true"></i></span><span>Make Inactive</span></a>           
            <a class="dropdown-item item-delete d-flex align-items-center" onclick='DeleteListItem(this)'><span class="setting-dropdown"><i class="fa fa-trash-o" aria-hidden="true"></i></span><span>Delete</span></a>                    
         <%--<a class="dropdown-item d-flex align-items-center"><span class="setting-dropdown"><i class="fa fa-exchange" aria-hidden="true"></i></span><span>Logs</span></a> --%>
                            
     </div>                                                                                                                                                                                           
 </div>
</script>
<script type="text/x-kendo-template" id="selectTemplate_Active">
  
         <div class="dropdown settings-icon" data-id="#=data.id#">                                                                                                                                                                 
     <i data-toggle="dropdown" aria-expanded="false" class="fa fa-cogs" aria-hidden="true"></i>                                                                                                       
     <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item item-edit d-flex align-items-center" onclick='EditListItem(this)'><span class="setting-dropdown"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span><span>Edit</span></a> 
            <a class="dropdown-item d-flex align-items-center" onclick='SendInvitation(this)'><span class="setting-dropdown"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></span><span>Send Invitation</span></a>     
            <a class="dropdown-item item-active d-flex align-items-center" onclick='UpdateItemToActive(this)'><span class="setting-dropdown"><i class="fa fa-eye-slash" aria-hidden="true"></i></span><span>Make Active</span></a>           
            <a class="dropdown-item item-delete d-flex align-items-center" onclick='DeleteListItem(this)'><span class="setting-dropdown"><i class="fa fa-trash-o" aria-hidden="true"></i></span><span>Delete</span></a>                    
         <%--<a class="dropdown-item d-flex align-items-center"><span class="setting-dropdown"><i class="fa fa-exchange" aria-hidden="true"></i></span><span>Logs</span></a> --%>
                            
     </div>                                                                                                                                                                                           
 </div>
</script>

<!-- Custom JS -->
<script type="text/javascript" src="../../../_layouts/15/TimesheetDemo//Scripts/Controller/Control_Kendo.js"></script>
<script type="text/javascript" src="../../../_layouts/15/TimesheetDemo/Designs/toastr/toastr.js"></script>
<script type="text/javascript" src="../../../_layouts/15/TimesheetDemo//Scripts/main.js"></script>
<script type="text/javascript" src="../../../_layouts/15/TimesheetDemo//Scripts/kendo/kendo.all.min.js"></script>
<script type="text/javascript" src="../../../_layouts/15/TimesheetDemo//Scripts/Controller/Control_Timesheet.js"></script>



<script type="text/javascript">
    $(document).ready(function () {
        onLoadSetup();
        $('#addemployee').click(function () {
            $('#tab_Employees').hide();
        });        
    });

    function onLoadSetup() {
        $('#sideNavBox').hide();
    }

    function submit() {
        var timeInputs = {
            "title": "Web Input",
            "description": "Test Description"
        };
        $.ajax({
            type: "POST",
            url: "http://www.testservice.com/service1.svc/AddTime",
            data: JSON.stringify(timeInputs),
            contentType: "application/json;charset=utf-8",
            headers: { "Allow-Control-Allow-Origin": "*" },
            dataType: "json",
            processData: true,
            success: function (data, status, jqXHR) {
                toastr.success('Submitted successfully');
                alert('success ' + data);
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
    }

    function showresult_CurrentAssetLocation() {

        var siteURL = _spPageContextInfo.siteAbsoluteUrl;
        $.ajax({
            type: "POST",
            url: siteURL + "/_layouts/15/TimesheetService.aspx/GetTimeSheet",
            data: '{userId:1}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log(data)
            },
            error(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

    }

</script>
