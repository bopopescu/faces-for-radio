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

    facesJson = JSON.parse($("#data").html());
    var data = facesJson[0].faces;
    var maleAnswers = shuffleArray(facesJson[0].maleAnswers);
    var femaleAnswers = shuffleArray(facesJson[0].femaleAnswers);

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

        if ($(this).attr("class").indexOf('correct') != -1) {
            facesMadeForRadio +=10;
            if (facesMadeForRadio > 100) {
                facesMadeForRadio = 0;
            }
            $('p#score').text(facesMadeForRadio);
        }

        var audio = $('div#screen0').find('audio');
        audio.get(0).pause();

        $('div#screen0').find('span.glyphicon').transition({x: '100px'})
            .transition({x: '0px', delay: 500});

        var nextScreen = screen.next();
        nextScreen.attr("class", "screen active");

        var nextAudio = nextScreen.find('audio').attr('src');
        audio.attr('src', nextAudio);

        var correctAnswer = $(this).parent().children('.correct').children(),
            incorrectAnswers = $(this).parent().children(':not(.correct)').children();
        incorrectAnswers.transition({x: '-100%'}, 500, 'snap');
        correctAnswer.transition({
            x: '-100%', delay: 1000 }, 500, 'snap');

        nextScreen.children('div.image-frame').children('img')
            .transition({x: '-120%', delay: 500});

        nextScreen.children('.btn-group-vertical')
            .transition({x: '-100%', delay: 600});

        if (!nextScreen.attr('id')) {
            var height = $('div.image-frame').outerHeight() + $('div.btn-group-vertical').outerHeight();
            $('#questions').transition({y: -height}, 1000, 'snap');
            $('#scoreboard').css("display", "block");
            $('#your_score').text(facesMadeForRadio);
            $('meta#fb_description').attr('content', "I scored " + facesMadeForRadio +
                " on VPR's 'Faces Made For Radio' quiz. How well do you know the faces behind the voices of Vermont Public Radio?");
            $('meta#tw_description').attr('content', "I just scored " + facesMadeForRadio + 
                " on VPR's #FacesMadeForRadio. How well do you know the faces behidn the voices of @vprnet ? http://bit.ly/1aVt3bD");
        }

    });

    var questionList = $('div#questions').children();

    var faces = [],
        localArray = [],
        nationalArray = [];

    for (var i=0; i<data.length; i++) {
        if (data[i].difficulty == 'easy') {
            faces.push(data[i]);
        } else if (data[i].local == 'True') {
            localArray.push(data[i]);
        } else {
            nationalArray.push(data[i]);
        }
    }

    // Grab half of local faces, consider other possibilities for open source
    var localFaces = shuffleArray(localArray).slice(0, (localArray.length / 2));
    for (var j=0; j<localFaces.length; j++) {
        faces.push(localFaces[j]);
    }

    var nationalFaces = shuffleArray(nationalArray).slice(0, (10 - faces.length));
    for (j=0; j<nationalFaces.length; j++) {
        faces.push(nationalFaces[j]);
    }

    faces = shuffleArray(faces);
    for (i=0; i<faces.length; i++) {
        var answerList;
        var img= questionList.eq(i)
            .children('div.image-frame').children('img');
        var audio = questionList.eq(i).find('audio');
        var buttonList = questionList.eq(i).children('.btn-group-vertical')
            .children('button');
        if (faces[i].sex == 'f') {
            answerList = femaleAnswers.splice(0,2);
        } else if (faces[i].name == 'Click & Clack') {
            answerList = ['Simon & Garfunkle', 'Bert & Ernie'];
        } else {
            answerList = maleAnswers.splice(0,2);
        }
        answerList.push(faces[i].name);
        var answers = shuffleArray(answerList);


        for (j=0; j<buttonList.length; j++) {
            buttonList.eq(j).html("<div>" + toTitleCase(answers[j]) + "</div>");
            if (answers[j] == faces[i].name) {
                var correctAnswer = buttonList.eq(j).attr('class');
                buttonList.eq(j).attr('class', correctAnswer + ' correct');
            }
        }


        img.attr('src', faces[i].img);
        audio.attr('src', faces[i].mp3);
    }


    $('span.glyphicon').on('click', function(e) {
        facesMadeForRadio += -2;
        $('p#score').text(facesMadeForRadio);
    });

});

