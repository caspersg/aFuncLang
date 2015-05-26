
start
  = def+ 

def = name:symbol _ ":" _ value:expr _ { return { tag:"def", name:name, value:value } }

symbol = name:[a-zA-Z_]+ { return name.join(""); }

expr = value:integer { return { tag:"integer", value: value}}
  / def

integer = digits:[0-9]+ { return parseInt(digits.join(""), 10); }

// optional whitespace
_  = [ \t\r\n]* { return }
