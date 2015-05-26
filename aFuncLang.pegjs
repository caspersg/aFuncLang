
start
  = expression*

expression = value:atom _ { return value }
  / value:definition _ { return value }
  / value:scope _ { return value }

definition = name:symbol _ ":" _ value:expression { return { tag:"definition", name:name, value:value } }

symbol = name:[a-zA-Z_]+ { return name.join(""); }

scope = "(" value:expression ")" { return { tag:"scope", value:value } }

atom = value:integer { return { tag:"integer", value: value } }
  / value:string { return { tag:"string", value: value } }

string = quotation_mark chars:characters* quotation_mark { return chars.join("") }

characters = [\x20-\x21\x23-\x5B\x5D-\u10FFFF]

integer = digits:[0-9]+ { return parseInt(digits.join(""), 10); }

quotation_mark = '"'

// optional whitespace
_  = [ \t\r\n]* { return }
