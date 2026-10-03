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

eval("{\nvar BudgetTracker;\n((BudgetTracker2) => {\n  let Finances;\n  ((Finances2) => {\n    function addExpense(expense, amount) {\n      const expenses = getAllExpenses();\n      expenses.push({ expense, amount });\n      localStorage.setItem(\"expenses\", JSON.stringify(expenses));\n    }\n    Finances2.addExpense = addExpense;\n    function getAllExpenses() {\n      const data = localStorage.getItem(\"expenses\");\n      return data ? JSON.parse(data) : [];\n    }\n    Finances2.getAllExpenses = getAllExpenses;\n  })(Finances = BudgetTracker2.Finances || (BudgetTracker2.Finances = {}));\n  let UI;\n  ((UI2) => {\n    const getAllExpences = BudgetTracker2.Finances.getAllExpenses;\n    function showBudgetExpenses() {\n      const data = getAllExpences();\n      data.forEach((expense) => {\n        const budgetDiv = document.querySelector(\"#budgetDiv\");\n        budgetDiv.innerHTML += `<p>${expense.expense} - ${expense.amount}</p>`;\n      });\n    }\n    UI2.showBudgetExpenses = showBudgetExpenses;\n  })(UI = BudgetTracker2.UI || (BudgetTracker2.UI = {}));\n})(BudgetTracker || (BudgetTracker = {}));\nBudgetTracker.Finances.addExpense(\"komp\", \"2000\");\nBudgetTracker.Finances.addExpense(\"mis\", \"200\");\nBudgetTracker.UI.showBudgetExpenses();\n\n\n//# sourceURL=webpack://version-3/./src/index.ts?\n}");

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