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

eval("{\nconst myAccount = {\n  amount: 5e4,\n  accountName: \"Marko\",\n  blocked: false\n};\nfunction createBankAccount(data) {\n  return {\n    accountName: data.accountName,\n    amount: data.amount,\n    blockked: data.blocked\n  };\n}\nfunction updateBankAccount(data) {\n  return {\n    accountName: data.accountName ?? \"Unknown\",\n    amount: data.amount ?? 0\n  };\n}\nfunction createUser(data) {\n  return {\n    name: data.name,\n    email: data.email,\n    age: data.age\n  };\n}\nfunction updateUser(data) {\n  return {\n    name: data.name\n  };\n}\nconst user = {\n  name: \"Mihajlo\",\n  email: \"mihajlo@gmail.com\",\n  age: 22\n};\nfunction getField(data, key) {\n  return data[key];\n}\nconsole.log(getField(user, \"email\"));\n\n\n//# sourceURL=webpack://version-4/./src/index.ts?\n}");

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