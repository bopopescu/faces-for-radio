$(document).ready( function() {
    var data = JSON.parse($("#data").html());

    $('button#play').on('click', function(e) {
        var landingScreen = $(this).parents('#landing_screen');
        landingScreen.slideToggle();
    });
    $('button.answer').on('click', function(e) {
        var screen = $(this).parents('div.screen');
        screen.slideToggle();
    });

    var questionList = $('div#questions').children();

    for (i=0; i<data.length; i++) {
        var img= questionList.eq(i).children('img');
        var audio = questionList.eq(i).children('p.audio-p').children('audio');
        var buttonList = questionList.eq(i).children('.btn-group-vertical')
            .children('button');

        img.attr('src', data[i].img);
        audio.attr('src', data[i].mp3);
    }

});

