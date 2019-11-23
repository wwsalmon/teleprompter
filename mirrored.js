scriptIn = window.opener.scriptIn;
$("#script").text(scriptIn);

window.onresize = function() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    window.opener.window.resizeTo(windowWidth,windowHeight);
}

// window.onscroll = function() {
//     console.log(window.scrollY, window.scrollTop);
// }