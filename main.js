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

/***/ "./src/dataHandling.js":
/*!*****************************!*\
  !*** ./src/dataHandling.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"temptoC\": () => (/* binding */ temptoC),\n/* harmony export */   \"temptoF\": () => (/* binding */ temptoF),\n/* harmony export */   \"getWindP\": () => (/* binding */ getWindP),\n/* harmony export */   \"gettemp\": () => (/* binding */ gettemp)\n/* harmony export */ });\nfunction temptoC(temp) {\n  return Math.round(temp - 273.15)\n}\n\nfunction temptoF(temp) {\n  return Math.round((temp - 273.15) * (9/5) + 32)\n}\n\nfunction windDirection(degrees) {\n  switch (true) {\n    case (degrees < 45) : { return 'N 🡑' }\n    case (degrees < 90) : { return 'NE 🡕' }\n    case (degrees < 135) : { return 'E 🡒' }\n    case (degrees < 180) : { return 'SE 🡖' }\n    case (degrees < 225) : { return 'S 🡓' }\n    case (degrees < 270) : { return 'SW 🡗' }\n    case (degrees < 315) : { return 'W 🡐' }\n    case (degrees < 360) : { return 'NW 🡔' }\n  }\n  \n}\n\nfunction metersToMPH(speed) {\n  return Math.round(speed * 2.23694)\n}\n\nfunction getWindP(speed, deg) {\n  let para = ''\n  para = para.concat('Wind: ')\n\n  if (localStorage.getItem('wind-setting') == 'ms') {\n    para = para.concat(speed + ' M/s ')\n  } else {\n    para = para.concat(metersToMPH(speed) + 'MPH ')\n  }\n\n  para = para.concat(windDirection(deg))\n\n  return para\n}\n\nfunction gettemp(temp) {\n  let string = ''\n  if (localStorage.getItem('temp-setting') == 'f') {\n    string = string.concat(temptoF(temp) , '°', ' F')\n  } else if (localStorage.getItem('temp-setting') == 'c') {\n    string = string.concat(temptoC(temp) , '°', ' C')\n  } \n\n  return string\n}\n\n\n\n//# sourceURL=webpack://weather-app/./src/dataHandling.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dataHandling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataHandling */ \"./src/dataHandling.js\");\n\n\nconst apikey = 'fbbb97180ff8df65770a151ec3b87789'\nconst f = document.getElementById('f')\nconst c = document.getElementById('c')\nconst ms = document.getElementById('ms')\nconst mph = document.getElementById('mph')\nconst form = document.getElementById('form')\nconst notFound = document.getElementById('not-found')\n\nform.addEventListener('submit', (e)=>{\n  e.preventDefault()\n  buildPage(e.target.children[1].value)\n})\n\nif (localStorage.getItem('temp-setting') == null)  {\n  localStorage.setItem('temp-setting', 'f')\n} else {\n  if (localStorage.getItem('temp-setting') == 'f') {\n    c.classList.remove('bold')\n    f.classList.add('bold')\n  } else {\n    f.classList.remove('bold')\n    c.classList.add('bold')\n  }\n}\n\n\nif (localStorage.getItem('wind-setting') == null)  {\n  localStorage.setItem('wind-setting', 'mph')\n} else {\n  if (localStorage.getItem('wind-setting') == 'ms') {\n    mph.classList.remove('bold')\n    ms.classList.add('bold')\n  } else {\n    ms.classList.remove('bold')\n    mph.classList.add('bold')\n  }\n}\n\nif (localStorage.getItem('city') == null)  {\n  localStorage.setItem('city', 'portland')\n}\n\ndocument.getElementById('temp-setting').addEventListener('click', ()=>{\n  if (localStorage.getItem('temp-setting') == 'f') {\n    localStorage.setItem('temp-setting', 'c')\n    f.classList.remove('bold')\n    c.classList.add('bold')\n  } else {\n    localStorage.setItem('temp-setting', 'f')\n    c.classList.remove('bold')\n    f.classList.add('bold')\n  }\n\n  location.reload()\n})\n\ndocument.getElementById('wind-setting').addEventListener('click', ()=>{\n  if (localStorage.getItem('wind-setting') == 'mph') {\n    localStorage.setItem('wind-setting', 'ms')\n    mph.classList.remove('bold')\n    ms.classList.add('bold')\n  } else {\n    localStorage.setItem('wind-setting', 'mph')\n    ms.classList.remove('bold')\n    mph.classList.add('bold')\n  }\n\n  location.reload()\n})\n\nasync function getWeatherData(city) {\n  let data\n\n  try {\n    data = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apikey, {mode: 'cors'})\n    notFound.classList.add('hidden')\n    return data.json()\n  } catch (error) {\n    console.log('error in getWeatherData')\n  }\n}\n\nasync function buildPage(city) {\n  \n  try {\n    const data = await getWeatherData(city)\n    const header = document.getElementById('header')\n    const temperature = document.getElementById('temp')\n    const high = document.getElementById('high')\n    const low = document.getElementById('low')\n    const wind = document.getElementById('wind')\n    const humidity = document.getElementById('humidity')\n\n    localStorage.setItem('city', city)\n\n    header.innerHTML = '☁️ Weather in ' + data.name + ' ☁️'\n\n    temperature.innerHTML = 'Temperature Now: ' + (0,_dataHandling__WEBPACK_IMPORTED_MODULE_0__.gettemp)(data.main.temp)\n\n    high.innerHTML = 'High for Today: ' + (0,_dataHandling__WEBPACK_IMPORTED_MODULE_0__.gettemp)(data.main.temp_max)\n\n    low.innerHTML = 'Low for Today: ' + (0,_dataHandling__WEBPACK_IMPORTED_MODULE_0__.gettemp)(data.main.temp_min)\n    \n    wind.innerHTML = (0,_dataHandling__WEBPACK_IMPORTED_MODULE_0__.getWindP)(data.wind.speed, data.wind.deg)\n\n    humidity.innerHTML = 'Humidity: ' + data.main.humidity + '%'\n\n    notFound.classList.add('hidden')\n  } catch (error) {\n    console.log(error)\n    notFound.classList.remove('hidden')\n  }\n\n}\n\nbuildPage(localStorage.getItem('city'))\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;