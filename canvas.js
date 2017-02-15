const $ = require('jquery');

context = document.getElementById('canvas').getContext("2d");

var canvasWidth = 490;
var canvasHeight = 220;
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";
var curColor = colorPurple;
var clickColor = new Array();
var clickSize = new Array();
var curSize = "small";
var clickTool = new Array();
var curTool = "marker";
var radius;
var crayonTextureImage = new Image();
var totalLoadResources = 8;
var curLoadResNum = 0;

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



$(".color").click(function () {
  curColor = $(this).attr('data-color');
});

$(".size").click(function () {
  curSize = $(this).attr('data-size');
});

$(".tool").click(function () {
  curTool = $(this).attr('data-tool');
});


$('#canvas').mousedown(function (e) {
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});


$('#canvas').mousemove(function (e) {
  if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});


$('#canvas').mouseup(function (e) {
  paint = false;
});

$('#canvas').mouseleave(function (e) {
  paint = false;
});



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
}



function redraw() {

  clearCanvas();

  context.lineJoin = "round";

  for (var i = 0; i < clickX.length; i++) {

    if (clickSize[i] == "small") {
      radius = 2;
    } else if (clickSize[i] == "normal") {
      radius = 5;
    } else if (clickSize[i] == "large") {
      radius = 10;
    } else if (clickSize[i] == "huge") {
      radius = 20;
    } else {
      alert("Error: Radius is zero for click " + i);
      radius = 0;
    }

    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      context.moveTo(clickX[i] - 1, clickY[i]);
    }

    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.lineWidth = radius;
    context.stroke();

    if (curTool == "crayon") {
      context.globalAlpha = 0.4;
      context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
    }
    context.globalAlpha = 1;

  }




}