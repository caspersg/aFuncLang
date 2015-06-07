# lamj
lambdas for javascript.

an experimental, purely functional, language that transpiles to javascipt


functions, maps, objects, conditionals and modules can all be represented as functions,
using haskell like syntax for functions and pattern matching in javascript


## features
- dynamic typing (just javascript)
- significant whitespace
- left associative function application
- curried functions


## fibonacci implementation
```
fib=
  0:0
  1:1
  n: add (fib (subtract n 1)) (fib (subtract n 2))

fib 10
```

## TODO
- performance (lowest priority)
- floats
- string interpolation or just concatenation
- deal with js modules
