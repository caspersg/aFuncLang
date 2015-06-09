# lamj (LAMbdas for Javascript)

an experimental, purely functional, language that transpiles to javascipt

functions, maps, objects, conditionals and modules can all be represented as functions,
using haskell like syntax for functions and pattern matching in javascript


## features
- purely functional (unless using imported javascript)
- dynamic typing (just javascript)
- significant whitespace
- left associative function application using whitespace
- curried functions
- limited pattern matching in function definitions
- basic functional tools, map, foldr, cons etc
- as much as possible of the language is written in itself


## fibonacci implementation
```
fib=
  0:0
  1:1
  n: add (fib (subtract n 1)) (fib (subtract n 2))

fib 10
```

## TODO
- destructuring in pattern matching
- compile to actual map/hash if all patterns are values, so that maps can be iterated over
- performance (lowest priority)
- use actual javascript array/list. better performance and not restricted by max stack depth.
