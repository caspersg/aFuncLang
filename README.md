# lamj (LAMbdas for Javascript)

an experimental, purely functional, language that transpiles to javascipt

functions, maps, objects, conditionals and modules can all be represented as functions,
using haskell like syntax for functions and pattern matching in javascript

I want to explore deriving as much of a useful language as I can from the simplest constructs

## features
- purely functional (unless using imported javascript)
- dynamic typing (just javascript)
- significant whitespace
- left associative function application using whitespace
- curried functions
- limited pattern matching in function definitions
- as much as possible of the language is written in itself
- basic functional tools, map, foldr, cons etc


## built in constructs
only very simple constructs are built in

- string
- number
- boolean
- lambda
- pattern match, with keys method
- function application
- assignment
- basic comparison equal lessThan lessThanEqual
- basic maths +-*/%
- string concat (+)
- string parse
- curry/uncurry


## derived constructs
all other constructs are written in the language itself

- and or not xor
- cons head tail last
- map
- foldr foldl
- filter any all append concat
- most combinators compose identity etc


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
- compile to other languages: groovy, ruby, python, perl?
- use actual javascript array/list. better performance and not restricted by max stack depth.
- performance (lowest priority)
- pretty javascript compiled code (not likely ever)
