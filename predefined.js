// basic maths
var add = function(x) { return function(y) { return x + y } }
var subtract = function(x) { return function(y) { return x - y } }

// boolean
var and = function(x) { return function(y) { return x && y } }
var or = function(x) { return function(y) { return x || y } }
var not = function(x) { return ! x }

// comparisons
var lessThan function(x) { return function(y) { return x < y } }
var lessThanEqual = function(x) { return function(y) { return x <= y } }
var equal = function(x) { return function(y) { return x == y } }
