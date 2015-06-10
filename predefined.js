var assert = require('assert')
var curry = require('lodash.curry')

// basic maths
var jsPlus = function(x,y) { return x + y }
var jsMinus = function(x,y) { return x - y }
var jsMultiply = function(x,y) { return x * y }
var jsDivide = function(x,y) { return x / y }
var jsModulus = function(x,y) { return x % y }

// boolean
//var and = function(x) { return function(y) { return x && y } }
//var or = function(x) { return function(y) { return x || y } }
//var not = function(x) { return ! x }

// comparisons
var jsLessThan = function(x,y) { return x < y }
var jsLessThanEqual = function(x,y) { return x <= y }
var jsEqual = function(x,y) { return x == y }

// string parsers
var toInt = function(s) { return parseInt(s, 10)}
var toFloat = function(s) { return parseFloat(s, 10)}
var toBool = function(s) { return s.toLowerCase() == "true" }

// uncurry, to use with javascript libraries
var uncurry2 = function(curriedFunc) {
  return function(a,b) {
    return curriedFunc(a)(b);
  }
}
