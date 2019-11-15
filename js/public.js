 change();
function change() {
    var w = document.documentElement.clientWidth;
    if (w > 750) {
        w = 750;
    }
    document.documentElement.style.fontSize = w / 7.50 + "px";
}

window.onresize = function () {
    change();
}

