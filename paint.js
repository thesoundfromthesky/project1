"use strict";

function getElement(selector) {
  let element = document.querySelector(selector);
  return element;
}

class Point {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  get X() {
    return this.x;
  }
  set X(value) {
    this.x = value;
  }

  get Y() {
    return this.y;
  }
  set Y(value) {
    this.y = value;
  }
}

class Paint {
  constructor() {
    this.point = new Point();
    this.drawable = false;
    this.c = getElement("#paint");
    this.ctx = this.c.getContext("2d");
    this.init();
  }

  init() {
    this.c.addEventListener("mousedown", (event)=>{this.menu(event)});
    this.c.addEventListener("mousemove", (event)=>{this.menu(event)});
    this.c.addEventListener("mouseup", (event)=>{this.menu(event)});
    this.c.addEventListener("mouseout", (event)=>{this.menu(event)});
  }

  menu(event) {
    switch (event.type) {
      case "mousedown":
        debugger;
        this.enableDraw(event);
        break;
      case "mousemove":
        if (this.drawable) this.draw(event);
        break;
      case "mouseup":
      case "mouseout":
        this.disableDraw();
        break;
    }
  }

  updatePoint(event) {
    this.point.X = event.pageX - this.c.offsetLeft;
    this.point.Y = event.pageY - this.c.offsetTop;
  }

  enableDraw(event) {
    this.updatePoint(event);
    this.ctx.beginPath();
    this.ctx.moveTo(this.point.X, this.point.Y);
    this.ctx.stroke();
    this.drawable = true;
  }

  draw(event) {
    this.updatePoint(event);
    this.ctx.lineTo(this.point.X, this.point.Y);
    this.ctx.stroke();
  }

  disableDraw() {
    this.drawable = false;
  }
}

new Paint();
