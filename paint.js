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
    this.ongoingTouches = [];
    this.c = getElement("#paint");
    this.ctx = this.c.getContext("2d");
    this.init();
  }

  init() {
    this.c.addEventListener("touchstart", event => {
      this.menu(event);
    });
    this.c.addEventListener("touchmove", event => {
      this.menu(event);
    });
    this.c.addEventListener("touchend", event => {
      this.menu(event);
    });
    this.c.addEventListener("mousedown", event => {
      this.menu(event);
    });
    this.c.addEventListener("mousemove", event => {
      this.menu(event);
    });
    this.c.addEventListener("mouseup", event => {
      this.menu(event);
    });
    this.c.addEventListener("mouseout", event => {
      this.menu(event);
    });
  }

  menu(event) {
    switch (event.type) {
      case "touchstart":
        this.enableTouch(event);
        break;
      case "touchmove":  
        this.drawTouch(event);
        break;
      case "touchend":
        this.disableTouch();
        break;
      case "mousedown":
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

  copyTouch(touch) {
    return {
      identifier: touch.identifier,
      pageX: touch.pageX,
      pageY: touch.pageY
    };
  }

  updateTouchPoint(touch) {
    this.point.X = touch.pageX - this.c.offsetLeft;
    this.point.Y = touch.pageY - this.c.offsetTop;
  }

  enableTouch(event) {
    let touches = event.changedTouches;
    for (let touch of touches) {
      this.ongoingTouches.push(this.copyTouch(touch));
      this.updateTouchPoint(touch);
      this.ctx.beginPath();
      this.ctx.moveTo(this.point.X, this.point.Y);
      this.ctx.stroke();
    }
  }

  drawTouch(event) {
    let touches = event.changedTouches;    
    let idx;
    for (let touch of touches) {
      idx = this.ongoingTouches.findIndex((value) => {
        return value.identifier === touch.identifier;
      })

      if(-1 < idx) {
        this.ctx.beginPath();
        this.updateTouchPoint(this.ongoingTouches[idx]);
        this.ctx.moveTo(this.point.X, this.point.Y);
        this.updateTouchPoint(touch);
        this.ctx.lineTo(this.point.X, this.point.Y);
        this.ctx.stroke();

        this.ongoingTouches.splice(idx, 1, this.copyTouch(touch));
      }
    }
  }

  disableTouch() {
    let touches = event.changedTouches;
    let idx;
    for(let touch of touches){
      idx = this.ongoingTouches.findIndex((value) => {
        return value.identifier === touch.identifier;
      })

      if(-1 < idx){
        this.ongoingTouches.splice(idx, 1);
      }
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
