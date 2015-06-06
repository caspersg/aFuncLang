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
  (id)("value")
var one = function() {
  if (arguments[0] == "too") {
    return 33
  }
}
var too = function() {
    return "too"
  }
  (one)((id)(too))
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
  (int_map)(123)
var string = function() {
  return "this is a string!"
}
var string_map = function() {
    if (arguments[0] == "key") {
      return 4
    }
  }
  (string_map)("key")
  (map)("key")
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
  (y)("z")
  (y)("w")
var p = function() {
  return 9
}
p
1 + 2
2 - 1
5 - 2 - 1
var rec = function() {
  if (arguments[0] == 1) {
    return 1
  }
  var x = arguments[0];
  return (rec)(x)
}
var fib = function() {
    if (arguments[0] == 0) {
      return 0
    }
    if (arguments[0] == 1) {
      return 1
    }
    var n = arguments[0];
    return (fib)(1)
  }
  ((y)("z"))
  (y)("z")("x")("w")