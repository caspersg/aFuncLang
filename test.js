module.exports = {
  "string"
  123
  x: function() {
    return 1
  }
  x()
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
  id: function(param) {
    return param()
  }
  id()(function() {
    return "value"
  })
  string_map: function() {
    return 4
  }
  string_map()(function() {
    return "key"
  })
  map: function() {
    return {
      key: function() {
        return 4
      }
    }
  }
  map().key()
  int_map: function() {
    return 4
  }
  int_map()(function() {
    return 123
  })
  one().too()
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
  y().z()
  y().w()(function() {
    return "something"
  })
  p: function() {
    return 9
  }
}