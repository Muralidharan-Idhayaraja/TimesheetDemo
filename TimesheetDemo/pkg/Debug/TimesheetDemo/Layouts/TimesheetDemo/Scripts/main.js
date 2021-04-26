

$(document).ready(function () {



    $('#dateStartDate, #dateEndDate, #pdateStartDate, #pdateEndDate,#dateHalfDate,#vacation_dateStartDate,#vacation_dateEndDate,#halfday_Date,#format_StartDate,#format_EndDate').datetimepicker({
        format: 'L',
        useCurrent: false,
    });
    $('#lunchStartTime, #lunchEndTime ,#halfday_EndTime ,#halfday_StartTime,#wfh_dateStartTime,#wfh_dateEndTime').datetimepicker({
        format: 'LT',
        useCurrent: false
    });

    //$('[id^="poStartDate"]').datetimepicker({
    //    format: 'L',
    //    useCurrent: false,
    //});
    $('#wfh_date').datetimepicker({
        useCurrent: false,
    });
    $('#range_Startdate,#range_Enddate').datetimepicker({
        useCurrent: false,
        format: 'L',
    });

    function dateChanged(ev) {
        alert('firing')
    }


    $('[data-toggle="tooltip"]').tooltip();


    $('#addemployee').click(function () {
        $('.add-employee').show();
        $('#close-addemployee').show();
        $('#addemployee').hide();
        $('#tab_Employees').hide();
        $('.quicksearch').hide();
    });
    $('#close-addemployee').click(function () {
        $('.add-employee').hide();
        $('#close-addemployee').hide();
        $('#addemployee').show();
        $('#tab_Employees').show();
        $('.quicksearch').show();
    });

    $('.leftmenu-toggler').click(function () {
        $(this).parent().toggleClass('icon-menu');
        $('.iconmenu').removeClass('iconhover');

        $('.icon-menu ul li.iconmenu').unbind('mouseover');
        $('.icon-menu ul li.iconmenu').bind('mouseover', 'a', function (event) {
            $('.icon-menu ul li.iconmenu').removeClass('iconhover');
            if ($('.icon-menu ul li.iconmenu').length > 0) {
                $(this).addClass('iconhover');
            }
        });

        $('.icon-menu ul li.iconmenu').unbind('mouseleave');
        $('.icon-menu ul li.iconmenu').bind('mouseleave', 'a', function (event) {
            $('.icon-menu ul li.iconmenu').removeClass('iconhover');
        });
    });


    //bind_DeleteSection();
    //bind_AddTask();
    //bind_DeleteTask();
    //$(".addsection").click(function () {

    //    if ($('.card .card-body .row .legend-container').length < 15) {
    //        //var fileid = $('.card .card-body .row').find().last();
    //        var markup = '<div class="col-md-6 mb-4"> ' +
    //                      '  <div class="legend-container">                                                                               ' +
    //        '      <input type="text" Placeholder="Enter Project Section Name" class="legend-title col-md-6" />                           ' +
    //        '      <span class="addlegend withcheckbox">                                                                                  ' +
    //        '      <button type="button" class="btn btn-primary addtask">                                                                 ' +
    //        '      <i class="fa fa-plus-circle" aria-hidden="true">                                                        ' +
    //        '      </i>&nbsp;&nbsp;Add Task</button><span class="deletecontainer">                                                        ' +
    //        '      <i class="fa fa-times-circle delete-section" aria-hidden="true"></i></span>                                                          ' +
    //        '      </span>                                                                                                                ' +
    //        '      <div class="row align-items-center"><div class="col-md-11 pr-0"><input type="text" class="form-control" placeholder="Enter Task Name" /> </div>' +
    //        '  <span class="col-md-1 delete"><i class="fa fa-trash-o delete-task" aria-hidden="true"></i></span> ' +
    //        '      </div>                                                                                                                 ' +
    //        '      </div>                                                                                                                 ' +
    //        '      </div>';
    //        $(".card .card-body .filesetcontainer").append(markup);
    //    }
    //    bind_DeleteSection();
    //    bind_AddTask();
    //    bind_DeleteTask();
    //});




    //function bind_AddTask() {
    //    $('.addtask').unbind();
    //    $('.addtask').bind('click', function () {
    //        var InputAddElement = $('.card .card-body .legend-container').find().last();
    //        var markup = '<div class="row align-items-center">' +
    //                        '   <div class="col-md-11 pr-0"><input type="text" class="form-control mt-2" placeholder="Enter Task Name" /></div>' +
    //                        '   <span class="col-md-1 delete"><i class="fa fa-trash-o delete-task" aria-hidden="true"></i></span>' +
    //                        '   </div>';
    //        $(this).parent().parent().append(markup);
    //        bind_DeleteTask();
    //    });
    //}



    //function bind_DeleteTask() {
    //    $('.delete-task').unbind();
    //    $('.delete-task').bind('click', function () {
    //        $(this).parent().siblings().remove();
    //        $(this).remove();
    //    });
    //}

    //function bind_DeleteSection() {
    //    $('.delete-section').unbind();
    //    $('.delete-section').bind('click', function () {
    //        $(this).parent().parent().parent().parent().remove();

    //    });
    //}

    $('.left-mobilemenu-toggle').click(function () {
        $('.leftcontainer').slideToggle();
        $('.leftcontainer').removeClass('icon-menu');
    });
    
    $('.leftmenu-toggler').click()



});


$(window).resize(function () {
    var WinWidth = $(window).width();
    function leftmenu() {
        if (WinWidth > 991) {
            $('.leftcontainer').addClass('desktopmode');
        }
        else {
            $('.leftcontainer').removeClass('desktopmode');
        }
    }
    leftmenu();
});





