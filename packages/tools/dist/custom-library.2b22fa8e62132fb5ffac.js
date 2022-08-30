"use strict";
(self["webpackChunktools"] = self["webpackChunktools"] || []).push([["custom-library"],{

/***/ 159:
/*!*******************************!*\
  !*** ./src/custom-library.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "numToWord": () => (/* binding */ numToWord),
/* harmony export */   "wordToNum": () => (/* binding */ wordToNum)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ 266);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _num_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./num.json */ 447);



const numToWord = (num) => {
  return lodash__WEBPACK_IMPORTED_MODULE_0___default().reduce(
    numRef,
    (accum, ref) => {
      return ref.num === num ? ref.word : accum;
    },
    ''
  );
}

const wordToNum = (word) => {
  return lodash__WEBPACK_IMPORTED_MODULE_0___default().reduce(
    numRef,
    (accum, ref) => {
      return ref.word === word && word.toLowerCase() ? ref.num : accum;
    },
    -1
  );
}



/***/ }),

/***/ 266:
/*!*************************************************************************************!*\
  !*** external {"commonjs":"lodash","commonjs2":"lodash","amd":"lodash","root":"_"} ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = undefined;

/***/ }),

/***/ 447:
/*!**********************!*\
  !*** ./src/num.json ***!
  \**********************/
/***/ ((module) => {

module.exports = JSON.parse('[{"num":1,"word":"One"},{"num":2,"word":"Two"},{"num":3,"word":"Three"},{"num":4,"word":"Four"},{"num":5,"word":"Five"},{"num":0,"word":"Zero"}]');

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(159));
/******/ }
]);
//# sourceMappingURL=custom-library.2b22fa8e62132fb5ffac.js.map