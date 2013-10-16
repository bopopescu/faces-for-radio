$(document).ready( function() {
    facesMadeForRadio = 0;

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    var data = JSON.parse($("#data").html());

    $('#play_game').on('click', function(e) {
        var landingScreen = $(this).parents('#landing_screen');
        landingScreen.attr("class", "dead");
        landingScreen.transition({ x: '-100%'});
        var firstScreen = $('div#screen0');
        firstScreen.transition({x: '-100%'});
        firstScreen.attr("class", "screen active");
    });

    $('button.answer').on('click', function(e) {
        var screen = $(this).parents('div.screen');
        screen.attr("class", "screen inactive");
        var activeScreen = screen.next();
        activeScreen.attr("class", "screen active");

        var correctAnswer = $(this).parent().children('.correct');
        var incorrectAnswers = correctAnswer.siblings();
        incorrectAnswers.children().transition({x: '-100%'}, 500, 'snap');
        correctAnswer.children().transition({
            x: '-100%', delay: 500 }, 500, 'snap');

        activeScreen.children('div.image-frame')
            .children('img').transition({x: '-120%', delay: 500});

        activeScreen.children('.btn-group-vertical')
            .transition({x: '-100%', delay: 600});

        /*screen.find('.correct').fadeOut(200, function() {
            var bg = $(this).css('background');
            $(this).css('background', '#509e2f').fadeIn(200);
            $(this).fadeOut(200, function() {
                $(this).css('background', bg).fadeIn(500);
            });
            console.log(activeScreen);
            $(this).siblings().children()
                .transition({x: '-100%'}, 500, 'snap');
            $(this).children()
                .transition({x: '-100%', delay: 1000}, 500, 'snap');
            activeScreen.find('img').transition({x: '-120%'});
        });
        */
    });

    var questionList = $('div#questions').children();

    for (var i=0; i<data.length; i++) {
        var img= questionList.eq(i)
            .children('div.image-frame').eq(0).children('img');
        var audio = questionList.eq(i).children('p.audio-p').children('audio');
        var buttonList = questionList.eq(i).children('.btn-group-vertical')
            .children('button');
        var answerList = shuffleArray(data[i].answers).slice(0,2);
        answerList.push(data[i].name);
        var answers = shuffleArray(answerList);


        for (var j=0; j<buttonList.length; j++) {
            buttonList.eq(j).html("<div>" + toTitleCase(answers[j]) + "</div>");
            if (answers[j] == data[i].name) {
                var correctAnswer = buttonList.eq(j).attr('class');
                buttonList.eq(j).attr('class', correctAnswer + ' correct');
            }
        }


        img.attr('src', data[i].img);
        audio.attr('src', data[i].mp3);
    }

    $('button.correct').on('click', function(e) {
        facesMadeForRadio += 10;
        $('p#score').text(facesMadeForRadio);
    });

    $('span.glyphicon').on('click', function(e) {
        facesMadeForRadio += -2;
        $('p#score').text(facesMadeForRadio);
    });

});

