// whitespace indent from http://stackoverflow.com/questions/11659095/parse-indentation-level-with-peg-js
// do not use result cache, nor line and column tracking

{ var indentStack = [], indent = ""; }

start
  = INDENT? l:line
    { return l; }

line
  = SAMEDENT line:(!EOL c:expression { return c; })+ EOL?
    children:( INDENT c:line* DEDENT { return c; })?
    { var o = {}; o[line] = children; return children ? o : line.join(""); }

EOL
  = "\r\n"
  / "\n"
  / "\r"

SAMEDENT
  = i:[ \t]* &{ return i.join("") === indent; }

INDENT
  = &(i:[ \t]+ &{ return i.length > indent.length; }
      { indentStack.push(indent); indent = i.join(""); pos = offset; })

DEDENT
  = { indent = indentStack.pop(); }

expression
  = value:atom { return value }
  / value:scope { return value }
  / value:definition { return value }
  / value:application { return value }

application
  = name:symbol _ param:param?
    { return { tag:"application", name:name, param:param } }

definition
  = name:symbol _ param:param? ":"
    { return { tag:"definition", name:name, param: param} }

param
  = value:symbol
    { return { tag:"symbol", value:value } }
  / value:atom
    { return { tag:"match", value:value } }

symbol
  = name:[a-zA-Z_]+
    { return name.join("") }

scope
  = "(" value:expression ")"
    { return { tag:"scope", value:value } }

atom
  = value:integer
    { return { tag:"integer", value: value } }
  / value:string
    { return { tag:"string", value: value } }

string
  = quotation_mark chars:characters* quotation_mark
    { return chars.join("") }

characters
  = [\x20-\x21\x23-\x5B\x5D-\u10FFFF]

integer
  = digits:[0-9]+
    { return parseInt(digits.join(""), 10) }

quotation_mark
  = '"'

// optional space
_ 
  = [ ]*

// mandatory whitespace
__
  = [ ]+
