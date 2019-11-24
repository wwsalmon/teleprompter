scriptIn = window.opener.scriptIn;
$("#script").text(scriptIn);

window.onresize = function() {
    window.opener.postMessage("resize", window.opener.origin);
}

// window.onscroll = function() {
//     console.log(window.scrollY, window.scrollTop);
// }

function receiveMessage(event) {
    if (event.data == "unloading") {
        window.close();
    }
}

window.addEventListener("message", receiveMessage, false);

window.opener.addEventListener('unload', function () {
    window.close();
});