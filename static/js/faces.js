$(document).ready( function() {
    $('button#play').on('click', function(e) {
        var landingScreen = $(this).parents('#landing_screen');
        landingScreen.slideToggle();
    });
    $('button.answer').on('click', function(e) {
        var screen = $(this).parents('div.screen');
        screen.slideToggle();
    });
});
