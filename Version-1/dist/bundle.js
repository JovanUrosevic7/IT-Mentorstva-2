/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domaci.ts"
/*!***********************!*\
  !*** ./src/domaci.ts ***!
  \***********************/
() {

eval("{\nconst orders = [];\nfunction addOrder(name, locationString, zip, productName, amount, currency) {\n  const splitName = name.split(\" \");\n  const splitLocation = locationString.split(\" \");\n  return {\n    firstName: splitName[0],\n    lastName: splitName[1],\n    city: splitLocation[0],\n    country: splitLocation[1],\n    zip,\n    productName,\n    amount,\n    currency\n  };\n}\nconst singleOrder = addOrder(\"Uros Mikic\", \"Bograd Srbija\", 11e3, \"Monitor\", 2, \"EUR\");\nconst secondOrder = addOrder(\"Mihajlo Katic\", \"Bograd Srbija\", 11e3, \"Monitor\", 2, \"EUR\");\norders.push(singleOrder, secondOrder);\nfunction listOrders(orders2) {\n  orders2.forEach(function(a, b) {\n    console.log(a, b);\n  });\n}\nlistOrders(orders);\n\n\n//# sourceURL=webpack://version-1/./src/domaci.ts?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	let __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/domaci.ts"]();
/******/ 	
/******/ })()
;