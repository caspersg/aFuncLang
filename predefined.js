var assert = require('assert')
var curry = require('lodash.curry')

// basic maths
var add = function(x) { return function(y) { return x + y } }
var subtract = function(x) { return function(y) { return x - y } }
var multiply = function(x) { return function(y) { return x * y } }
var divide = function(x) { return function(y) { return x / y } }
var modulus = function(x) { return function(y) { return x % y } }

// boolean
var and = function(x) { return function(y) { return x && y } }
var or = function(x) { return function(y) { return x || y } }
var not = function(x) { return ! x }

// comparisons
var lessThan = function(x) { return function(y) { return x < y } }
var lessThanEqual = function(x) { return function(y) { return x <= y } }
var equal = function(x) { return function(y) { return x == y } }

// string parsers
var toInt = function(s) { return parseInt(s, 10)}
var toFloat = function(s) { return parseFloat(s, 10)}
var toBool = function(s) { return s.toLowerCase() == "true" }
