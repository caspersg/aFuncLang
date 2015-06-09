var assert = require('assert')

var assertEqual = function(actual) {
  return function(expected) {
    return assert.equal(actual, expected);
  }
}

// basic maths
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
var multiply = function(x) {
  return function(y) {
    return x * y
  }
}
var divide = function(x) {
  return function(y) {
    return x / y
  }
}
var modulus = function(x) {
  return function(y) {
    return x % y
  }
}

// boolean
var and = function(x) {
  return function(y) {
    return x && y
  }
}
var or = function(x) {
  return function(y) {
    return x || y
  }
}
var not = function(x) {
  return !x
}

// comparisons
var lessThan = function(x) {
  return function(y) {
    return x < y
  }
}
var lessThanEqual = function(x) {
  return function(y) {
    return x <= y
  }
}
var equal = function(x) {
  return function(y) {
    return x == y
  }
}

// string parsers
var toInt = function(s) {
  return parseInt(s, 10)
}
var toFloat = function(s) {
  return parseFloat(s, 10)
}
var toBool = function(s) {
  return s.toLowerCase() == "true"
}
var xor = function() {
  var a = arguments[0];
  return function() {
    var b = arguments[0];
    return or((and(a)((not(b)))))((and((not(a)))(b)))
  }
}
var implies = function() {
  var a = arguments[0];
  return function() {
    var b = arguments[0];
    return or((not(a)))(b)
  }
}
var equivilant = function() {
  var a = arguments[0];
  return function() {
    var b = arguments[0];
    return not((xor(a)(b)))
  }
}
var either = function() {
  if (!arguments[0]) {
    return function() {
      var b = arguments[0];
      return b
    }
  }
  var a = arguments[0];
  return function() {
    var b = arguments[0];
    return a
  }
}
var not = function() {
  if (!arguments[0]) {
    return true
  }
  var x = arguments[0];
  return false
}
var both = function() {
  if (!arguments[0]) {
    return function() {
      var b = arguments[0];
      return false
    }
  }
  var a = arguments[0];
  return function() {
    if (!arguments[0]) {
      return false
    }
    var b = arguments[0];
    return true
  }
}
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
      if (!arguments[0]) {
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
      if (!arguments[0]) {
        return z
      }
      var l = arguments[0];
      return f((head(l)))((foldr(f)(z)((tail(l)))))
    }
  }
}
var filter = function() {
  var p = arguments[0];
  return function() {
    if (!arguments[0]) {
      return null
    }
    var l = arguments[0];
    var test = function() {
      var l = arguments[0];
      return p((head(l)))
    };
    if (test(l)) {
      return cons((head(l)))((filter(p)((tail(l)))))
    }
    var l = arguments[0];
    return filter(p)((tail(l)))
  }
}
var append = function() {
  var xs = arguments[0];
  return function() {
    var ys = arguments[0];
    return foldr(cons)(ys)(xs)
  }
}
var concat = function() {
  if (!arguments[0]) {
    return null
  }
  var l = arguments[0];
  return append((head(l)))((concat((tail(l)))))
}
var filter = function() {
  var p = arguments[0];
  var test = function() {
    var x = arguments[0];
    var test = function() {
      var x = arguments[0];
      return p(x)
    };
    if (test(x)) {
      return function() {
        var xs = arguments[0];
        return cons(x)(xs)
      }
    }
    var x = arguments[0];
    return function() {
      var xs = arguments[0];
      return xs
    }
  }
  return foldr(test)(null)
}
var last = function() {
  if (!arguments[0]) {
    return null
  }
  var l = arguments[0];
  var test = function() {
    var l = arguments[0];
    return equal((tail(l)))(null)
  };
  if (test(l)) {
    return head(l)
  }
  var l = arguments[0];
  return last((tail(l)))
}
var any = function() {
  var p = arguments[0];
  return function() {
    if (!arguments[0]) {
      return false
    }
    var l = arguments[0];
    var test = function() {
      var l = arguments[0];
      return p((head(l)))
    };
    if (test(l)) {
      return true
    }
    var l = arguments[0];
    return filter(p)((tail(l)))
  }
}
var any = function() {
  var p = arguments[0];
  var test = function() {
    var x = arguments[0];
    var test = function() {
      var x = arguments[0];
      return p(x)
    };
    if (test(x)) {
      return function() {
        var xs = arguments[0];
        return or(x)(xs)
      }
    }
    var x = arguments[0];
    return function() {
      var xs = arguments[0];
      return false
    }
  }
  return foldr(test)(true)
}
var all = function() {
  var p = arguments[0];
  var test = function() {
    var x = arguments[0];
    var test = function() {
      var x = arguments[0];
      return p(x)
    };
    if (test(x)) {
      return function() {
        var xs = arguments[0];
        return and(x)(xs)
      }
    }
    var x = arguments[0];
    return function() {
      var xs = arguments[0];
      return false
    }
  }
  return foldr(test)(true)
}
var listM = function() {
  return null
}

// monads
// List monad
//  // unit :: a -> [a]
var listM_unit = function() {
  var x = arguments[0];
  return cons(x)(null)
}

// // bind :: (a -> [a]) -> ([a] -> [a])
var listM_bind = function() {
  var f = arguments[0];
  return function() {
    var l = arguments[0];
    return concat((map(f)(l)))
  }
}
var nothing = function() {
  if (arguments[0] == "isJust") {
    return false
  }
  if (arguments[0] == "fromJust") {
    return null
  }
}
var just = function() {
  var a = arguments[0];
  return function() {
    if (arguments[0] == "isJust") {
      return true
    }
    if (arguments[0] == "fromJust") {
      return a
    }
  }
}
var maybeM_unit = function() {
  var x = arguments[0];
  return just(x)
}

var maybeM_bind = function() {
  var f = arguments[0];
  return function() {
    var x = arguments[0];
    var test = function() {
      var x = arguments[0];
      return x("isJust")
    };
    if (test(x)) {
      return just((f((x("fromJust")))))
    }
    var n = arguments[0];
    return nothing
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

// a comment
cons(1)(null)
cons(1)((cons(2)(null)))
head((cons(1)(null)))

var addTwo = function() {
  var n = arguments[0];
  return add(n)(2)
}
var l = function() {
  return cons(1)((cons(2)(null)))
}
var x = function() {
  return map(addTwo)((l(null)))
}
assertEqual((head((x(null)))))(3)

// null/nothing
null


var ifThenElse = function() {
  var test = arguments[0];
  var test = function() {
    var test = arguments[0];
    return test
  };
  if (test(test)) {
    return function() {
      var then = arguments[0];
      return function() {
        var otherwise = arguments[0];
        return then
      }
    }
  }
  var x = arguments[0];
  return function() {
    var then = arguments[0];
    return function() {
      var otherwise = arguments[0];
      return otherwise
    }
  }
}
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
multiply(10.123)((add(2)(3.3)))

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
var complexMatch = function() {
  var x = arguments[0];
  var test = function() {
    var x = arguments[0];
    return subtract(x)(2)
  };
  if (test(x)) {
    return 0
  }
  var x = arguments[0];
  return x
}
var ltt = function() {
  var x = arguments[0];
  return lessThan(x)(2)
}
filter(ltt)((cons(1)((cons(2)(null)))))

last((cons(1)(null)))

any(ltt)((cons(1)((cons(2)(null)))))
any(ltt)((cons(2)((cons(2)(null)))))
assert((not((all(ltt)((cons(1)((cons(2)(null)))))))))
assert((all(ltt)((cons(1)((cons(1)(null)))))))

assert((equal((add("ab")("cd")))("abcd")))

// javascript modules
require("./predefined")

exports.myFunc = function() {
  return "nothing"
}

assertEqual((head((append((cons(1)(null)))((cons(2)(null)))))))(1)
assertEqual((head((tail((append((cons(1)(null)))((cons(2)(null)))))))))(2)

var listAddOne = function() {
  var x = arguments[0];
  return cons((add(x)(1)))(null)
}
assertEqual((head((listAddOne(1)))))(2)

assertEqual((head((listM_unit(1)))))(1)
assertEqual((head((listM_unit(1)))))((head((cons(1)(null)))))

compose(append)(map)(listAddOne)
append((map(listAddOne)))

var adder = function() {
  var l = arguments[0];
  return compose((listM_bind(listAddOne)))((listM_bind(listAddOne)))(l)
}
adder((listM_unit(1)))

assertEqual((head((listM_bind(listAddOne)((listM_unit(1)))))))(2)
assertEqual((head((listM_bind(listAddOne)((listM_bind(listAddOne)((listM_unit(1)))))))))(3)
assertEqual((head((compose((listM_bind(listAddOne)))((listM_bind(listAddOne)))((listM_unit(1)))))))(3)

assertEqual((head((adder((listM_unit(1)))))))(3)

assertEqual((nothing("isJust")))(false)
assertEqual((just(1)("isJust")))(true)

var addOne = function() {
  var x = arguments[0];
  return add(x)(1)
}
assertEqual((maybeM_unit(1)("isJust")))(true)
assertEqual((maybeM_unit(1)("fromJust")))(1)
assertEqual((maybeM_bind(addOne)((maybeM_unit(1)))("fromJust")))(2)
assertEqual((maybeM_bind(addOne)((maybeM_bind(addOne)((maybeM_unit(1)))))("fromJust")))(3)
assertEqual((compose((maybeM_bind(addOne)))((maybeM_bind(addOne)))((maybeM_unit(1)))("fromJust")))(3)
assertEqual((compose((maybeM_bind(addOne)))((maybeM_bind(addOne)))((nothing))("isJust")))(false)

var isTrue = function() {
  if (arguments[0] == true) {
    return true
  }
  if (arguments[0] == false) {
    return false
  }
  var x = arguments[0];
  return "other"
}
assertEqual((isTrue(true)))(true)
assertEqual((isTrue(false)))(false)
assertEqual((isTrue("true")))("other")
assertEqual((isTrue("false")))("other")
assertEqual((isTrue(null)))("other")

var truthy = function() {
  if (!arguments[0]) {
    return false
  }
  var x = arguments[0];
  var test = function() {
    var x = arguments[0];
    return x
  };
  if (test(x)) {
    return true
  }
}
assertEqual((truthy(true)))(true)
assertEqual((truthy("a")))(true)
assertEqual((truthy((cons(1)(null)))))(true)
assertEqual((truthy(" ")))(true)

assertEqual((truthy(false)))(false)
assertEqual((truthy(null)))(false)
assertEqual((truthy("")))(false)


assertEqual((toInt("1")))(1)
assertEqual((toFloat("1.1")))(1.1)
assertEqual((toBool("true")))(true)
assertEqual((toBool("True")))(true)
assertEqual((toBool("false")))(false)
assertEqual((toBool("other stuff")))(false)

// assignment with a lambda, always wraps in a function, so _ to unwrap (ie apply that func)
var curried = function() {
  return compose((add(1)))((add(1)))
}
assertEqual((curried(null)(2)))(4)

// assignment without a lambda
var curried = compose((add(1)))((add(1)))
assertEqual((curried(2)))(4)

assertEqual((either(1)(2)))(1)
assertEqual((either(null)(2)))(2)
assertEqual((either(null)(null)))(null)

assertEqual((both(1)(2)))(true)
assertEqual((both(null)(2)))(false)
assertEqual((both(null)(null)))(false)

assertEqual((not(1)))(false)
assertEqual((not(null)))(true)

assertEqual((or(1)(2)))(1)
assertEqual((or(null)(2)))(2)
assertEqual((or(null)(null)))(null)

var end = function() {
  return 1
}