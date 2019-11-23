scriptIn = window.opener.scriptContent;
$("#script").text(scriptIn);

$("#openmirror").on("click",function(){
    m = window.open('mirrored.html', '', 'menubar=no');
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    m.window.resizeTo(windowWidth, windowHeight);
});

window.onscroll = function () {
    if (typeof m != "undefined"){
        topscroll = window.scrollY;
        m.document.body.scrollTop = topscroll;
        // m.window.scrollY = topscroll;
        m.window.scrollTo(0, topscroll);
        // console.log(m.window.scrollY, m.document.body.scrollTop, topscroll)
    }
}