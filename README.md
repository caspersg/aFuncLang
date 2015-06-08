# lamj
lambdas for javascript.

an experimental, purely functional, language that transpiles to javascipt

functions, maps, objects, conditionals and modules can all be represented as functions,
using haskell like syntax for functions and pattern matching in javascript


## features
- purely functional (unless using imported javascript)
- dynamic typing (just javascript)
- significant whitespace
- left associative function application
- curried functions
- limited pattern matching in function definitions


## fibonacci implementation
```
fib=
  0:0
  1:1
  n: add (fib (subtract n 1)) (fib (subtract n 2))

fib 10
```

## TODO
- deal with js modules
- destructuring in pattern matching
- performance (lowest priority)
