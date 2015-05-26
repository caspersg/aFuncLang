
start
  = def+ 

def = name:symbol _ ":" _ value:expr _ { return { tag:"def", name:name, value:value } }

symbol = name:[a-zA-Z_]+ { return name.join(""); }

expr = integer

integer = [0-9]+

// optional whitespace
_  = [ \t\r\n]* { return }
