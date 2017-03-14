const { ipcRenderer } = require('electron');
const $ = require('jquery');

var curColor;

$(".color").click(function () {
  var color = $(this).css('backgroundColor');
  var sub = color.replace("rgb(", "");
  var sub2 = sub.replace(")", "");
  var rgb = sub2.split(', ');
  curColor = rgbToHex(rgb[0], rgb[1], rgb[2]);
  ipcRenderer.send('color', curColor);
});

$(".tool").click(function () {
  $(".tool").removeClass('btn-active');
  $(this).addClass('btn-active');
  curTool = $(this).attr('data-tool');
  ipcRenderer.send('tool', curTool);
});


ipcRenderer.on('clear', (event, clear) => {
  $(".tool").removeClass('btn-active');
  $("#marker").addClass('btn-active');
});


function rgbToHex(r, g, b) {
  var hex = (0x100 | Math.round(r)).toString(16).substr(1) +
    (0x100 | Math.round(g)).toString(16).substr(1) +
    (0x100 | Math.round(b)).toString(16).substr(1);
  return '#' + hex.toUpperCase();
}


// Largeur du pinceau :

$('#ex1').slider();

$("#largeursPinceau input").change(function () {
  var px = $(this).val();
  $("#px").html($(this).val() + "px");
  ipcRenderer.send('size', px);
});