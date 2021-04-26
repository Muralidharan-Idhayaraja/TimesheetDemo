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
                    <div class="modal" id="myModal">
                        <div class="modal-dialog modal-sm modal-dialog-centered">
                            <div class="modal-content">

                                <!-- Modal Header -->
                                <div class="modal-header">
                                    <h6 class="modal-title">Client Details</h6>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>


                                <style>
                                    .popaction-save, .popaction-cancel {
                                        display: none;
                                    }
                                </style>
                                <!-- Modal body -->
                                <div class="modal-body">
                                    <div class="edit-section">
                                        <span class="edit-item popaction-edititem"><i class="fa fa-edit popaction-edit" aria-hidden="true"></i>Edit</span>
                                        <button type="button" class="btn btn-success popaction-save">Save</button>
                                        <button type="button" class="btn popaction-cancel">Cancel</button>
                                    </div>
                                    <div class="form-horizontal">
                                        <div class="form-group row">
                                            <label class="control-label col-md-4">Client Name <em>*</em></label>
                                            <div class="col-md-8">
                                                <input type="text" id="ptxtClientName" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="control-label col-md-4">Client Location</label>
                                            <div class="col-md-8">
                                                <input type="text" id="ptxtClientLocation" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="control-label col-md-4">Country Code</label>
                                            <div class="col-md-8">
                                                <select class="form-control" id="pdrpCountryCode" placeholder="">
                                                    <option value="Select">Select</option>
                                                    <option value="376">AD - Andorra (+376)</option>
                                                    <option value="971">AE - United Arab Emirates (+971)</option>
                                                    <option value="93">AF - Afghanistan (+93)</option>
                                                    <option value="1268">AG - Antigua And Barbuda (+1268)</option>
                                                    <option value="1264">AI - Anguilla (+1264)</option>
                                                    <option value="355">AL - Albania (+355)</option>
                                                    <option value="374">AM - Armenia (+374)</option>
                                                    <option value="599">AN - Netherlands Antilles (+599)</option>
                                                    <option value="244">AO - Angola (+244)</option>
                                                    <option value="672">AQ - Antarctica (+672)</option>
                                                    <option value="54">AR - Argentina (+54)</option>
                                                    <option value="1684">AS - American Samoa (+1684)</option>
                                                    <option value="43">AT - Austria (+43)</option>
                                                    <option value="61">AU - Australia (+61)</option>
                                                    <option value="297">AW - Aruba (+297)</option>
                                                    <option value="994">AZ - Azerbaijan (+994)</option>
                                                    <option value="387">BA - Bosnia And Herzegovina (+387)</option>
                                                    <option value="1246">BB - Barbados (+1246)</option>
                                                    <option value="880">BD - Bangladesh (+880)</option>
                                                    <option value="32">BE - Belgium (+32)</option>
                                                    <option value="226">BF - Burkina Faso (+226)</option>
                                                    <option value="359">BG - Bulgaria (+359)</option>
                                                    <option value="973">BH - Bahrain (+973)</option>
                                                    <option value="257">BI - Burundi (+257)</option>
                                                    <option value="229">BJ - Benin (+229)</option>
                                                    <option value="590">BL - Saint Barthelemy (+590)</option>
                                                    <option value="1441">BM - Bermuda (+1441)</option>
                                                    <option value="673">BN - Brunei Darussalam (+673)</option>
                                                    <option value="591">BO - Bolivia (+591)</option>
                                                    <option value="55">BR - Brazil (+55)</option>
                                                    <option value="1242">BS - Bahamas (+1242)</option>
                                                    <option value="975">BT - Bhutan (+975)</option>
                                                    <option value="267">BW - Botswana (+267)</option>
                                                    <option value="375">BY - Belarus (+375)</option>
                                                    <option value="501">BZ - Belize (+501)</option>
                                                    <option value="61">CC - Cocos (keeling) Islands (+61)</option>
                                                    <option value="243">CD - Congo, The Democratic Republic Of The (+243)</option>
                                                    <option value="236">CF - Central African Republic (+236)</option>
                                                    <option value="242">CG - Congo (+242)</option>
                                                    <option value="41">CH - Switzerland (+41)</option>
                                                    <option value="225">CI - Cote D Ivoire (+225)</option>
                                                    <option value="682">CK - Cook Islands (+682)</option>
                                                    <option value="56">CL - Chile (+56)</option>
                                                    <option value="237">CM - Cameroon (+237)</option>
                                                    <option value="86">CN - China (+86)</option>
                                                    <option value="57">CO - Colombia (+57)</option>
                                                    <option value="506">CR - Costa Rica (+506)</option>
                                                    <option value="53">CU - Cuba (+53)</option>
                                                    <option value="238">CV - Cape Verde (+238)</option>
                                                    <option value="61">CX - Christmas Island (+61)</option>
                                                    <option value="357">CY - Cyprus (+357)</option>
                                                    <option value="420">CZ - Czech Republic (+420)</option>
                                                    <option value="49">DE - Germany (+49)</option>
                                                    <option value="253">DJ - Djibouti (+253)</option>
                                                    <option value="45">DK - Denmark (+45)</option>
                                                    <option value="1767">DM - Dominica (+1767)</option>
                                                    <option value="1809">DO - Dominican Republic (+1809)</option>
                                                    <option value="213">DZ - Algeria (+213)</option>
                                                    <option value="593">EC - Ecuador (+593)</option>
                                                    <option value="372">EE - Estonia (+372)</option>
                                                    <option value="20">EG - Egypt (+20)</option>
                                                    <option value="291">ER - Eritrea (+291)</option>
                                                    <option value="34">ES - Spain (+34)</option>
                                                    <option value="251">ET - Ethiopia (+251)</option>
                                                    <option value="358">FI - Finland (+358)</option>
                                                    <option value="679">FJ - Fiji (+679)</option>
                                                    <option value="500">FK - Falkland Islands (malvinas) (+500)</option>
                                                    <option value="691">FM - Micronesia, Federated States Of (+691)</option>
                                                    <option value="298">FO - Faroe Islands (+298)</option>
                                                    <option value="33">FR - France (+33)</option>
                                                    <option value="241">GA - Gabon (+241)</option>
                                                    <option value="44">GB - United Kingdom (+44)</option>
                                                    <option value="1473">GD - Grenada (+1473)</option>
                                                    <option value="995">GE - Georgia (+995)</option>
                                                    <option value="233">GH - Ghana (+233)</option>
                                                    <option value="350">GI - Gibraltar (+350)</option>
                                                    <option value="299">GL - Greenland (+299)</option>
                                                    <option value="220">GM - Gambia (+220)</option>
                                                    <option value="224">GN - Guinea (+224)</option>
                                                    <option value="240">GQ - Equatorial Guinea (+240)</option>
                                                    <option value="30">GR - Greece (+30)</option>
                                                    <option value="502">GT - Guatemala (+502)</option>
                                                    <option value="1671">GU - Guam (+1671)</option>
                                                    <option value="245">GW - Guinea-bissau (+245)</option>
                                                    <option value="592">GY - Guyana (+592)</option>
                                                    <option value="852">HK - Hong Kong (+852)</option>
                                                    <option value="504">HN - Honduras (+504)</option>
                                                    <option value="385">HR - Croatia (+385)</option>
                                                    <option value="509">HT - Haiti (+509)</option>
                                                    <option value="36">HU - Hungary (+36)</option>
                                                    <option value="62">ID - Indonesia (+62)</option>
                                                    <option value="353">IE - Ireland (+353)</option>
                                                    <option value="972">IL - Israel (+972)</option>
                                                    <option value="44">IM - Isle Of Man (+44)</option>
                                                    <option value="91">IN - India (+91)</option>
                                                    <option value="964">IQ - Iraq (+964)</option>
                                                    <option value="98">IR - Iran, Islamic Republic Of (+98)</option>
                                                    <option value="354">IS - Iceland (+354)</option>
                                                    <option value="39">IT - Italy (+39)</option>
                                                    <option value="1876">JM - Jamaica (+1876)</option>
                                                    <option value="962">JO - Jordan (+962)</option>
                                                    <option value="81">JP - Japan (+81)</option>
                                                    <option value="254">KE - Kenya (+254)</option>
                                                    <option value="996">KG - Kyrgyzstan (+996)</option>
                                                    <option value="855">KH - Cambodia (+855)</option>
                                                    <option value="686">KI - Kiribati (+686)</option>
                                                    <option value="269">KM - Comoros (+269)</option>
                                                    <option value="1869">KN - Saint Kitts And Nevis (+1869)</option>
                                                    <option value="850">KP - Korea Democratic Peoples Republic Of (+850)</option>
                                                    <option value="82">KR - Korea Republic Of (+82)</option>
                                                    <option value="965">KW - Kuwait (+965)</option>
                                                    <option value="1345">KY - Cayman Islands (+1345)</option>
                                                    <option value="7">KZ - Kazakstan (+7)</option>
                                                    <option value="856">LA - Lao Peoples Democratic Republic (+856)</option>
                                                    <option value="961">LB - Lebanon (+961)</option>
                                                    <option value="1758">LC - Saint Lucia (+1758)</option>
                                                    <option value="423">LI - Liechtenstein (+423)</option>
                                                    <option value="94">LK - Sri Lanka (+94)</option>
                                                    <option value="231">LR - Liberia (+231)</option>
                                                    <option value="266">LS - Lesotho (+266)</option>
                                                    <option value="370">LT - Lithuania (+370)</option>
                                                    <option value="352">LU - Luxembourg (+352)</option>
                                                    
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="control-label col-md-4">Phone Number</label>
                                            <div class="col-md-8">
                                                <input type="text" id="ptxtMobileNumber" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="control-label col-md-4">Email</label>
                                            <div class="col-md-8">
                                                <input type="text" id="ptxtEmail" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="control-label col-md-4">VAT/CUI <em>*</em></label>
                                            <div class="col-md-8">
                                                <input type="text" id="ptxtVAT" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="control-label col-md-4">Registration Number <em>*</em></label>
                                            <div class="col-md-8">
                                                <input type="text" id="ptxtRegisterNumber" class="form-control" />
                                            </div>
                                        </div>
                                        <%--</div>--%>
                                        <%--<div class="form-group row">
                                                <label class="control-label col-md-4">Primary Contact <em>*</em></label>
                                                <div class="col-md-8">
                                                    <div id="peoplePickerDiv_pPrimaryContact" class="dform-control"></div>
                                                </div>
                                            </div>--%>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" id="buttons_AddEmployee">
                    <div class="col mb-3">
                        <div class="p-2 ribbon-btn search-filter">
                            <button type="button" class="btn btn-success mr-3 add-button" id="addemployee"><i class="fa fa-plus-circle" aria-hidden="true"></i>Add Client </button>
                            <button type="button" style="display: none;" class="btn btn-success mr-3 close-button close-client" id="close-addemployee"><i class="fa fa-close" aria-hidden="true"></i>Close</button>

                            <%--<button type="button" class="btn btn-primary mr-3">View All Clients</button>
                                <button type="button" style="display: none;" class="btn btn-light">Make Inactive</button>--%>
                            <div class="quicksearch right">
                                <label for="input" class="inf">Quick Search:</label>
                                <input id="input" class="form-control" />
                                <button type="button" id="clear" class="btn btn-primary mr-3" value="Cancel">Clear Filter</button>
                            </div>
                        </div>

                    </div>

                </div>
                <div id="form_AddEmployee">
                    <div class="add-employee add-form p-3 mb-3">
                        <h6 class="mb-3 emp-details">Client Details :</h6>
                        <div class="row">

                            <div class="col-md-4 mb-2">
                                <div class="form-group">
                                    <label for="First Name">Client Name <em>*</em></label>
                                    <input type="text" class="form-control" id="txtClientName" placeholder="">
                                </div>
                            </div>
                            <div class="col-md-4 mb-2">
                                <div class="form-group">
                                    <label for="First Name">Client Location</label>
                                    <input type="text" class="form-control" id="txtClientLocation" placeholder="">
                                </div>
                            </div>
                            <div class="col-md-4 mb-2">
                                <div class="form-group">
                                    <label for="Country Code">Country Code</label>
                                    <select class="form-control" id="drpCountryCode" placeholder="">
                                        <option value="Select">Select</option>
                                        <option value="376">AD - Andorra (+376)</option>
                                        <option value="971">AE - United Arab Emirates (+971)</option>
                                        <option value="93">AF - Afghanistan (+93)</option>
                                        <option value="1268">AG - Antigua And Barbuda (+1268)</option>
                                        <option value="1264">AI - Anguilla (+1264)</option>
                                        <option value="355">AL - Albania (+355)</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div class="row">

                            <div class="col-md-4 mb-2">
                                <div class="form-group">
                                    <label for="Mobile Number">Phone Number </label>
                                    <input type="text" class="form-control" id="txtMobileNumber" placeholder="">
                                </div>
                            </div>
                            <div class="col-md-4 mb-2">
                                <div class="form-group">
                                    <label for="Email">Email</label>
                                    <input type="text" class="form-control" id="txtEmail" placeholder="">
                                </div>
                            </div>
                            <div class="col-md-4 mb-2">
                                <div class="form-group">
                                    <label for="VAT/CUI">VAT/CUI <em>*</em></label>
                                    <input type="text" class="form-control" id="txtVAT" />
                                </div>

                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4 mb-2">
                                <div class="form-group">
                                    <label for="VAT/CUI">Registration Number</label>
                                    <input type="text" class="form-control" id="txtRegisterNumber" />
                                </div>
                            </div>
                            <div class="col-md-4 mb-2">
                                <div class="form-group">
                                    <label for="DueDate">Due Date in days (For Invoice)</label>
                                    <input type="text" class="form-control" id="txtDueDays" />
                                </div>
                            </div>
                        </div>

                        <br />
                        <br />
                        <div class="row panel-roles">
                            <div class="col">
                                <div class="card mb-3">
                                    <div class="card-header">
                                        <h6 class="m-0">Client - Contact Details
                                       
                                        </h6>
                                    </div>

                                    <div class="card-body">
                                        <div class="row filesetcontainer">
                                            <div class="col-md-12 mb-4">
                                                <div class="legend-contactcontainer">
                                                    <span class="addlegend">
                                                        <button type="button" class="btn btn-primary addContact"><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Add Contact</button><span class="deletecontainer"></span></span>
                                                    <div class="headHTML">
                                                        <div class="row align-items-center">
                                                            <div class="col-md-4 mb-2"><strong>Name</strong> <em>*</em></div>
                                                            <div class="col-md-3 mb-2"><strong>Email</strong> <em>*</em></div>
                                                            <div class="col-md-2 mb-2"><strong>Phone</strong> <em>*</em></div>
                                                            <div class="col-md-2 mb-2"><strong>Role</strong> <em>*</em></div>
                                                            <div class="col-md-1 mb-2"></div>
                                                        </div>
                                                    </div>
                                                    <div class="row align-items-center row-contact">
                                                        <div class="col-md-4 pr-0">
                                                            <input type="text" class="form-control txtName" placeholder="Mandatory Info- Contact Name" />
                                                            <%--<div class="row">
                                                                    <div class="col-md-11"></div>
                                                                    <div class="col-md-1"><em>*</em></div>
                                                                </div>--%>
                                                        </div>
                                                        <div class="col-md-3 pr-0">
                                                            <input type="text" class="form-control txtEmail" placeholder="Mandatory Info- Contact Email" />
                                                        </div>
                                                        <div class="col-md-2 pr-0">
                                                            <input type="text" class="form-control txtPhone" placeholder="Mandatory Info- Phone Number" />
                                                        </div>
                                                        <div class="col-md-2 mb-2">
                                                            <select class="form-control drpItemRole" id="drpItemRole">
                                                                <option value="Select Role">Select Role</option>
                                                            </select>
                                                        </div>
                                                        <span class="col-md-1 delete"><i class="fa fa-trash-o delete-contact" aria-hidden="true"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div class="row panel-roles">
                            <div class="col">
                                <div class="card mb-3">
                                    <div class="card-header">
                                        <h6 class="m-0">Client - Bank Account Details
                                       
                                        </h6>
                                    </div>

                                    <div class="card-body">
                                        <div class="row filesetcontainer">
                                            <div class="col-md-12 mb-4">
                                                <div class="legend-accountcontainer">
                                                    <span class="addlegend">
                                                        <button type="button" class="btn btn-primary addAccount"><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Add Account</button><span class="deletecontainer"></span></span>
                                                    <div class="headHTML">
                                                        <div class="row align-items-center">
                                                            <div class="col-md-3 mb-2"><strong>Name Of the Bank</strong> <em>*</em> </div>
                                                            <div class="col-md-3 mb-2"><strong>Account Number</strong> <em>*</em></div>
                                                            <div class="col-md-2 mb-2"><strong>Currency</strong> <em>*</em></div>
                                                            <div class="col-md-3 mb-2"><strong>Bank Address</strong> <em>*</em></div>
                                                            <div class="col-md-1 mb-2"></div>
                                                        </div>
                                                    </div>
                                                    <div class="row align-items-start row-account">
                                                        <div class="col-md-3 pr-0">
                                                            <input type="text" class="form-control txtBankName" placeholder="Mandatory Info - Bank Name" />
                                                        </div>
                                                        <div class="col-md-3 pr-0">
                                                            <input type="text" class="form-control txtAccount" placeholder="Mandatory Info - Account Number" />
                                                        </div>
                                                        <div class="col-md-2 mb-2">
                                                            <select class="form-control drpItemCurrency" id="drpItemCurrency">
                                                                <option value="Select Currency">Select Currency</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-md-3 pr-0">
                                                            <textarea placeholder="Mandatory Info- Bank Address" id="txtAddress" class="form-control txtAddress"></textarea>
                                                        </div>

                                                        <span class="col-md-1 delete"><i class="fa fa-trash-o delete-account" aria-hidden="true"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col mb-2">
                                <div class="form-group text-right">
                                    <button type="button" id="btnSave" class="sm-btn btn-outline-primary  mr-3" value="Save">Save</button>
                                    <button type="button" id="btnCancel" class="sm-btn btn-outline-primary" value="Cancel">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="Bnk-Acc-Info">
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
                        <div class="preloader1"><span class="preloader-content" id="preloader-Clients">Loading All Clients...</span></div>
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
    

    <script type="text/javascript">
        $(document).ready(function () {
            $('#addemployee').click(function () {
                $('#tab_Employees').hide();
            });

        });

    </script>