//click events -->view on load --> view controls --> construct view

var dummy = '';
window.AllClients = [];
window.filterClients = [];
window.clientDetails = { item: null };
window.clientMetadata = [];
window.popItemID = '';
window.AllCurrencies = [];
window.AllRoles = [];
window.Collect_InputContacts = [];
window.Collect_InputAccounts = [];
window.requestURL_CheckIfItemAlreadyExists = '';

window.getCommonControl = new control_Common.Functions.return_listOperations();
window.clientID = '';
var count_BankAccount = 0;
var count_RoleContact = 0;


//***************** Control Client Starts Here*********************//
var ctrl_Client = window.ctrl_Client || {};


ctrl_Client.Functions = function () {

    var get_AllAppConstants = function () {
        var deferred = $.Deferred();

        var currentAppWebPageURL = document.URL.split('/Pages')[0];
        var scriptBase = currentAppWebPageURL + "/scripts/Controller/AppConstants.js";
        console.log(scriptBase);

        $.getScript(scriptBase, function (data, textStatus, jqxhr) {

            console.log(textStatus); // Success
            console.log(jqxhr.status); // 200
            console.log("Constants Load was performed.");
            if (textStatus == 'success')
                deferred.resolve('success')
            else
                deferred.reject('failed');
        });
        return deferred.promise();
    }

    var function_PreLoader = function () {
        this.showLoader1 = function () {
            $('.preloader1').fadeIn();
        }
        this.showLoader2 = function () {
            $('.preloader2').fadeIn();
        }
        this.closeLoader1 = function () {
            setTimeout(function () { $('.preloader1').fadeOut(); }, 500);
        }
        this.closeLoader2 = function () {
            setTimeout(function () { $('.preloader2').fadeOut(); }, 500);
        }
    }

    var page_OnLoad = function () {
        var deferred = $.Deferred();
        // $('#tab_ViewEmployees').hide();tab_Table_ViewEmployee
        var draw_Table_Employee = new ctrl_Client.Functions.return_construct_View('tabs');
        draw_Table_Employee.displayview('ViewAll')
        deferred.resolve('All Employee Data Loaded');
        return deferred.promise();
    }

    var list_Operations = function () {

        this.AddClienItem_Old = function () {
            $('.preloader1').fadeIn();
            var requestUri = window.SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/lists/getbytitle('" + window.ListName_Clients + "')/items?@target='" + window.SPHostWebUrl + "'";
            var itemType = 'SP.Data.ClientsListItem';
            $.ajax({
                url: requestUri,
                type: "POST",
                data: JSON.stringify({
                    __metadata: { type: itemType },
                    "Title": window.clientDetails.clientname,
                    'Client_x002d_Location': window.clientDetails.clientlocation,
                    'CountryCode': window.clientDetails.countrycode,
                    'PhoneNumber': window.clientDetails.mobilenumber,
                    'Email': window.clientDetails.email,
                    'Status': 'Active',
                    // 'PrimaryContactId': window.clientDetails.primarycontact

                }),
                headers:
                {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "X-HTTP-Method": "POST"
                },

                success: function (data) {

                    //alert("Item created successfully");
                    console.log(data.d.Id);
                    toastr.success('Client Details are being added successfully', 'Success');
                    ctrl_Client.Functions.return_get_Clients().then(function (results) {

                        console.log('results reloaded from server');

                        var draw_TableClients = new ctrl_Client.Functions.return_construct_View('tabs');
                        draw_TableClients.displayview('ViewAll');
                        //$('.add-form').hide();
                        $('.add-employee').hide();
                        $('#tab_Employees').show();
                        $('.close-button').hide();
                        $('.add-button').show();
                        $('.quicksearch').show();
                        ctrl_Client.Functions.return_clear_Controls();

                        setTimeout(function () {
                            $('.preloader1').fadeOut();
                        }, 2000);


                    });

                },
                error: function (error) {
                    console.log(JSON.stringify(error));

                }

            });
        };
        this.UpdateClientItem = function () {

        }
        this.DeleteClientItem = function () {

        }
        this.AddClientItem = function () {
            var itemType = 'SP.Data.ClientsListItem';
            window.clientMetadata = JSON.stringify({
                __metadata: { type: itemType },
                "Title": window.clientDetails.clientname,
                'Client_x002d_Location': window.clientDetails.clientlocation,
                'CountryCode': window.clientDetails.countrycode,
                'PhoneNumber': window.clientDetails.mobilenumber,
                'Email': window.clientDetails.email,
                'VAT_x002f_CUI': window.clientDetails.vat,
                'Registration_x0020_Number': window.clientDetails.registerno,
                'DueDays': window.duedays,
                'Status': 'Active',
                // 'PrimaryContactId': window.clientDetails.primarycontact

            });

            var requestURL = window.SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/lists/getbytitle('" + window.ListName_Clients + "')/items?@target='" + window.SPHostWebUrl + "'";
            typename = 'SP.Data.ClientsListItem',
            dataArray = window.clientMetadata;

            var requestURL_Contacts = window.SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/lists/getbytitle('" + window.ListName_Contacts + "')/items?@target='" + window.SPHostWebUrl + "'";
            typename_Roles = 'SP.Data.ContactsListItem',


            getCommonControl.AddListItem(dataArray, requestURL).then(function (status) {

                var posted_ClientItemID = status;
                window.clientID = status;
                if (posted_ClientItemID != '') {

                    toastr.success('Client Details are being saved successfully')



                    actionControl_Client.Functions.return_collect_AllContacts().then(function (contactsCollection) {
                        actionControl_Client.Functions.return_collect_AllAccounts().then(function (accountsCollection) {

                            if (contactsCollection.length > 0) {
                                createContactsListItem_AsBatchProcess(contactsCollection);
                            }
                            else if (accountsCollection.length > 0) {
                                createAccountsListItem_AsBatchProcess(accountsCollection);
                            }
                            else {
                                goTo__PageAllItems();
                            }
                        });
                    });

                }

            });
        }
    }

    var view_OnLoad = function (viewName) {

        window.PageName = document.URL.split('.aspx')[0].split('Pages/')[1];
        var call_view_Controls = new ctrl_Client.Functions.return_view_Controls(viewName);
        switch (viewName) {
            case 'All Clients':
                console.log('this tab is All Clients');
                call_view_Controls.viewAllClients();
                break;

            case 'Active Clients':
                console.log('this tab is Active Clients');
                call_view_Controls.activeClients();
                break;

            case 'InActive Clients':
                console.log('this tab is for Inactive Clients');
                call_view_Controls.inactiveClients();
                break;


            default:
                console.log('Problem in finding the current page ');
        }
    }

    var click_Events = function () {

        var deferred = $.Deferred();
        window.ViewName = 'View Name Assigned';
        var call_PreLoader = new ctrl_Client.Functions.return_function_PreLoader();

        // Click Events

        $('.popaction-edit').click(function () {
            $(this).parent().hide();
            actionControl_Client.Functions.return_formControls_Enable();
            $('.popaction-save').show();
            $('.popaction-cancel').show();
        });
        $('.popaction-edititem').click(function () {
            $(this).hide();
            actionControl_Client.Functions.return_formControls_Enable();
            $('.popaction-save').show();
            $('.popaction-cancel').show();
        });
        $('.popaction-cancel').click(function () {
            $('#myModal').modal('hide');
        });
        $('.popaction-save').on('click', function () {
            actionControl_Client.Functions.return_validation_Controller_Popup().then(function (isValidationOkay) {
                if (isValidationOkay) {
                    console.log('Update Item Procced');
                    // Save Employee Details                    

                    var requestURL = window.SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/lists/getbytitle('" + window.ListName_Clients + "')/items(" + popItemID + ")?@target='" + window.SPHostWebUrl + "'";
                    typename = 'SP.Data.ClientsListItem',
                    dataArray = JSON.stringify({
                        __metadata: { type: typename },
                        "Title": window.clientDetailsp.clientname,
                        'Client_x002d_Location': window.clientDetailsp.clientlocation,
                        'CountryCode': window.clientDetailsp.countrycode,
                        'PhoneNumber': window.clientDetailsp.mobilenumber,
                        'Email': window.clientDetailsp.email,
                        //'Status': 'Active',   
                        // 'PrimaryContactId': window.clientDetailsp.primarycontact

                    });

                    getCommonControl.UpdateListItem(requestURL, dataArray).then(function (status) {
                        console.log('Update Status: ' + status);
                        $('#myModal').modal('hide');
                        Reload();
                    });
                }
                else {
                    toastr.error('Please enter all the required fields', 'Error');
                }
            });


        });

        $('.emp_ViewAll').click(function () {
            call_PreLoader.showLoader1();
            window.ViewName = 'All Clients';
            $('#preloader-Clients').html('Loading All Clients...');
            $(this).addClass('active');
            $(this).parent().siblings().children().removeClass('active');
            ctrl_Client.Functions.return_view_OnLoad(ViewName);
            call_PreLoader.closeLoader1();
        });
        $('.emp_Active').click(function () {
            call_PreLoader.showLoader1();
            window.ViewName = 'Active Clients';
            $('#preloader-Clients').html('Loading Active Clients...')
            $(this).addClass('active');
            $(this).parent().siblings().children().removeClass('active');
            ctrl_Client.Functions.return_view_OnLoad(ViewName);
            call_PreLoader.closeLoader1();
        });
        $('.emp_InActive').click(function () {
            call_PreLoader.showLoader1();
            window.ViewName = 'InActive Clients';
            $('#preloader-Clients').html('Loading InActive Clients...')
            $(this).addClass('active');
            $(this).parent().siblings().children().removeClass('active');
            ctrl_Client.Functions.return_view_OnLoad(ViewName);
            call_PreLoader.closeLoader1();
        });

        $('#btnSave').unbind();
        $('#btnSave').bind('click', function () {

            if ($('#txtClientName').val() != '' && $('#txtVAT').val() != '') {

                ctrl_Client.Functions.return_validation_Controller_ItemAlreadyExists().then(function (clientItem) {

                    if (clientItem.length > 0) {
                        toastr.error('This Client Name Already Exists, Please Verify', 'Error');
                    }
                    else if (clientItem.length == 0) {
                        ctrl_Client.Functions.return_validation_Controller().then(function (isValidationOkay) {

                            var boolValidate = isValidationOkay.split('|');
                            var validateClient = false,
                               validateContacts = false,
                               validateAccounts = false,
                              // validateClientAlreadyExists = false;

                            validateClient = parseValidation(boolValidate[0]);
                            validateContacts = parseValidation(boolValidate[1]);
                            validateAccounts = parseValidation(boolValidate[2]);
                            //  validateClientAlreadyExists = parseValidation(boolValidate[3]);

                            if (validateClient && validateContacts && validateAccounts) {
                                console.log('Add Item Procced');
                                // Save Employee Details
                                var itemControl = new ctrl_Client.Functions.return_list_Operations();
                                itemControl.AddClientItem();
                            }
                            else {
                                if (!validateClient)
                                    toastr.error('Please enter all the required fields', 'Error');
                                if (!validateContacts)
                                    toastr.error('Please enter all the mandatory fields for Contact Details', 'Error');
                                if (!validateAccounts)
                                    toastr.error('Please enter all the mandatory fields for Bank Account Details', 'Error');
                            }
                        });
                    }
                });


            }
            else {
                toastr.error('Please enter all the required fields', 'Error');
            }





        });
        $('#btnCancel').on('click', function () {

            goTo__PageAllItems();

            //$('.tab_Results').show();
            //$('.close-button').hide();
            //$('.add-button').show();
            //$('.quicksearch').show();

            //$('.add-employee').hide();
            //$('.tab_Employees').show();


            //ctrl_Client.Functions.return_clear_Controls();
        });

        $('.close-client').on('click', function () {
            ctrl_Client.Functions.return_clear_Controls();

        });
        deferred.resolve(window.ViewName);
        return deferred.promise();

    }

    var view_Controls = function (paramviewname) {

        this.viewname = paramviewname;
        var call_construct_View = new ctrl_Client.Functions.return_construct_View('Active');
        this.viewAllClients = function () {
            console.log('View Name Inherited -' + this.viewname);
            //$('#tab_Table_Clients').DataTable().destroy();
            call_construct_View.displayview('ViewAll');
        }
        this.activeClients = function () {
            console.log('View Name Inherited -' + this.viewname);
            // $('#tab_Table_Clients').DataTable().destroy();
            call_construct_View.displayview('Active');
        }
        this.inactiveClients = function () {
            console.log('View Name Inherited -' + this.viewname);
            // $('#tab_Table_Clients').DataTable().destroy();
            call_construct_View.displayview('InActive');
        }

    }

    var clear_Controls = function () {
        $('#txtClientName').val('');
        $('#txtClientLocation').val('');
        $('#drpCountryCode').val('Select');
        $('#txtMobileNumber').val('');
        $('#txtEmail').val('');
        $('#txtVAT').val('');
        $('#txtRegistrationNumber').val('');
        //  ClearPickerValues('PrimaryContact');

    }

    var get_Clients = function () {
        window.AllClients = [];
        console.log('Get Clients');
        var requestUri = window.SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/lists/getbytitle('" + window.ListName_Clients + "')/items?@target='" + window.SPHostWebUrl + "'&$top=" + window.ListName_Clients_Count + "&$orderby=Modified desc";
        window.xhrURL = requestUri;
        console.log('And xhr Request:' + window.xhrURL); // Rest End Point
        var deferred = $.Deferred();
        ctrl_Client.Functions.return_get_ClientsCollection(deferred);
        return deferred.promise();
    }

    var get_ClientsCollection = function (deferred) {
        console.log('Collection');
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

                    if (window.ListName_Clients_Count != 1) {
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

    var construct_View = function (paramfilterview) {
        this.filterview = paramfilterview;
        this.displayview = function (paramfilterview) {

            window.filterClients = [];
            window.filterClients = window.AllClients;
            if (paramfilterview != 'ViewAll') {
                window.filterClients = window.AllClients.filter(function (f11) {
                    return f11.workstatus == paramfilterview
                });
            }
            console.log(paramfilterview);

            if (filterClients.length > 0) {
                _spListReminder.functions.return_KendoDataSource(filterClients, 'clientname', 'Search by Client Name');
            }
            else {
                _spListReminder.functions.return_KendoDataSource(filterClients, 'clientname', 'Search by Client Name');
                $('#resultsGrid thead').after('<h6 class="nodata" style="text-align:center;">No Clients available in this category</h6>');
            }



        }

    }

    var getItemByID_Client = function (itemID) {
        var defer = $.Deferred();

        defer.resolve();
        return defer.promise();

    }

    var validation_Controller_ItemAlreadyExists = function () {

        var deferred = $.Deferred();
        var checkIfClient_Exists = $('#txtClientName').val();
        requestURL_CheckIfItemAlreadyExists = window.SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/lists/getbytitle('" + window.ListName_Clients + "')/items?@target='" + window.SPHostWebUrl + "'&$top=2000&$orderby=Modified desc&$filter=Title eq '{key-clientname}'";

        var request_CheckItemExist = requestURL_CheckIfItemAlreadyExists.replace('{key-clientname}', checkIfClient_Exists);

        var itemCollection = getCommonControl.check_IfItem_AlreadyExists(request_CheckItemExist, deferred);

        return deferred.promise();
    }


    var validation_Controller = function () {
        var validation_Success = false;
        var validation_Client = true;
        var validation_Contacts = true;
        var validation_Accounts = true;
        var deferred = $.Deferred();


        window.clientDetails = {
            item: 'Available',
            clientname: $('#txtClientName').val(),
            clientlocation: $('#txtClientLocation').val(),
            countrycode: $('#drpCountryCode option:selected').text() != 'Select' ? $('#drpCountryCode option:selected').text() : '',
            email: $('#txtEmail').val(),
            mobilenumber: $('#txtMobileNumber').val(),
            vat: $('#txtVAT').val(),
            registerno: $('#txtRegisterNumber').val(),
            duedays: $('#txtDueDays').val()
            //  primarycontact: responseId

        };

        $('.legend-contactcontainer .row-contact').each(function () {

            var contact_Name = $(this).find('.txtName').val(),
                contact_email = $(this).find('.txtEmail').val(),
                contact_phone = $(this).find('.txtPhone').val(),
                contact_Role = $(this).find('[id^="drpItemRole"]').val();
            if (contact_Name == '' || contact_email == '' || contact_phone == '' || contact_Role == 'Select Role') {
                validation_Contacts = false;
            }
        });


        $('.legend-accountcontainer .row-account').each(function () {
            var account_Name = $(this).find('.txtAccount').val(),
                  account_Number = $(this).find('txtAccount').val(),
                  account_address = $(this).find('.txtAddress').val(),
                  account_currency = $(this).find('[id^="drpItemCurrency"]').val();

            if (account_Name == '' || account_Number == '' || account_address == '' || account_currency == 'Select Currency') {
                validation_Accounts = false;
            }
        });
        validation_Success = validation_Client + "|" + validation_Contacts + "|" + validation_Accounts;
        deferred.resolve(validation_Success);
        return deferred.promise();




    }

    var filter_ListCollection = function (param_ListName, param_fieldName, param_fieldValue) {

    }

    var filter_ListItemCollection = function () {

    }

    return {

        return_get_AllAppConstants: get_AllAppConstants,
        return_get_Clients: get_Clients,
        return_get_ClientsCollection: get_ClientsCollection,
        return_view_OnLoad: view_OnLoad,
        return_click_Events: click_Events,
        return_view_Controls: view_Controls,
        return_construct_View: construct_View,
        return_page_OnLoad: page_OnLoad,
        return_list_Operations: list_Operations,
        return_validation_Controller: validation_Controller,
        return_validation_Controller_ItemAlreadyExists: validation_Controller_ItemAlreadyExists,
        return_function_PreLoader: function_PreLoader,
        return_clear_Controls: clear_Controls,

    }
}();

//***************** Control Client Ends Here*********************//



// ******************* Action *****************************//

var actionControl_Client = window.actionControl_Client || {};
actionControl_Client.Functions = function () {

    var viewMore = function (item) {
        var defer = $.Deferred();
        $('#ptxtClientName').val(item.clientname);
        $('#ptxtClientLocation').val(item.clientlocation);
        $('#pdrpCountryCode').val(item.countrycode);
        $('#ptxtMobileNumber').val(item.mobilenumber)
        $('#ptxtEmail').val(item.email);
        var selectedCountryCode = '';
        $('#pdrpCountryCode option').map(function () {
            if ($(this).text().toString().trim() === item.countrycode.toString().trim()) {
                selectedCountryCode = $(this).val();
                return this;
            }
        }).attr('selected', 'selected');
        $('#pdrpCountryCode').val(selectedCountryCode);
        //  ClearPickerValues('pPrimaryContact');
        //   insertUserInPeoplePicker(item.primarycontactTitle, 'peoplePickerDiv_pPrimaryContact')
        defer.resolve('Pop Up Data was set');
        return defer.promise();
    }

    var formControls_Disable = function () {
        $('#ptxtClientName').prop('readonly', true);
        $('#ptxtClientLocation').prop('readonly', true);
        $('#pdrpCountryCode').prop('disabled', true);
        $('#ptxtMobileNumber').prop('readonly', true);
        $('#ptxtEmail').prop('readonly', true);
        //ClearPickerValues('PrimaryContact');
    }
    var formControls_Enable = function () {
        $('#ptxtClientName').prop('readonly', false);
        $('#ptxtClientLocation').prop('readonly', false);
        $('#pdrpCountryCode').prop('disabled', false);
        $('#ptxtMobileNumber').prop('readonly', false);
        $('#ptxtEmail').prop('readonly', false);
        //ClearPickerValues('PrimaryContact');
    }
    var validation_Controller_Popup = function () {
        var validation_Success = false;
        var deferred = $.Deferred();

        if ($('#txtClientName').val() != '') {
            validation_Success = true;
            window.clientDetailsp = {
                item: 'Available',
                clientname: $('#ptxtClientName').val(),
                clientlocation: $('#ptxtClientLocation').val(),
                countrycode: $('#pdrpCountryCode option:selected').text() != 'Select' ? $('#pdrpCountryCode option:selected').text() : '',
                email: $('#ptxtEmail').val(),
                mobilenumber: $('#ptxtMobileNumber').val(),
                //   primarycontact: responseId

            };
            deferred.resolve(validation_Success);
        }
        deferred.resolve(validation_Success);
        return deferred.promise();
    }

    var set_CurrencyDropBox = function (selectID) {

        $('#' + selectID).kendoComboBox({
            dataTextField: 'symbol',
            dataValueField: 'id',
            height: 200,
            filter: 'startswith',
            dataSource: {
                data: AllCurrencies,
            }
        });

        $('#' + selectID).data("kendoComboBox").value('Select Currency');

    }

    var set_ContactRoles = function (selectID) {

        $('#' + selectID).kendoComboBox({
            dataTextField: 'title',
            dataValueField: 'id',
            height: 200,
            filter: 'startswith',
            dataSource: {
                data: AllRoles,
            }
        });

        $('#' + selectID).data("kendoComboBox").value('Select Role');

    }

    var collect_AllContacts = function () {
        var defer = $.Deferred();
        AllRoles = [];
        var allRoles_Length = $('.legend-contactcontainer .row-contact').length;
        window.Collect_InputContacts = [];
        if (allRoles_Length > 0) {
            //AllRoles.push({ text: 'Select', value: 'Select' });
            $('.legend-contactcontainer .row-contact').each(function () {


                var contact_Name = $(this).find('.txtName').val(),
                    contact_Email = $(this).find('.txtEmail').val(),
                    contact_Phone = $(this).find('.txtPhone').val(),
                    contact_Role = $(this).find('[id^="drpItemRole"]').val()

                if (contact_Role.trim() == 'Select Role')
                    contact_Role = 0;

                var contact = {
                    name: contact_Name,
                    email: contact_Email,
                    phone: contact_Phone,
                    role: contact_Role
                };

                Collect_InputContacts.push(contact);
            });
        }

        defer.resolve(Collect_InputContacts);
        return defer.promise();


    }

    var collect_AllAccounts = function () {
        var defer = $.Deferred();
        var allAccounts_Length = $('.legend-accountcontainer .row-account').length;
        window.Collect_InputAccounts = [];
        if (allAccounts_Length > 0) {
            //AllRoles.push({ text: 'Select', value: 'Select' });
            $('.legend-accountcontainer .row-account').each(function () {


                var account_Name = $(this).find('.txtAccount').val(),
                    account_Currency = $(this).find('[id^="drpItemCurrency"]').val(),
                    account_BankName = $(this).find('.txtBankName').val(),
                    account_Address = $(this).find('.txtAddress').val();

                if (account_Currency.trim() == 'Select Currency')
                    account_Currency = 0;

                var account = {
                    accountno: account_Name,
                    currency: account_Currency,
                    bankname: account_BankName,
                    address: account_Address
                };

                Collect_InputAccounts.push(account);
            });
        }

        defer.resolve(Collect_InputAccounts);
        return defer.promise();


    }

    return {
        return_viewmore: viewMore,
        return_formControls_Disable: formControls_Disable,
        return_formControls_Enable: formControls_Enable,
        return_validation_Controller_Popup: validation_Controller_Popup,
        return_set_CurrencyDropBox: set_CurrencyDropBox,
        return_set_ContactRoles: set_ContactRoles,
        return_collect_AllContacts: collect_AllContacts,
        return_collect_AllAccounts: collect_AllAccounts
    }
}();



// ******************** Action ******************************//



//***************** Document Ready Starts Here*********************//

$(document).ready(function () {

    // Asynchronous Run Down


    // Synchronous Run Down
    $('.preloader1').fadeIn();
    bind_AddAccount();
    bind_DeleteAccount();
    bind_AddContact();
    bind_DeleteContact();

    ctrl_Client.Functions.return_get_AllAppConstants().then(function (nothing) {
        console.log('All App Constants are loaded.');
        ctrl_Client.Functions.return_get_Clients().then(function (results) {

            console.log('Results Available');
            if (results.length >= window.ListName_Clients_Count) {
                $('#addemployee').hide();
            } else
            {
                $('#addemployee').show();
            }


            console.log(AllClients);
            setTimeout(function () { $('.preloader1').fadeOut(); }, 2000);
            ctrl_Client.Functions.return_click_Events().then(function (viewName) {
                console.log('Registered All clickable Events');

                //initializePeoplePicker('peoplePickerDiv_PrimaryContact');
                //  initializePeoplePicker('peoplePickerDiv_pPrimaryContact');

                //**************** KENDO GRID ***************************************************??

                _spListReminder.functions.return_KendoGrid('Clients').then(function (defineColumns) {
                    console.log('Ready : Grid Fields Set Up Completed');

                    _spListReminder.functions.return_KendoDataSource(results, 'clientname', 'Search by Client Name'); // to confirm the grid columns set up 

                    if (results.length == 0) {
                        $('#resultsGrid thead').after('<h6 class="nodata" style="text-align:center;">No Clients Available in this category</h6>');
                    }
                });
                // invoke Kendo Grid with datasource.                        

                //**************** KENDO GRID ***************************************************     // Register Filter click event Handlers


            });

            /// <summary>Collect Available Currencies</summary>
            control_Common.Functions.return_get_ProjectCurrency().then(function (results) {
                AllCurrencies = results;
                console.log('Currency Results Available');
                console.log(AllCurrencies);

                if (results.length > 0) {
                    $('#drpItemCurrency').kendoComboBox({
                        dataTextField: 'symbol',
                        dataValueField: 'id',
                        height: 200,
                        filter: 'startswith',
                        dataSource: {
                            data: results,
                        }
                    });
                    $('#drpItemCurrency').data("kendoComboBox").value('Select Currency');
                }

                // $('.legend-contactcontainer').find('.row-contact').remove();

            });

            /// <summary>Collect Available Roles</summary>
            control_Common.Functions.return_get_UserRoles().then(function (results) {
                AllRoles = results;
                console.log('Currency Results Available');
                console.log(AllRoles);

                if (results.length > 0) {
                    $('#drpItemRole').kendoComboBox({
                        dataTextField: 'title',
                        dataValueField: 'id',
                        height: 200,
                        filter: 'startswith',
                        dataSource: {
                            data: AllRoles,
                        }
                    });
                    $('#drpItemRole').data("kendoComboBox").value('Select Role');
                }


            });
        });
    });



});
//***************** Document Ready Ends Here*********************//

//*****************Button Click Events from Kendo Grid Action controls*********************//

function openpopup(param) {

    $('.popaction-save').hide();
    $('.popaction-cancel').hide();
    $('.popaction-edit').show();
    $('.popaction-edititem').show();
    var itemID = '';
    //var itemID = $(param).parent().parent().children('td:first-child').html();
    itemID = $(param).parent().siblings().find('.settings-icon').attr('data-id');

    if (itemID != '') {
        var currentPage = document.URL;
        var redirectPage = document.URL;
        var clientDetailPage = 'ClientDetails.aspx?ItemID=' + itemID + '&';
        redirectPage = currentPage.replace('Clients.aspx?', clientDetailPage);
        top.location = redirectPage;
        //window.location.href = currentPage;
    }
}

function DeleteListItem(param) {
    var itemID = '';
    itemID = $(param).parent().parent().attr('data-id');
    if (itemID != '') {
        var requestURL = window.SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/lists/getbytitle('" + window.ListName_Clients + "')/items(" + itemID + ")?@target='" + window.SPHostWebUrl + "'";
        console.log('Delete Item Procced');

        getCommonControl.DeleteListItem(requestURL).then(function (status) {
            toastr.success('Client Item was deleted Successfully');
            console.log('Status: ' + status);
            $('#myModal').modal('hide');
            Reload();
        });
    }
}

function EditListItem(param) {
    $('.popaction-save').show();
    $('.popaction-cancel').show();
    $('.popaction-edit').hide();
    $('.popaction-edititem').hide();
    var itemID = '';
    var itemID = $(param).parent().parent().attr('data-id');

    if (itemID != '') {
        var currentPage = document.URL;
        var redirectPage = document.URL;
        var clientDetailPage = 'ClientDetails.aspx?ItemID=' + itemID + '&';
        redirectPage = currentPage.replace('Clients.aspx?', clientDetailPage);
        top.location = redirectPage;
        //window.location.href = currentPage;
    }

    //if (itemID != '') {
    //    popItemID = itemID;
    //    var requestURL = window.SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/lists/getbytitle('" + window.ListName_Clients + "')/items(" + itemID + ")?@target='" + window.SPHostWebUrl + "'&$select=ID,Title,Client_x002d_Location,CountryCode,PhoneNumber,Email,Status";

    //    getCommonControl.GetListItemByID(requestURL).then(function (item) {
    //        var item_Client = new control_Common.Functions.return_clientData(item);
    //        if (item_Client != null) {
    //            actionControl_Client.Functions.return_viewmore(item_Client).then(function (dataset) {
    //                console.log(dataset);
    //                actionControl_Client.Functions.return_formControls_Enable();
    //                $('#myModal').modal('show');

    //            });

    //        }

    //    });

    //}
}

function UpdateItemToInActive(param) {
    var itemID = '';
    itemID = $(param).parent().parent().attr('data-id');
    if (itemID != '') {
        var requestURL = window.SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/lists/getbytitle('" + window.ListName_Clients + "')/items(" + itemID + ")?@target='" + window.SPHostWebUrl + "'";
        var typename = 'SP.Data.ClientsListItem';
        var dataArray = JSON.stringify({
            __metadata: { type: typename },
            'Status': 'InActive',
        });
        console.log('Make Item In Active');

        getCommonControl.makeActiveOrInActive(false, requestURL, dataArray).then(function (status) {
            console.log('Status: ' + status);
            Reload();
        });

    }
}
function UpdateItemToActive(param) {
    var itemID = '';
    itemID = $(param).parent().parent().attr('data-id');
    if (itemID != '') {
        var requestURL = window.SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/lists/getbytitle('" + window.ListName_Clients + "')/items(" + itemID + ")?@target='" + window.SPHostWebUrl + "'";
        var typename = 'SP.Data.ClientsListItem';
        var dataArray = JSON.stringify({
            __metadata: { type: typename },
            'Status': 'Active',
        });
        console.log('Make Item In Active');

        getCommonControl.makeActiveOrInActive(true, requestURL, dataArray).then(function (status) {
            console.log('Status: ' + status);
            Reload();
        });

    }
}

function SendInvitation(param) {
    toastr.info('Send Notification: Not Implemented Yet');
}

function Reload() {
    window.AllClients = [];
    window.filterClients = [];

    ctrl_Client.Functions.return_get_Clients().then(function (results) {
        console.log('Results Available');
        if (results.length >= window.ListName_Clients_Count) {
            $('#addemployee').hide();
        } else {
            $('#addemployee').show();
        }
        setTimeout(function () { $('.preloader1').fadeOut(); }, 2000);
        ctrl_Client.Functions.return_click_Events().then(function (viewName) {
            console.log('Registered All clickable Events');

            // initializePeoplePicker('peoplePickerDiv_PrimaryContact');
            //   initializePeoplePicker('peoplePickerDiv_pPrimaryContact');

            //**************** KENDO GRID ***************************************************??

            _spListReminder.functions.return_KendoGrid('Clients').then(function (defineColumns) {
                console.log('Ready : Grid Fields Set Up Completed');

                _spListReminder.functions.return_KendoDataSource(results, 'clientname', 'Search by Client Name'); // to confirm the grid columns set up 
                $('#employeetab li a').each(function () {
                    if ($(this).hasClass('active')) {
                        console.log($(this));
                        $(this).trigger('click');
                    }
                });
            });
            // invoke Kendo Grid with datasource.                        

            //**************** KENDO GRID ***************************************************     // Register Filter click event Handlers


        });
    });
}

function nameFilter(element) {
    element.kendoAutoComplete({
        dataSource: clientname
    });
}

function getUserId_RESTAPI(loginName) {
    var userId = '';
    var requestUri = window.SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/siteusers(@loginname)?@target='" + window.SPHostWebUrl + "'&@loginname='" + loginName + "'";
    $.ajax({
        url: requestUri,
        method: "GET",
        async: false,
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
            // console.log(data);
            if (data != null) {
                userId = data.d.Id;
            }
        },
        error: function (error) {

        }
    });

    return userId;
}

function bind_AddAccount() {
    // alert('popup')
    $('.addAccount').unbind();
    $('.addAccount').bind('click', function () {
        //   alert('popup')
        var InputAddElement = $('.card .card-body .legend-accountcontainer').find().last();
        var id_BankAccount = 'drpItemCurrency' + count_BankAccount;
        count_BankAccount += 1;

        var markup = '<div class="row align-items-start row-account item-position mt-2">' +
                       '<div class="col-md-3 pr-0"><input type="text" class="form-control txtBankName" placeholder="Mandatory Info - Bank Name" /></div>' +
                       ' <div class="col-md-3 pr-0"><input type="text" class="form-control txtAccount" placeholder="Mandatory Info - Account Number" /></div>' +
                       ' <div class="col-md-2 mb-2"><select class="form-control drpItemCurrency" id="' + id_BankAccount + '"><option value="Select Currency">Select Currency</option></select></div>' +
                       '<div class="col-md-3 pr-0"><textarea placeholder="Mandatory Info- Bank Address" id="txtAddress" class="form-control txtAddress"></textarea></div>' +
                       ' <span class="col-md-1 delete"><i class="fa fa-trash-o delete-account" aria-hidden="true"></i></span>' +
                      '</div>';
        $(this).parent().parent().append(markup);
        actionControl_Client.Functions.return_set_CurrencyDropBox(id_BankAccount);
        bind_DeleteAccount();
    });
}

function bind_DeleteAccount() {
    $('.delete-account').unbind();
    $('.delete-account').bind('click', function () {
        $(this).parent().parent().remove();
        //$(this).parent().siblings().remove();
        // $(this).remove();
    });
}

function bind_AddContact() {
    // alert('popup')
    $('.addContact').unbind();
    $('.addContact').bind('click', function () {
        //   alert('popup')
        var InputAddElement = $('.card .card-body .legend-contactcontainer').find().last();
        var id_RoleContact = 'drpItemRole' + count_RoleContact;
        count_RoleContact += 1;


        var markup = '<div class="row align-items-center row-contact">' +
                        ' <div class="col-md-4 pr-0"><input type="text" class="form-control txtName" placeholder="Mandatory Info - Contact Name" /></div>     ' +
                        ' <div class="col-md-3 pr-0"><input type="text" class="form-control txtEmail" placeholder="Mandatory Info - Contact Email" /></div>   ' +
                        ' <div class="col-md-2 pr-0"><input type="text" class="form-control txtPhone" placeholder="Mandatory Info - Phone Number" /></div>    ' +
                        ' <div class="col-md-2 mb-2"><select class="form-control drpItemRole" id="' + id_RoleContact + '"><option value="Select Role">Select Role</option></select></div>   ' +
                        ' <span class="col-md-1 delete"><i class="fa fa-trash-o delete-contact" aria-hidden="true"></i></span>' +
                        ' </div>';

        $(this).parent().parent().append(markup);
        actionControl_Client.Functions.return_set_ContactRoles(id_RoleContact);
        bind_DeleteContact();
    });
}

function bind_DeleteContact() {
    $('.delete-contact').unbind();
    $('.delete-contact').bind('click', function () {
        //$(this).parent().siblings().remove();
        $(this).parent().parent().remove();
        // $(this).remove();
    });
}


function createContactsListItem_AsBatchProcess(allContacts) {

    var ctx = new SP.ClientContext(SPAppWebUrl);
    var appCtxSite = new SP.AppContextSite(ctx, SPHostWebUrl);

    var web = appCtxSite.get_web();
    var list = web.get_lists().getByTitle(window.ListName_Contacts);
    $.each(allContacts, function (index, item) {

        var listCreationInformation = new SP.ListItemCreationInformation();
        var listItem = list.addItem(listCreationInformation);

        var clientItemLookupField = new SP.FieldLookupValue();
        clientItemLookupField.set_lookupId(clientID);

        var roleItemLookupField = new SP.FieldLookupValue();
        roleItemLookupField.set_lookupId(item.role);


        listItem.set_item("Title", item.name);
        listItem.set_item("Email", item.email);
        listItem.set_item("PhoneNumber", item.phone);
        if (item.role != 0)
            listItem.set_item("Role", roleItemLookupField);
        listItem.set_item("Client", clientItemLookupField)

        listItem.update();
        ctx.load(listItem);
    });
    ctx.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded_Contact), Function.createDelegate(this, this.onQueryFailed_Contact));
}

function onQuerySucceeded_Contact() {

    toastr.success('Client Contacts Details Added Successfully');
    if (Collect_InputAccounts.length > 0)
        createAccountsListItem_AsBatchProcess(window.Collect_InputAccounts);
    else {
        setTimeout(function () {
            goTo__PageAllItems();
        }, 2000);
    }
}

function onQueryFailed_Contact(sender, args) {
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

function createAccountsListItem_AsBatchProcess(allAccounts) {

    var ctx = new SP.ClientContext(SPAppWebUrl);
    var appCtxSite = new SP.AppContextSite(ctx, SPHostWebUrl);

    var web = appCtxSite.get_web();
    var list = web.get_lists().getByTitle(window.ListName_BankAccounts);
    $.each(allAccounts, function (index, item) {

        var listCreationInformation = new SP.ListItemCreationInformation();
        var listItem = list.addItem(listCreationInformation);

        var clientItemLookupField = new SP.FieldLookupValue();
        clientItemLookupField.set_lookupId(clientID);

        var currencyItemLookupField = new SP.FieldLookupValue();
        currencyItemLookupField.set_lookupId(item.currency);


        listItem.set_item("Title", item.accountno);
        listItem.set_item("Client", clientItemLookupField);
        if (item.currency != 0)
            listItem.set_item("Currency", currencyItemLookupField);
        listItem.set_item("Bank_x0020_Name", item.bankname);
        listItem.set_item("Address", item.address);

        listItem.update();
        ctx.load(listItem);
    });
    ctx.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded_Account), Function.createDelegate(this, this.onQueryFailed_Account));
}

function onQuerySucceeded_Account() {

    toastr.success('Client Bank Account Details Added Successfully');
    setTimeout(function () {
        goTo__PageAllItems();
    }, 2000);

    //var draw_TableClients = new ctrl_Client.Functions.return_construct_View('tabs');
    //draw_TableClients.displayview('ViewAll');
    ////$('.add-form').hide();
    //$('.add-employee').hide();
    //$('#tab_Employees').show();
    //$('.close-button').hide();
    //$('.add-button').show();
    //$('.quicksearch').show();
    //ctrl_Client.Functions.return_clear_Controls();
    //Reload();



    //setTimeout(function () {
    //    $('.preloader1').fadeOut();
    //}, 2000);

}

function onQueryFailed_Account(sender, args) {

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

function parseValidation(inputbool) {
    if (inputbool === 'true')
        return true;
    else if (inputbool === 'false')
        return false;
}

function goTo__PageAllItems() {
    var goToClientPage = document.URL;
    window.location.href = goToClientPage;
}

//*****************Button Click Events from Kendo Grid Action controls*********************//


//SP.Data.Bank_x0020_Account_x0020_DetailsListItem
//SP.Data.ContactsListItem


