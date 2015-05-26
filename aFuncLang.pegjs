
start
  = definition+

definition = name:symbol _ ":" _ value:expression _ { return { tag:"definition", name:name, value:value } }

symbol = name:[a-zA-Z_]+ { return name.join(""); }

expression = atom
  / definition

atom = value:integer { return { tag:"integer", value: value } }
  / value:string { return { tag:"string", value: value } }

string = quotation_mark chars:characters* quotation_mark { return chars.join("") }

characters = [\x20-\x21\x23-\x5B\x5D-\u10FFFF]

integer = digits:[0-9]+ { return parseInt(digits.join(""), 10); }

quotation_mark = '"'

// optional whitespace
_  = [ \t\r\n]* { return }
