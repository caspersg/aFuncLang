var add = function(x) {
  return function(y) {
    return x + y
  }
}
var subtract = function(x) {
  return function(y) {
    return x - y
  }
}
"string"
123
var x = function() {
  return 1
}
x
var xyz = function() {
  return 2
}
var id = function() {
  var param = arguments[0];
  return param
}
id("value")
var one = function() {
  if (arguments[0] == "too") {
    return 33
  }
}
var too = function() {
  return "too"
}
one((too(null)))
var int_map = function() {
  if (arguments[0] == 1) {
    return 2
  }
  if (arguments[0] == 3) {
    return 4
  }
  var x = arguments[0];
  return 10
}
int_map(123)
var string = function() {
  return "this is a string!"
}
var string_map = function() {
  if (arguments[0] == "key") {
    return 4
  }
}
string_map("key")
var y = function() {
  if (arguments[0] == "z") {
    return 6
  }
  if (arguments[0] == "v") {
    return function() {
      var x = arguments[0];
      return x
    }
  }
  if (arguments[0] == "w") {
    return function() {
      if (arguments[0] == "arg") {
        return 8
      }
    }
  }
}
y("z")
y("w")
var p = function() {
  return 9
}
p
add(2)
subtract(1)
subtract(2)(1)

var rec = function() {
  if (arguments[0] == 1) {
    return 1
  }
  var x = arguments[0];
  return rec((subtract(x)(1)))
}
var fib = function() {
  if (arguments[0] == 0) {
    return 0
  }
  if (arguments[0] == 1) {
    return 1
  }
  var n = arguments[0];
  return add((fib((subtract(n)(1)))))((fib((subtract(n)(2)))))
}
subtract(2)(1)
var w = function() {
  return 4
}
var x = function() {
  var w = arguments[0];
  return 3
}
var z = function() {
  var x = arguments[0];
  return function() {
    var w = arguments[0];
    return 2
  }
}
var y = function() {
  var z = arguments[0];
  return function() {
    var x = arguments[0];
    return function() {
      var w = arguments[0];
      return 1
    }
  }
}
y("z")("x")("w")
y(z)(x)(w)
y
  (y)
  ("x")
  (y("z"))
  (y("z"))("x")
  ((y("z"))("x"))
  (((y("z"))("x"))("w"))
  ((y(z))(x))(w)

// a comment

var multi = function() {
  if (arguments[0] == 0) {
    return function() {
      if (arguments[0] == 1) {
        return "a"
      }
      var n = arguments[0];
      return "b"
    }
  }
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return "c"
  }
}