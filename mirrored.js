scriptIn = window.opener.scriptIn;
$("#script").text(scriptIn);

window.onresize = function() {
    window.opener.postMessage("resize", window.opener.origin);
}

// window.onscroll = function() {
//     console.log(window.scrollY, window.scrollTop);
// }