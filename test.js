//TODO {
"tag": "assignment",
"name": "x",
"children": [
  null, {
    "tag": "lambda",
    "param": null,
    "children": [
      null, {
        "tag": "integer",
        "value": 1,
        "children": [
          null,
          null
        ]
      }
    ]
  }
]
}
//TODO {
"tag": "assignment",
"name": "xyz",
"children": [{
    "tag": "lambda",
    "param": null,
    "children": [{
      "tag": "integer",
      "value": 2
    }]
  },
  null
]
}
//TODO {
"tag": "assignment",
"name": "one",
"children": [
  null, {
    "tag": "string",
    "value": "too",
    "children": [
      null,
      null
    ]
  }
]
}
//TODO {
"tag": "assignment",
"name": "fun",
"children": [
  null, {
    "tag": "integer",
    "value": 1,
    "children": [
      null,
      null
    ]
  }, {
    "tag": "integer",
    "value": 3,
    "children": [
      null,
      null
    ]
  }, {
    "tag": "lambda",
    "param": {
      "tag": "symbol",
      "value": "x"
    },
    "children": [{
        "tag": "integer",
        "value": 10
      },
      null
    ]
  }
]
}
//TODO {
"tag": "assignment",
"name": "string",
"children": [
  null, {
    "tag": "lambda",
    "param": null,
    "children": [{
        "tag": "string",
        "value": "this is a string!"
      },
      null
    ]
  }
]
}
//TODO {
"tag": "assignment",
"name": "id",
"children": [
  null, {
    "tag": "lambda",
    "param": {
      "tag": "symbol",
      "value": "param"
    },
    "children": [{
        "tag": "application",
        "name": "param",
        "param": null
      },
      null
    ]
  }
]
}
//TODO {
"tag": "assignment",
"name": "string_map",
"children": [
  null, {
    "tag": "string",
    "value": "key",
    "children": [
      null,
      null
    ]
  }
]
}
//TODO {
"tag": "assignment",
"name": "y",
"children": [
  null, {
    "tag": "string",
    "value": "z",
    "children": [
      null,
      null
    ]
  }, {
    "tag": "string",
    "value": "v",
    "children": [
      null,
      null
    ]
  }, {
    "tag": "string",
    "value": "w",
    "children": [
      null,
      null
    ]
  }
]
}
//TODO {
"tag": "assignment",
"name": "p",
"children": [
  null, {
    "tag": "lambda",
    "param": null,
    "children": [{
        "tag": "integer",
        "value": 9
      },
      null
    ]
  }
]
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