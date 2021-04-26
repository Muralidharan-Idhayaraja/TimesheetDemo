
/// KENDO Parent And Child Grid with Tabs Strips with Filter Options enabled
$(document).ready(function () {


    var parentArray = [];
    //    parentArray.push({EmpID: i.toString(), Employee: 'Murali', Project: 'Project', Role: 'SharePoint Developer' });

    for (var i = 0; i < 10; i++) {
        parentArray.push({ EmpID: i.toString(), Employee: 'Murali' + i + '', Project: 'Project' + i + '', Role: 'SharePoint Developer' + i + '' });
    }
    for (var i = 10; i < 20; i++) {
        parentArray.push({ EmpID: i.toString(), Employee: 'Murali' + i + '', Project: 'Project' + i + '', Role: 'SharePoint Developer' + i + '' });
    }

    var parent_dataSource = new kendo.data.DataSource({
        data: parentArray,
        pageSize: 20,
    });


    var childArray = [];
    //parentArray.push({ StartDate: 'StartDate', EndDate: 'EndDate', TotalDays: 'TotalDays', ApprovalStatus: 'Approved' });
    for (var i = 0; i < 100; i++) {
        childArray.push({ EmpID: i.toString(), StartDate: 'StartDate' + i + '', EndDate: 'EndDate' + i + '', TotalDays: 'TotalDays' + i + '', ApprovalStatus: 'Approved', EventType: 'WorkFromHome' });
    }
    for (var i = 0; i < 100; i++) {
        childArray.push({ EmpID: i.toString(), StartDate: 'StartDate' + i + '', EndDate: 'EndDate' + i + '', TotalDays: 'TotalDays' + i + '', ApprovalStatus: 'Approved', EventType: 'VacationDays' });
    }
    var child_dataSource = new kendo.data.DataSource({
        data: childArray,
        pageSize: 7,
    });


    var element = $("#resultsGrid").kendoGrid({
        dataSource: parent_dataSource,
        // height: 450,
        sortable: true,
        filterable: true,
        groupable: true,
        pageable: true,
        detailInit: detailInit,
        detailTemplate: kendo.template($("#order-detail-template").html()),
        dataBound: function () {
            // this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        columns: [
          {
              field: "Employee",
              title: "Employee"
          },
          {
              field: "Project"
          },
          {
              field: "Role"
          }
        ]
    });

    function detailInit(e) {
        var detailRow = e.detailRow;
        detailRow.find(".tabstrip").kendoTabStrip();

        detailRow.find(".details-grid-WorkFromHome").kendoGrid({
            //  $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
                data: childArray,
                pageSize: 7,
                filter: [{ field: "EmpID", operator: "eq", value: e.data.EmpID }, { field: "EventType", operator: "eq", value: 'WorkFromHome' }]
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            editable: true,
            filterable: true,
            dataBound: function () {
                $('.check_Approve').click(function () {
                    if ($(this).is(':checked'))
                        $(this).parent().parent().addClass('highlight');
                    else
                        $(this).parent().parent().removeClass('highlight');


                });
            },
            toolbar: [{ text: "Approve", className: "btn btn-success" }, { text: "Reject", className: "btn btn-danger" }],

            columns: [
                { template: '<input class="check_Approve" type="checkbox"' },
              { field: "StartDate", title: 'StartDate', },
              { field: "EndDate", title: "EndDate", },
              { field: "TotalDays", title: "Total Days" },
              { field: "ApprovalStatus", title: "Approval Status", },
             { field: "EventType", title: "EventType", }
            ]
        });
        detailRow.find(".details-grid-VacationDays").kendoGrid({
            //  $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
                data: childArray,
                pageSize: 7,
                filter: [{ field: "EventType", operator: "eq", value: 'VacationDays' }]
                //filter: [{ field: "EmpID", operator: "eq", value: e.data.EmpID }, { field: "EventType", operator: "eq", value: 'VacationDays' }]
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            editable: true,
            filterable: true,
            dataBound: function () {
                $('.check_Approve').click(function () {
                    if ($(this).is(':checked'))
                        $(this).parent().parent().addClass('highlight');
                    else
                        $(this).parent().parent().removeClass('highlight');


                });
            },
            toolbar: [{ text: "Approve", className: "btn btn-success" }, { text: "Reject", className: "btn btn-danger" }],

            columns: [
                { template: '<input class="check_Approve" type="checkbox"' },
              { field: "StartDate", title: 'StartDate', },
              { field: "EndDate", title: "EndDate", },
              { field: "TotalDays", title: "Total Days" },
              { field: "ApprovalStatus", title: "Approval Status", },
               { field: "EventType", title: "EventType", }
            ]
        });
    }

    function checkToApprove() {
        $('.check_Approve').click(function () {
            $(this).parent().addClass('highlight');
        });
    }

});