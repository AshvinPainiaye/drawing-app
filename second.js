const {ipcRenderer} = require('electron');
const $ = require('jquery');

var curColor;

$(".color").click(function () {
  curColor = $(this).attr('data-color');
 ipcRenderer.send('color', curColor);
  
});

$(".size").click(function () {
  curSize = $(this).attr('data-size');
});

$(".tool").click(function () {
  curTool = $(this).attr('data-tool');
});
