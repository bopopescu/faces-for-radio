$(document).ready(function(){function e(e){return e.replace(/\w\S*/g,function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()})}function t(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),r=e[t];e[t]=e[n];e[n]=r}return e}facesMadeForRadio=0;var n=JSON.parse($("#data").html());$("#play_game").on("click",function(e){var t=$(this).parents("#landing_screen");t.slideToggle()});$("button.answer").on("click",function(e){var t=$(this).parents("div.screen");t.slideToggle()});var r=$("div#questions").children();for(var i=0;i<n.length;i++){var s=r.eq(i).children("p.text-center").eq(0).children("img");console.log(s);var o=r.eq(i).children("p.audio-p").children("audio"),u=r.eq(i).children(".btn-group-vertical").children("button"),a=t(n[i].answers).slice(0,2);a.push(n[i].name);var f=t(a);for(var l=0;l<u.length;l++){u.eq(l).text(e(f[l]));if(f[l]==n[i].name){var c=u.eq(l).attr("class");u.eq(l).attr("class",c+" correct")}}s.attr("src",n[i].img);o.attr("src",n[i].mp3)}$("button.correct").on("click",function(e){facesMadeForRadio+=10;console.log(facesMadeForRadio)})});