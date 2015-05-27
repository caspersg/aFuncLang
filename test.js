module.exports = {
  "string"
  123
  if (arguments[0] == "x") {
    return function() {
      1
    }
  }
  x()
  if (arguments[0] == "xyz") {
    return function() {
      2
    }
  }
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
  }
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
  }
  if (arguments[0] == "string") {
    return function() {
      "this is a string!"
    }
  }
  if (arguments[0] == "id") {
    return function(param) {
      param()
    }
  }
  id()(function() {
    return "value"
  })
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
  }
  string_map()(function() {
    return "key"
  })
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
  }
  map().key()
  int_map()(function() {
    return 123
  })
  one().too()
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
  }
  y().z()
  y().w()(function() {
    return "something"
  })
  if (arguments[0] == "p") {
    return function() {
      9
    }
  }
  p()
}