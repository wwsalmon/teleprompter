scriptIn = window.opener.scriptContent;
$("#script").text(scriptIn);

$(".openprompter").on('click', function(){
    button = $(this);
    m = window.open('prompter.html', '', 'menubar=no');
    m.addEventListener('load', function () {
        console.log("calling load boi");
        if (button.attr('id') == "openmirrored") {
            $(m.document.body).addClass("mirrored");
            console.log($(m.document.body));
        }
        adjPreview(m);
    });
    m.addEventListener('beforeunload', function(){
        console.log("unloaded");
        m = undefined;
        return;
    });
})
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
    prompter = $(m.document.body).find(".teleprompter");
    properFontSize = parseInt(prompter['prevObject'].css("font-size"));

    /* NOTE: below, the 64 is for topbar height and 24 for border around the preview. */

    topbarH = 48 + 20;
    padding = 24;
    
    if (thisHeight - topbarH - padding < windowHeight){
        scale = (thisHeight - topbarH - padding) / windowHeight;
        if (thisWidth - padding < windowWidth * scale){
            scale = (thisWidth - padding) / windowWidth;
        }
    }
    else if (thisWidth - padding < windowWidth){
        console.log("smallerwidth");
        scale = (thisWidth - padding) / windowWidth;
    }
    else scale = 1

    fontSize = properFontSize * scale;
    
    $('.preview-container').width(scale * windowWidth);
    $('.monitor-label').width(scale * windowWidth + padding);
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

$('#fontdec').on('click', function(){
    changeFontSize("decrease");
});

$('#fontinc').on('click', function(){
    changeFontSize("increase");
});

$('#fontres').on('click', function(){
    changeFontSize("reset");
});

function changeFontSize(dir){
    if (typeof m == "undefined"){
        alert("Open the prompter window first!");
        return;
    }
    prompter = $(m.document.body).find(".teleprompter")['prevObject'];
    if (dir == "reset"){
        prompter.css("font-size","96px");
    }
    else{
        currentFontSize = parseInt(prompter.css("font-size"));
        if (dir == "increase"){
            if (currentFontSize + 10 <= 206) {
                newFontSize = currentFontSize + 10;
            }
        }
        else if (dir == "decrease"){
            if (currentFontSize - 10 >= 16) {
                newFontSize = currentFontSize - 10;
            }
        }
        prompter.css("font-size",newFontSize);
    }
    adjPreview(m);
}