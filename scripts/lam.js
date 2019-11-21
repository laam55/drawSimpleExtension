setTimeout(() => {
    document.getElementById('alert').style.display = 'none'
}, 3000)

var canvas = document.getElementById('show');//)$('#show');
canvas.width = 342;
canvas.height = 342;

// canvas
var context = canvas.getContext('2d');

context.beginPath();
context.rect(0, 0, 342, 342);
context.fillStyle = "#eeeeee";
context.fill();

var start = function(coors) {
    context.beginPath();
    context.moveTo(coors.x, coors.y);
    this.isDrawing = true;
};
var move = function(coors) {
    if (this.isDrawing) {
        context.strokeStyle = "#000";
        context.lineJoin = "round";
        context.lineWidth = 3;
        context.lineTo(coors.x, coors.y);
        context.stroke();
    }
};
var stop = function(coors) {
    if (this.isDrawing) {
        this.touchmove(coors);
        this.isDrawing = false;
    }
};
var drawer = {
    isDrawing: false,
    mousedown: start,
    mousemove: move,
    mouseup: stop,
    touchstart: start,
    touchmove: move,
    touchend: stop
};
var draw = function(e) {
    var coors = {
        x: e.clientX - 5|| e.targetTouches[0].pageX,
        y: e.clientY - 110 || e.targetTouches[0].pageY
    };
    drawer[e.type](coors);
}
canvas.addEventListener('mousedown', draw, false);
canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mouseup', draw, false);
canvas.addEventListener('touchstart', draw, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('touchend', draw, false);

// download image from canvas
function downloadImageFromCanvas(e) {
    if ((event.ctrlKey || event.metaKey) && String.fromCharCode(event.which).toLowerCase() == 's') {
        event.preventDefault();

        // var d = canvas.toDataURL("image/png");
        // var w = window.open('about:blank','image from canvas');
        // w.document.write("<img src='" + d + "' alt='from canvas'/>");

        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', 'image.png');
        let dataURL = canvas.toDataURL('image/png');
        let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
        downloadLink.setAttribute('href', url);
        downloadLink.click();
    }
}
document.addEventListener('keydown', downloadImageFromCanvas)
