var TickerTape =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var TickerTape_1 = __webpack_require__(/*! ./TickerTape */ 1);
	var Unscrambler_1 = __webpack_require__(/*! ./Unscrambler */ 2);
	exports.Unscrambler = Unscrambler_1.default;
	var StyledUnscrambler_1 = __webpack_require__(/*! ./StyledUnscrambler */ 37);
	exports.StyledUnscrambler = StyledUnscrambler_1.default;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TickerTape_1.default;


/***/ },
/* 1 */
/*!***************************!*\
  !*** ./src/TickerTape.ts ***!
  \***************************/
/***/ function(module, exports) {

	"use strict";
	var TickerTape = (function () {
	    function TickerTape(props) {
	        this.events = {
	            onUpdate: [],
	            beforeUpdate: [],
	            onComplete: []
	        };
	        this.scrambler = props.scrambler;
	        if (typeof props.el === "string") {
	            this.el = document.querySelector(props.el);
	        }
	        else {
	            this.el = props.el;
	        }
	    }
	    Object.defineProperty(TickerTape.prototype, "CurrentWord", {
	        get: function () {
	            return this.scrambler.CurrentWord;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TickerTape.prototype.runAllCallbacks = function (funs) {
	        for (var _i = 0, funs_1 = funs; _i < funs_1.length; _i++) {
	            var fun = funs_1[_i];
	            fun(this);
	        }
	    };
	    TickerTape.prototype.tick = function () {
	        this.runAllCallbacks(this.events.beforeUpdate);
	        this.scrambler.tick();
	        if (this.el) {
	            this.el.innerHTML = this.scrambler.CurrentWord;
	        }
	        this.runAllCallbacks(this.events.onUpdate);
	        if (this.scrambler.HasCompleted) {
	            this.runAllCallbacks(this.events.onComplete);
	        }
	    };
	    TickerTape.prototype.autoTick = function (time) {
	        time = time || 100;
	        this.tick();
	        if (this.scrambler.HasCompleted) {
	            return;
	        }
	        setTimeout(this.autoTick.bind(this, [time]), time);
	    };
	    TickerTape.prototype.preUpdate = function (callback) {
	        this.events.onUpdate.push(callback);
	        return this;
	    };
	    TickerTape.prototype.postUpdate = function (callback) {
	        this.events.beforeUpdate.push(callback);
	        return this;
	    };
	    TickerTape.prototype.onComplete = function (callback) {
	        this.events.onComplete.push(callback);
	        return this;
	    };
	    return TickerTape;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TickerTape;


/***/ },
/* 2 */
/*!****************************!*\
  !*** ./src/Unscrambler.ts ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var sample = __webpack_require__(/*! lodash/sample */ 3);
	var BaseScrambler_1 = __webpack_require__(/*! ./BaseScrambler */ 35);
	var Unscrambler = (function (_super) {
	    __extends(Unscrambler, _super);
	    function Unscrambler(targetWord, props) {
	        _super.call(this, targetWord, props);
	        var options = {
	            cyclesPerChar: 10,
	        };
	        Object.assign(options, props);
	        this.cyclesPerChar = options.cyclesPerChar;
	        this.currentLetter = 0;
	        this.currentCycle = 0;
	    }
	    Unscrambler.prototype.tick = function () {
	        if (this.currentCycle === this.cyclesPerChar) {
	            this.currentWord[this.currentLetter] = this.targetWord.charAt(this.currentLetter);
	            this.currentCycle = 0;
	            this.currentLetter++;
	        }
	        else {
	            this.currentWord[this.currentLetter] = sample(this.characterSet);
	            this.currentCycle++;
	        }
	        if (this.currentLetter === Math.max(this.targetWord.length, this.currentWord.length)) {
	            this.HasCompleted = true;
	        }
	    };
	    return Unscrambler;
	}(BaseScrambler_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Unscrambler;


/***/ },
/* 3 */
/*!****************************!*\
  !*** ./~/lodash/sample.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var arraySample = __webpack_require__(/*! ./_arraySample */ 4),
	    baseSample = __webpack_require__(/*! ./_baseSample */ 6),
	    isArray = __webpack_require__(/*! ./isArray */ 16);
	
	/**
	 * Gets a random element from `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.0.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to sample.
	 * @returns {*} Returns the random element.
	 * @example
	 *
	 * _.sample([1, 2, 3, 4]);
	 * // => 2
	 */
	function sample(collection) {
	  var func = isArray(collection) ? arraySample : baseSample;
	  return func(collection);
	}
	
	module.exports = sample;


/***/ },
/* 4 */
/*!**********************************!*\
  !*** ./~/lodash/_arraySample.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var baseRandom = __webpack_require__(/*! ./_baseRandom */ 5);
	
	/**
	 * A specialized version of `_.sample` for arrays.
	 *
	 * @private
	 * @param {Array} array The array to sample.
	 * @returns {*} Returns the random element.
	 */
	function arraySample(array) {
	  var length = array.length;
	  return length ? array[baseRandom(0, length - 1)] : undefined;
	}
	
	module.exports = arraySample;


/***/ },
/* 5 */
/*!*********************************!*\
  !*** ./~/lodash/_baseRandom.js ***!
  \*********************************/
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeFloor = Math.floor,
	    nativeRandom = Math.random;
	
	/**
	 * The base implementation of `_.random` without support for returning
	 * floating-point numbers.
	 *
	 * @private
	 * @param {number} lower The lower bound.
	 * @param {number} upper The upper bound.
	 * @returns {number} Returns the random number.
	 */
	function baseRandom(lower, upper) {
	  return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
	}
	
	module.exports = baseRandom;


/***/ },
/* 6 */
/*!*********************************!*\
  !*** ./~/lodash/_baseSample.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var arraySample = __webpack_require__(/*! ./_arraySample */ 4),
	    values = __webpack_require__(/*! ./values */ 7);
	
	/**
	 * The base implementation of `_.sample`.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to sample.
	 * @returns {*} Returns the random element.
	 */
	function baseSample(collection) {
	  return arraySample(values(collection));
	}
	
	module.exports = baseSample;


/***/ },
/* 7 */
/*!****************************!*\
  !*** ./~/lodash/values.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(/*! ./_baseValues */ 8),
	    keys = __webpack_require__(/*! ./keys */ 10);
	
	/**
	 * Creates an array of the own enumerable string keyed property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object ? baseValues(object, keys(object)) : [];
	}
	
	module.exports = values;


/***/ },
/* 8 */
/*!*********************************!*\
  !*** ./~/lodash/_baseValues.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(/*! ./_arrayMap */ 9);
	
	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}
	
	module.exports = baseValues;


/***/ },
/* 9 */
/*!*******************************!*\
  !*** ./~/lodash/_arrayMap.js ***!
  \*******************************/
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	module.exports = arrayMap;


/***/ },
/* 10 */
/*!**************************!*\
  !*** ./~/lodash/keys.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ 11),
	    baseKeys = __webpack_require__(/*! ./_baseKeys */ 28),
	    isArrayLike = __webpack_require__(/*! ./isArrayLike */ 32);
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}
	
	module.exports = keys;


/***/ },
/* 11 */
/*!************************************!*\
  !*** ./~/lodash/_arrayLikeKeys.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(/*! ./_baseTimes */ 12),
	    isArguments = __webpack_require__(/*! ./isArguments */ 13),
	    isArray = __webpack_require__(/*! ./isArray */ 16),
	    isBuffer = __webpack_require__(/*! ./isBuffer */ 17),
	    isIndex = __webpack_require__(/*! ./_isIndex */ 22),
	    isTypedArray = __webpack_require__(/*! ./isTypedArray */ 23);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;
	
	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = arrayLikeKeys;


/***/ },
/* 12 */
/*!********************************!*\
  !*** ./~/lodash/_baseTimes.js ***!
  \********************************/
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	module.exports = baseTimes;


/***/ },
/* 13 */
/*!*********************************!*\
  !*** ./~/lodash/isArguments.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ 14),
	    isObjectLike = __webpack_require__(/*! ./isObjectLike */ 15);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};
	
	module.exports = isArguments;


/***/ },
/* 14 */
/*!**************************************!*\
  !*** ./~/lodash/_baseIsArguments.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(/*! ./isObjectLike */ 15);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && objectToString.call(value) == argsTag;
	}
	
	module.exports = baseIsArguments;


/***/ },
/* 15 */
/*!**********************************!*\
  !*** ./~/lodash/isObjectLike.js ***!
  \**********************************/
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 16 */
/*!*****************************!*\
  !*** ./~/lodash/isArray.js ***!
  \*****************************/
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = isArray;


/***/ },
/* 17 */
/*!******************************!*\
  !*** ./~/lodash/isBuffer.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ 19),
	    stubFalse = __webpack_require__(/*! ./stubFalse */ 21);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
	
	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;
	
	module.exports = isBuffer;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/module.js */ 18)(module)))

/***/ },
/* 18 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 19 */
/*!***************************!*\
  !*** ./~/lodash/_root.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ 20);
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	module.exports = root;


/***/ },
/* 20 */
/*!*********************************!*\
  !*** ./~/lodash/_freeGlobal.js ***!
  \*********************************/
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	module.exports = freeGlobal;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 21 */
/*!*******************************!*\
  !*** ./~/lodash/stubFalse.js ***!
  \*******************************/
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 22 */
/*!******************************!*\
  !*** ./~/lodash/_isIndex.js ***!
  \******************************/
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	module.exports = isIndex;


/***/ },
/* 23 */
/*!**********************************!*\
  !*** ./~/lodash/isTypedArray.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ 24),
	    baseUnary = __webpack_require__(/*! ./_baseUnary */ 26),
	    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ 27);
	
	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
	
	module.exports = isTypedArray;


/***/ },
/* 24 */
/*!***************************************!*\
  !*** ./~/lodash/_baseIsTypedArray.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(/*! ./isLength */ 25),
	    isObjectLike = __webpack_require__(/*! ./isObjectLike */ 15);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}
	
	module.exports = baseIsTypedArray;


/***/ },
/* 25 */
/*!******************************!*\
  !*** ./~/lodash/isLength.js ***!
  \******************************/
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 26 */
/*!********************************!*\
  !*** ./~/lodash/_baseUnary.js ***!
  \********************************/
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}
	
	module.exports = baseUnary;


/***/ },
/* 27 */
/*!*******************************!*\
  !*** ./~/lodash/_nodeUtil.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ 20);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;
	
	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding('util');
	  } catch (e) {}
	}());
	
	module.exports = nodeUtil;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/module.js */ 18)(module)))

/***/ },
/* 28 */
/*!*******************************!*\
  !*** ./~/lodash/_baseKeys.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(/*! ./_isPrototype */ 29),
	    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ 30);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = baseKeys;


/***/ },
/* 29 */
/*!**********************************!*\
  !*** ./~/lodash/_isPrototype.js ***!
  \**********************************/
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	module.exports = isPrototype;


/***/ },
/* 30 */
/*!*********************************!*\
  !*** ./~/lodash/_nativeKeys.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(/*! ./_overArg */ 31);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);
	
	module.exports = nativeKeys;


/***/ },
/* 31 */
/*!******************************!*\
  !*** ./~/lodash/_overArg.js ***!
  \******************************/
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	module.exports = overArg;


/***/ },
/* 32 */
/*!*********************************!*\
  !*** ./~/lodash/isArrayLike.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(/*! ./isFunction */ 33),
	    isLength = __webpack_require__(/*! ./isLength */ 25);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}
	
	module.exports = isArrayLike;


/***/ },
/* 33 */
/*!********************************!*\
  !*** ./~/lodash/isFunction.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./isObject */ 34);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag || tag == proxyTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 34 */
/*!******************************!*\
  !*** ./~/lodash/isObject.js ***!
  \******************************/
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 35 */
/*!******************************!*\
  !*** ./src/BaseScrambler.ts ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Helper_1 = __webpack_require__(/*! ./Helper */ 36);
	var BaseScrambler = (function () {
	    function BaseScrambler(targetWord, props) {
	        var options = {
	            charSet: Helper_1.generateDefaultCharacterSet(),
	            startingWord: ""
	        };
	        options.startingWord = Helper_1.generateWordFromCharacterSet(targetWord.length, options.charSet);
	        Object.assign(options, props);
	        this.targetWord = targetWord;
	        this.characterSet = options.charSet;
	        this.currentWord = options.startingWord.split("");
	        this.HasCompleted = false;
	    }
	    Object.defineProperty(BaseScrambler.prototype, "CurrentWord", {
	        get: function () {
	            return this.currentWord.join("");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BaseScrambler.prototype.tick = function () {
	        this.currentWord = this.targetWord.split("");
	        this.HasCompleted = true;
	    };
	    return BaseScrambler;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BaseScrambler;


/***/ },
/* 36 */
/*!***********************!*\
  !*** ./src/Helper.ts ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var sample = __webpack_require__(/*! lodash/sample */ 3);
	function generateDefaultCharacterSet() {
	    var charSet = [];
	    for (var i = 33; i < 126; i++) {
	        charSet.push(String.fromCharCode(i));
	    }
	    return charSet;
	}
	exports.generateDefaultCharacterSet = generateDefaultCharacterSet;
	function generateWordFromCharacterSet(length, characterSet) {
	    var word = [];
	    for (var i = 0; i < length; i++) {
	        word.push(sample(characterSet));
	    }
	    return word.join("");
	}
	exports.generateWordFromCharacterSet = generateWordFromCharacterSet;


/***/ },
/* 37 */
/*!**********************************!*\
  !*** ./src/StyledUnscrambler.ts ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Unscrambler_1 = __webpack_require__(/*! ./Unscrambler */ 2);
	var default_1 = (function (_super) {
	    __extends(default_1, _super);
	    function default_1(targetWord, props) {
	        _super.call(this, targetWord, props);
	        var options = {
	            className: "currentLetter"
	        };
	        Object.assign(options, props);
	        this.className = options.className;
	    }
	    Object.defineProperty(default_1.prototype, "CurrentWord", {
	        get: function () {
	            return this.currentWord
	                .slice(0, this.currentLetter)
	                .concat("<span class=" + this.className + ">" + (this.currentWord[this.currentLetter] || "") + "</span>")
	                .concat(this.currentWord.slice(this.currentLetter + 1, this.currentWord.length)).join("");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return default_1;
	}(Unscrambler_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;


/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map