"use strict";

function not(predicate) {
  return function negated(...args) {
    return !predicate(...args);
  };
}

function printIf(shouldPrintIt) {
  return function (msg) {
    if (shouldPrintIt(msg)) {
      output(msg);
    }
  };
}

function when(fn) {
  return function (predicate) {
    return function (...args) {
      if (predicate(...args)) {
        return fn(...args);
      }
    };
  };
}

// *********************

// only necessary in some browsers
var output = console.log;

// point-free version
var printIf = when(output);
//
var isLongEnough = not(isShortEnough);

function isShortEnough(str) {
  return str.length <= 5;
}

var msg1 = "Hello";
var msg2 = msg1 + " World";

// when(output) is returning a function that has the same shape as printIf function

printIf(isShortEnough)(msg1);

// printIf  (isShortEnough)(msg1);
when(output)(isShortEnough)(msg1);

printIf(isShortEnough)(msg1); // Hello
printIf(isShortEnough)(msg2);
printIf(isLongEnough)(msg1);
printIf(isLongEnough)(msg2); // Hello World
