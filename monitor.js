scriptIn = window.opener.scriptContent;
$("#script").text(scriptIn);

$("#openmirror").on("click", function() {
    m = window.open('mirrored.html', '', 'menubar=no');
    m.addEventListener('load', function () {
        adjPreview(m);
    });
});

function receiveMessage(event){
    if (event.data == "resize"){
        adjPreview(m);
    }
}

window.addEventListener("message", receiveMessage, false);

window.onresize = function(){
    if (typeof m != "undefined"){
        adjPreview(m);
    }
}

scale = 1;

function adjPreview(m){
    windowWidth = m.window.innerWidth;
    windowHeight = m.window.innerHeight;
    thisWidth = $("body").width();
    thisHeight = $("body").height();
    mirrored = $(m.document.body).find(".teleprompter");
    properFontSize = parseInt(mirrored['prevObject'].css("font-size"));
    console.log(properFontSize);
    
    if (thisHeight < windowHeight){
        scale = thisHeight / windowHeight;
        if (thisWidth < windowWidth * scale){
            scale = thisWidth / windowWidth;
        }
    }
    else if (thisWidth < windowWidth){
        console.log("smallerwidth");
        scale = thisWidth / windowWidth;
    }
    else scale = 1

    fontSize = properFontSize * scale;
    
    $('.preview-container').width(scale * windowWidth);
    $('.preview-container').height(scale * windowHeight);
    $('.preview-container .teleprompter').css("font-size",fontSize);
}

$(".preview-container").scroll(function () {
    if (typeof m != "undefined") {
        topscroll = $('.preview-container').scrollTop() / scale;
        m.document.body.scrollTop = topscroll;
        m.window.scrollTo(0, topscroll);
    }
});