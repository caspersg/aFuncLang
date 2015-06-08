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
  //lisp list definition
  //(define (cons x y)
  //  (lambda (m) (m x y)))
  //(define (car z)
  //  (z (lambda (p q) p)))
  //(define (cdr z)
  //  (z (lambda (p q) q)))

var cons = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var m = arguments[0];
      return m(x)(y)
    }
  }
}
var head = function() {
  var z = arguments[0];
  return z((function() {
    var p = arguments[0];
    return function() {
      var q = arguments[0];
      return p
    }
  }))
}
var tail = function() {
  var z = arguments[0];
  return z((function() {
    var p = arguments[0];
    return function() {
      var q = arguments[0];
      return q
    }
  }))
}
var compose = function() {
  var fa = arguments[0];
  return function() {
    var fb = arguments[0];
    return function() {
      var x = arguments[0];
      return fa((fb(x)))
    }
  }
}
var map = function() {
  var f = arguments[0];
  return foldr((compose(cons)(f)))(null)
}
var foldl = function() {
  var f = arguments[0];
  return function() {
    var z = arguments[0];
    return function() {
      if (arguments[0] == null) {
        return z
      }
      var l = arguments[0];
      return foldl(f)((f(z)((head(l)))))((tail(l)))
    }
  }
}
var foldr = function() {
  var f = arguments[0];
  return function() {
    var z = arguments[0];
    return function() {
      if (arguments[0] == null) {
        return z
      }
      var l = arguments[0];
      return f((head(l)))((foldr(f)(z)((tail(l)))))
    }
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
var intMap = function() {
  if (arguments[0] == 1) {
    return 2
  }
  if (arguments[0] == 3) {
    return 4
  }
  var x = arguments[0];
  return 10
}
intMap(123)
var string = function() {
  return "this is a string!"
}
var stringMap = function() {
  if (arguments[0] == "key") {
    return 4
  }
}
stringMap("key")
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
cons(1)(null)
cons(1)((cons(2)(null)))
head((cons(1)(null)))

var addTwo = function() {
  var n = arguments[0];
  return add(n)(2)
}
map(addTwo)((cons(1)((cons(2)(null)))))

// null/nothing
null

// multiple argument with pattern matching
var multiExpr = function() {
  var x = arguments[0];
  var t = function() {
    return add(t)(1)
  }
  var p = function() {
    return subtract(p)(3)
  }
  return compose(t)(p)(x)
}
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