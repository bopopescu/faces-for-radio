$(document).ready( function() {
    facesMadeForRadio = 0;

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
        landingScreen.slideToggle();
    });
    $('button.answer').on('click', function(e) {
        var screen = $(this).parents('div.screen');
        screen.slideToggle();
    });

    var questionList = $('div#questions').children();

    for (var i=0; i<data.length; i++) {
        var img= questionList.eq(i).children('img');
        var audio = questionList.eq(i).children('p.audio-p').children('audio');
        var buttonList = questionList.eq(i).children('.btn-group-vertical')
            .children('button');
        var answerList = shuffleArray(data[i].answers).slice(0,2);
        answerList.push(data[i].name);
        var answers = shuffleArray(answerList);


        for (var j=0; j<buttonList.length; j++) {
            buttonList.eq(j).text(answers[j]);
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
        console.log(facesMadeForRadio);
    });

});

