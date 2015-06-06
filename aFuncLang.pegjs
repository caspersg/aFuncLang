// whitespace indent from http://stackoverflow.com/questions/11659095/parse-indentation-level-with-peg-js
// do not use result cache, nor line and column tracking

{ var indentStack = [], indent = ""; var log = function(object) { console.log(JSON.stringify(object,null," ")) } }

start
  = INDENT? l:line*
    { return l; }

line
  = SAMEDENT line:(!EOL c:expression { return c; })+ EOL?
    children:( INDENT c:line* DEDENT { return c; })?
      {
        var filtered = [].concat(line[0].children, children).filter(function(n){ return n != undefined });
        line[0].children = filtered;
        return line[0];
      }

EOL
  = "\r\n"
  / "\n"
  / "\r"

SAMEDENT
  = i:[ \t]* 
    &{ return i.join("") === indent; }

INDENT
  = &(i:[ \t]+ &{ return i.length > indent.length; }
      {
        indentStack.push(indent);
        indent = i.join("");
        pos = offset;
      })

DEDENT
  = { indent = indentStack.pop(); }

expression
  = value:lambda { return value }
  / value:assignment { return value }
  / value:application { return value }
  / value:reference { return value }
  / value:arithmetic { return value }
  / value:atom { return value }
  / value:scope { return value }

reference
  = name:symbol
    { return { tag:"reference", name:name} }

application
  = name:reference list:(whitespace_expression)+
    { return { tag:"application", func:name, children:list} }
  / scope:scope list:(whitespace_expression)+
    { return { tag:"application", func:scope, children:list} }

whitespace_expression
  = __ value:expression
    { return value }

assignment
  = name:symbol _ "=" _ expression:expression?
    { return { tag:"assignment", name:name, children:[expression]} }

lambda
  = param:param? ":" _ expression:expression?
    { return { tag:"lambda", param:param, children:[expression]} }

param
  = value:symbol
    { return { tag:"symbol", value:value } }
  / value:atom
    { return { tag:"match", value:value } }

symbol
  = name:[a-zA-Z_]+
    { return name.join("") }

arithmetic
  = op:[+-]
    { return { tag:"arithmetic", op:op } }

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
    { return '"'+chars.join("")+'"' }

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
