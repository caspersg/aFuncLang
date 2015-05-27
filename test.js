module.exports = {
  "string"
  123
  x: function() {
    return 1
  }
  x()(null)
  xyz: function() {
    return 2
  }
  one: function() {
    return {
      too: function() {
        return 33
      }
    }
  }
  three: function() {
    return {
      three: function() {
        return {
          again: function() {
            return 33
          }
        }
      }
    }
  }
  string: function() {
    return "this is a string!"
  }
  func: function(param) {
    return param()(null)
  }
  func()("value")
  string_map: function() {
    return 4
  }
  string_map()("key")
  map: function() {
    return {
      key: function() {
        return 4
      }
    }
  }
  map().key()(null)
  int_map: function() {
    return 4
  }
  int_map()(123)
  one().too()(null)
  y: function() {
    return {
      z: function() {
        return 6
      },
      v: function() {
        return 7
      },
      w: function(arg) {
        return 8
      }
    }
  }
  y().z()(null)
  y().w()("something")
  p: function() {
    return 9
  }
}