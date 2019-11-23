scriptIn = window.opener.scriptContent;
$("#script").text(scriptIn);
m = window.opener.m;
console.log(m);

$("#openmirror").on("click",function(){
    m = window.open('mirrored.html');
})