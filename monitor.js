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

function adjPreview(m){
    windowWidth = m.window.innerWidth;
    windowHeight = m.window.innerHeight;
    thisWidth = $("body").width();
    thisHeight = $("body").height();
    
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
    
    $('.preview-container').width(scale * windowWidth);
    $('.preview-container').height(scale * windowHeight);
}