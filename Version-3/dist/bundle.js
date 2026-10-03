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
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _namespaces_BudgetTracker_BudgetTracker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./namespaces/BudgetTracker/BudgetTracker */ \"./src/namespaces/BudgetTracker/BudgetTracker.ts\");\n\n\nvar App;\n((App2) => {\n  function Init() {\n    _namespaces_BudgetTracker_BudgetTracker__WEBPACK_IMPORTED_MODULE_0__.BudgetTracker.Finances.addExpense(\"Tastatura\", \"300\");\n    _namespaces_BudgetTracker_BudgetTracker__WEBPACK_IMPORTED_MODULE_0__.BudgetTracker.Finances.addExpense(\"Mis\", \"200\");\n    _namespaces_BudgetTracker_BudgetTracker__WEBPACK_IMPORTED_MODULE_0__.BudgetTracker.UI.showBudgetExpenses();\n  }\n  App2.Init = Init;\n})(App || (App = {}));\nApp.Init();\n\n\n//# sourceURL=webpack://version-3/./src/index.ts?\n}");

/***/ },

/***/ "./src/namespaces/BudgetTracker/BudgetTracker.ts"
/*!*******************************************************!*\
  !*** ./src/namespaces/BudgetTracker/BudgetTracker.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BudgetTracker: () => (/* binding */ BudgetTracker)\n/* harmony export */ });\n\nvar BudgetTracker;\n((BudgetTracker2) => {\n  let Finances;\n  ((Finances2) => {\n    const SOTRAGE_KEY = \"expenses\";\n    function addExpense(expense, amount) {\n      const expenses = getAllExpenses();\n      if (expenseExist(expense, expenses)) {\n        return;\n      }\n      expenses.push({ expense, amount });\n      localStorage.setItem(SOTRAGE_KEY, JSON.stringify(expenses));\n    }\n    Finances2.addExpense = addExpense;\n    function expenseExist(expense, expenses) {\n      return expenses.some((e) => e.expense.toLowerCase() === expense.toLocaleLowerCase());\n    }\n    function getAllExpenses() {\n      const data = localStorage.getItem(SOTRAGE_KEY);\n      return data ? JSON.parse(data) : [];\n    }\n    Finances2.getAllExpenses = getAllExpenses;\n  })(Finances = BudgetTracker2.Finances || (BudgetTracker2.Finances = {}));\n  let UI;\n  ((UI2) => {\n    const getAllExpenses = BudgetTracker2.Finances.getAllExpenses;\n    function showBudgetExpenses() {\n      const data = getAllExpenses();\n      data.forEach((expense) => {\n        const budgetDiv = document.querySelector(\"#budgetDiv\");\n        budgetDiv.innerHTML += `<p>${expense.expense} - ${expense.amount}</p>`;\n      });\n    }\n    UI2.showBudgetExpenses = showBudgetExpenses;\n  })(UI = BudgetTracker2.UI || (BudgetTracker2.UI = {}));\n})(BudgetTracker || (BudgetTracker = {}));\n\n\n//# sourceURL=webpack://version-3/./src/namespaces/BudgetTracker/BudgetTracker.ts?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	let __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;