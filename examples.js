var assert = require('assert')
var curry = require('lodash.curry')

// basic maths
var jsPlus = function(x, y) {
  return x + y
}
var jsMinus = function(x, y) {
  return x - y
}
var jsMultiply = function(x, y) {
  return x * y
}
var jsDivide = function(x, y) {
  return x / y
}
var jsModulus = function(x, y) {
  return x % y
}

// boolean
//var and = function(x) { return function(y) { return x && y } }
//var or = function(x) { return function(y) { return x || y } }
//var not = function(x) { return ! x }

// comparisons
var jsLessThan = function(x, y) {
  return x < y
}
var jsLessThanEqual = function(x, y) {
  return x <= y
}
var jsEqual = function(x, y) {
  return x == y
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

// uncurry, to use with javascript libraries
// only curried functions can actually be called in lamj though
var uncurry = function(curriedFunc) {
    // returns a function which will, for each argument, call the curried function on each.
    // basically popping each curried argument, depending on the arguments called
    return function() {
      var func = curriedFunc;
      for (var i = 0, j = arguments.length; i < j; i++) {
        func = func(arguments[i]);
      }
      return func;
    }
  }
  // start prelude

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
var or = function() {
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
var and = function() {
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
var B = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return x((y(z)))
    }
  }
}
var B1 = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return function() {
        var w = arguments[0];
        return x((y(z)(w)))
      }
    }
  }
}
var B2 = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return function() {
        var w = arguments[0];
        return function() {
          var v = arguments[0];
          return x((y(z)(w)(v)))
        }
      }
    }
  }
}
var B3 = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return function() {
        var w = arguments[0];
        return x((y((z(w)))))
      }
    }
  }
}
var C = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return x(z)(y)
    }
  }
}
var D = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return function() {
        var w = arguments[0];
        return x(y)((z(w)))
      }
    }
  }
}
var D1 = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return function() {
        var w = arguments[0];
        return function() {
          var v = arguments[0];
          return x(y)(z)((w(v)))
        }
      }
    }
  }
}
var D2 = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return function() {
        var w = arguments[0];
        return function() {
          var v = arguments[0];
          return x((y(z)))((w(v)))
        }
      }
    }
  }
}
var E = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return function() {
        var w = arguments[0];
        return function() {
          var v = arguments[0];
          return x(y)((z(w)(v)))
        }
      }
    }
  }
}
var E1 = function() {
  var x = arguments[0];
  return function() {
    var y1 = arguments[0];
    return function() {
      var y2 = arguments[0];
      return function() {
        var y3 = arguments[0];
        return function() {
          var z1 = arguments[0];
          return function() {
            var z2 = arguments[0];
            return function() {
              var z3 = arguments[0];
              return x((y1(y2)(y3)))((z1(z2)(z3)))
            }
          }
        }
      }
    }
  }
}
var F = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return z(y)(x)
    }
  }
}
var G = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return function() {
        var w = arguments[0];
        return x(w)((y(z)))
      }
    }
  }
}
var H = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return x(y)(z)(y)
    }
  }
}
var HE = function() {
  var x = arguments[0];
  return HE
}
var I = function() {
  var x = arguments[0];
  return x
}
var J = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return function() {
        var w = arguments[0];
        return x(y)((x(w)(z)))
      }
    }
  }
}
var K = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return x
  }
}
var L = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return x((y(y)))
  }
}
var M = function() {
  var x = arguments[0];
  return x(x)
}
var O = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return y((x(y)))
  }
}
var Q = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return y((x(z)))
    }
  }
}
var Q1 = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return x((z(y)))
    }
  }
}
var Q3 = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return z((x(y)))
    }
  }
}
var R = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return y(z)(x)
    }
  }
}
var S1 = function() {
  var x = arguments[0];
  return x((S1(x)))
}
var S = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return x(z)((y(z)))
    }
  }
}
var T = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return y(x)
  }
}
var U = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return y((x(x)(y)))
  }
}
var V = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return z(x)(y)
    }
  }
}
var W = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return x(y)(y)
  }
}
var W1 = function() {
    var x = arguments[0];
    return function() {
      var y = arguments[0];
      return y(x)(x)
    }
  }
  // C*
var C1R = function() {
    var x = arguments[0];
    return function() {
      var y = arguments[0];
      return function() {
        var z = arguments[0];
        return function() {
          var w = arguments[0];
          return x(y)(w)(z)
        }
      }
    }
  }
  // C**
var C2R = function() {
    var x = arguments[0];
    return function() {
      var y = arguments[0];
      return function() {
        var z = arguments[0];
        return function() {
          var w = arguments[0];
          return function() {
            var v = arguments[0];
            return x(y)(z)(v)(w)
          }
        }
      }
    }
  }
  // W*
var W1R = function() {
    var x = arguments[0];
    return function() {
      var y = arguments[0];
      return function() {
        var z = arguments[0];
        return x(y)(z)(z)
      }
    }
  }
  // W**
var W2R = function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return function() {
      var z = arguments[0];
      return function() {
        var w = arguments[0];
        return x(y)(z)(w)(w)
      }
    }
  }
}


// derived from B
var D = B(B)
var E = B((B(B)(B)))
  // derived from B and T
var R = B(B)(T)
var C = R(R)(R)
var F = E(T)(T)(E)(T)
var V = B(C)(T)
var Q = C(B)
var Q1 = B(C)(B)
var Q3 = B(T)
var G = B(B)(C)
  // derived from B T M
  // double mockingbird
var DM = B(M)
var L = Q(M)
var W = C((B(M)(R)))
var W1 = C(W)
var H = B(W)((B(C)))
var S = B(W1R)(G)
var O = Q(Q)(W)
var U = L(O)
  // derived starred birds
var C1R = B(C)
var C2R = B(C1R)
var W1R = B(W)
var W2R = B(W1R)


// longer descriptive names
var Bluebird = B
var Blackbird = B1
var Buntings = B2
var Becard = B3
var Cardinal = C
var Dove = D
var Dickcissel = D1
var Dovekies = D2
var Eagle = E
var BaldEagle = E1
var Finch = F
var Goldfinch = G
var Hummingbird = H
var Identity = I
var Jay = J
var Kestrel = K
var Lark = L
var Mockingbird = M
var Owl = O
var QueerBird = Q
var QuixoticBird = Q1
var QuirkyBird = Q3
var Robin = R
var SageBird = S1
var Starling = S
var Thrush = T
var TuringBird = U
var Vireo = V
var Warbler = W
var ConverseWarbler = W1
var HopelesslyEgocentric = HE
var CardinalOnceRemoved = C1R
var CardinalTwiceRemoved = C2R
var WarblerOnceRemoved = C1R
var WarblerTwiceRemoved = W1R

// traditional names
var compose = B
var identity = I

// haskell map
//map f = foldr ((:) . f) []

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
var assertEqual = curry(assert.equal)
  // maths
var add = curry(jsPlus)
var subtract = curry(jsMinus)
var multiply = curry(jsMultiply)
var divide = curry(jsDivide)
var modulus = curry(jsModulus)
var min = curry(Math.min)
var max = curry(Math.max)
var pow = curry(Math.pow)
  // comparison
var lessThan = curry(jsLessThan)
var lessThanEqual = curry(jsLessThanEqual)
var equal = curry(jsEqual)
var greaterThan = not(lessThanEqual)
var greaterThanEqual = not(lessThan) // start examples

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

assert((equal(1)(1)))
assertEqual((add(1)(1)))(2)
assertEqual((add("ab")("cd")))("abcd")
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
B(assertEqual)(toInt)("1")(1)
assertEqual((toFloat("1.1")))(1.1)
assertEqual((toBool("true")))(true)
assertEqual((toBool("True")))(true)
assertEqual((toBool("false")))(false)
assertEqual((toBool("other stuff")))(false)

// assignment with a lambda, always wraps in a function,
// so _ to unwrap
// (ie apply that func with nothing)
// ie call with no arguments
var curried = function() {
  return compose((add(1)))((add(1)))
}
assertEqual((curried(null)(2)))(4)

// assignment without a lambda
var curried = compose((add(1)))((add(1)))
assertEqual((curried(2)))(4)
  // using combinator
var curried = B((add(1)))((add(1)))
B(assertEqual)(curried)(2)(4)

assertEqual((or(1)(2)))(1)
B1(assertEqual)(or)(1)(2)(1)
assertEqual((or(1)(null)))(1)
assertEqual((or(null)(2)))(2)
assertEqual((or(null)(null)))(null)

assertEqual((and(1)(2)))(true)
assertEqual((and(null)(2)))(false)
assertEqual((and(1)(null)))(false)
assertEqual((and(null)(null)))(false)

assertEqual((not(1)))(false)
assertEqual((not(null)))(true)

// some Math
assertEqual((min(1)(2)))(1)
assertEqual((max(1)(2)))(2)
assertEqual((pow(2)(4)))(8)

// try method calls on js object
// use . to trick lamj into thinking s.length is a variable
// only works on variable names
var s = "string"
var l = s.length

// try out the combinators

// just like B, but always returns _
var nil = function() {
  if (arguments[0] == "toString") {
    return "nil"
  }
  return nil
}
nil(nil)(nil)("something")

var uncurriedAdd = uncurry(function() {
  var x = arguments[0];
  return function() {
    var y = arguments[0];
    return add(x)(y)
  }
})

// last line can't be a comment, bug in the parser
null