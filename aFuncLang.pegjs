
start
  = def+ 

def = name:symbol _ ":" _ expr:expr _ { var name = function() { return expr; }; return name;}

symbol = [a-zA-Z_]+

expr = integer

integer = [0-9]+

// optional whitespace
_  = [ \t\r\n]* { return }
