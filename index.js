"use strict";

function getElement(selector, getAll = false) {
  if (getAll === true) return document.querySelectorAll(selector);
  return document.querySelector(selector);
}

function createElement(element) {
  return document.createElement(element);
}

function getFileName() {
  let myPath = window.location.pathname;
  let myFile = myPath.substring(myPath.lastIndexOf("/") + 1);
  return myFile;
}

