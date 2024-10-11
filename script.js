$(function() {
    $("#slider_blt").draggable({ axis: "x", containment: "parent" });

    $("#slider_blt").on("dragstart", function() {
        $('#instruction').fadeOut('slow');
    });

    $("#slider_blt").on("dragstop", function() {
        $('#slider_blt').animate({left:'0'}, 150, 'linear');
        $('#password_input').prop('type', 'password');
    });

    $("#slider_blt").on("drag", function() {
        if (parseInt($('#slider_blt').css('left')) > 130) {
            $('#password_input').prop('type', 'text');
        }
    });

    // Modo Nocturno Toggle
    $("#theme-toggle").click(function() {
        $('body').attr('data-theme', $('body').attr('data-theme') === 'dark' ? '' : 'dark');
        $(this).text($('body').attr('data-theme') === 'dark' ? 'Modo Nocturno: On' : 'Modo Nocturno: Off');
    });
});
