
start
  = def 

def = name:symbol ":" expr:expr { return name = () -> expr } 

symbol = [a-zA-Z_]

expr = integer

integer = [0-9]+

// optional whitespace
_  = [ \t\r\n]* { return }
