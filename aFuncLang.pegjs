
start = line*

line = value:expression EOL { return value }

expression = value:atom { return value }
  / value:scope { return value }
  / value:definition { return value }
  / value:application { return value }

application = name:symbol _ param:param? { return { tag:"application", name:name, param:param } }

definition = name:symbol _ param:param? ":" _ value:expression { return { tag:"definition", name:name, param: param, value:value } }

param = value:symbol { return { tag:"symbol", value:value } }
  / value:atom { return { tag:"match", value:value } }

symbol = name:[a-zA-Z_]+ { return name.join("") }

scope = "(" value:expression ")" { return { tag:"scope", value:value } }

atom = value:integer { return { tag:"integer", value: value } }
  / value:string { return { tag:"string", value: value } }

string = quotation_mark chars:characters* quotation_mark { return chars.join("") }

characters = [\x20-\x21\x23-\x5B\x5D-\u10FFFF]

integer = digits:[0-9]+ { return parseInt(digits.join(""), 10) }

quotation_mark = '"'

// optional space
_  = [ ]* { return }

// mandatory whitespace
__ = [ ]+ { return }

EOL = "\r\n" / "\n" / "\r" { return }
