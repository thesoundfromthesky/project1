"use strict";

function getElement(selector, getAll = false) {
  if (getAll === true) return document.querySelectorAll(selector);
  return document.querySelector(selector);
}

function getCanvas2D() {
  let c = getElement("#myCanvas");
  return c.getContext("2d");
}

function drawLine(x, y, width, height) {
  let ctx = getCanvas2D();
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width, y + height);
  ctx.stroke();
}

function drawCircle(x, y, r) {
  let ctx = getCanvas2D();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.stroke();
}

function fillText(text, x, y) {
  let ctx = getCanvas2D();
  ctx.font = "30px Arial";
  ctx.fillText(text, x, y);
}

function drawText(text, x, y) {
  let ctx = getCanvas2D();
  ctx.font = "30px Arial";
  ctx.strokeText(text, x, y);
}

drawLine(250, 50, 100, 0);
drawCircle(200, 200, 20);
fillText("Hello World", 0, 30);
drawText("Hello World", 0, 60);
