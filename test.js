module.exports = function() {
  if (arguments[0] == "x") {
    return function() {
      1
    }
  },
  if (arguments[0] == "xyz") {
    return function() {
      2
    }
  },
  if (arguments[0] == "one") {
    return function() {
      {
        if (arguments[0] == "too") {
          return function() {
            33
          }
        }
      }
    }
  },
  if (arguments[0] == "three") {
    return function() {
      {
        if (arguments[0] == "three") {
          return function() {
            {
              if (arguments[0] == "again") {
                return function() {
                  33
                }
              }
            }
          }
        }
      }
    }
  },
  if (arguments[0] == "string") {
    return function() {
      "this is a string!"
    }
  },
  if (arguments[0] == "id") {
    return function(param) {
      param
    }
  },
  if (arguments[0] == "string_map") {
    return function() {
      {
        if (arguments[0] == "key") {
          return function() {
            4
          }
        }
      }
    }
  },
  if (arguments[0] == "map") {
    return function() {
      {
        if (arguments[0] == "key") {
          return function() {
            4
          }
        }
      }
    }
  },
  if (arguments[0] == "y") {
    return function() {
      {
        if (arguments[0] == "z") {
          return function() {
            6
          }
        },
        if (arguments[0] == "v") {
          return function() {
            7
          }
        },
        if (arguments[0] == "w") {
          return function(arg) {
            8
          }
        }
      }
    }
  },
  if (arguments[0] == "p") {
    return function() {
      9
    }
  }
}
"string"
123
module.exports(x)
module.exports(id("value"))
module.exports(string_map("key"))
module.exports(map(key))
module.exports(int_map(123))
module.exports(one(too))
module.exports(y(z))
module.exports(y(w("something")))
module.exports(p)