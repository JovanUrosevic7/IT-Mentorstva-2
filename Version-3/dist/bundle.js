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

/***/ "./src/index.ts"
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
() {

eval("{\nvar Chat;\n((Chat2) => {\n  function send(message) {\n    console.log(\"Message was sent to chat: \" + message);\n  }\n  Chat2.send = send;\n})(Chat || (Chat = {}));\nvar Email;\n((Email2) => {\n  function send(message) {\n    console.log(\"Message was sent to email: \" + message);\n  }\n  Email2.send = send;\n})(Email || (Email = {}));\nChat.send(\"Test\");\nEmail.send(\"Test123\");\n\n\n//# sourceURL=webpack://version-3/./src/index.ts?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	let __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ 	
/******/ })()
;