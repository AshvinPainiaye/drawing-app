const { ipcRenderer } = require('electron');
const $ = require('jquery');

context = document.getElementById('canvas').getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
var canvasWidth = 490;
var canvasHeight = 490;
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
var curColor = "#000";
var clickColor = new Array();
var clickSize = new Array();
var curSize = 5;
var clickTool = new Array();
var curTool = "marker";
var radius;
var crayonTextureImage = new Image();
var totalLoadResources = 8;
var curLoadResNum = 0;

function show() {
  ipcRenderer.send('show-second');
}

/**
* Calls the redraw function after all neccessary resources are loaded.
*/
function resourceLoaded() {
  if (++curLoadResNum >= totalLoadResources) {
    redraw();
  }
}

crayonTextureImage.onload = function () {
  resourceLoaded();
};
crayonTextureImage.src = "images/crayon-texture.png";


ipcRenderer.on('color', (event, color) => {
  curColor = color;
});

ipcRenderer.on('size', (event, size) => {
  curSize = size;
});


ipcRenderer.on('tool', (event, tool) => {
  curTool = tool;
});


$('#canvas').mousedown(function (e) {
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(mouseX, mouseY);
  redraw();
});


$('#canvas').mousemove(function (e) {
  if (paint) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    addClick(mouseX, mouseY, true);
    redraw();
  }
});


$('#canvas').mouseup(function (e) {
  paint = false;
});

$('#canvas').mouseleave(function (e) {
  paint = false;
});


// DEBUT TACTILE
$(canvas).bind('touchstart', function (e) {
  var ev = e.originalEvent;
  e.preventDefault();
  mouseX = (ev.targetTouches[0].pageX - this.offsetLeft);
  mouseY = (ev.targetTouches[0].pageY - this.offsetTop);

  paint = true;
  addClick(mouseX, mouseY);
  redraw();
});


$(canvas).bind('touchmove', function (e) {
  if (paint) {
    var ev = e.originalEvent;
    e.preventDefault();
    mouseX = (ev.targetTouches[0].pageX - this.offsetLeft);
    mouseY = (ev.targetTouches[0].pageY - this.offsetTop);

    addClick(mouseX, mouseY, true);
    redraw();
  }
});


$('#canvas').bind('touchend', function (e) {
  paint = false;
});
// FIN TACTILE



function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickSize.push(curSize);
  clickTool.push(curTool);
  if (curTool == "eraser") {
    clickColor.push("white");
  } else {
    clickColor.push(curColor);
  }
}


/**
* Clears the canvas.
*/
function clearCanvas() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  ipcRenderer.send('clear', 'clear');

  this.clickX = new Array();
  this.clickY = new Array();
  this.clickDrag = new Array();
  this.clickColor = new Array();
  this.clickSize = new Array();
  this.clickTool = new Array();
  this.curTool = "marker";

}



function redraw() {

  context.lineJoin = "round";

  for (var i = 0; i < clickX.length; i++) {

    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      context.moveTo(clickX[i] - 1, clickY[i]);
    }

    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.lineWidth = clickSize[i];
    context.stroke();

    if (curTool == "crayon") {
      context.globalAlpha = 0.4;
      context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
    }
    context.globalAlpha = 1;

  }

}

function download() {
  var dt = canvas.toDataURL('image/jpg');
  this.href = dt;
};
downloadLnk.addEventListener('click', download, false);