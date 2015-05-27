var x = function() {
  return 1
}
var xyz = function() {
  return 2
}
var id = function() {
  var param = arguments[0];
  return param
}
}
var one = function() {
  if (arguments[0] == "too") {
    return 33
  }
}
var fun = function() {
  if (arguments[0] == 1) {
    return 2
  }
  if (arguments[0] == 3) {
    return 4
  }
  var x = arguments[0];
  return 10
}
}
var string = function() {
  return "this is a string!"
}
var string_map = function() {
  if (arguments[0] == "key") {
    return 4
  }
}
var y = function() {
  if (arguments[0] == "z") {
    return 6
  }
  if (arguments[0] == "v") {
    return 7
  }
  if (arguments[0] == "w") {
    return //TODO {
    "tag": "lambda",
    "param": {
      "tag": "match",
      "value": {
        "tag": "string",
        "value": "\"arg\""
      }
    },
    "children": [{
      "tag": "integer",
      "value": 8
    }]
  }
}
}
var p = function() {
  return 9
}
"string"
123
x
id("value")
string_map("key")
map(key)
int_map(123)
one(too)
y(z)
y(w("something"))
p