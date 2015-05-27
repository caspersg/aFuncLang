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
        line[0].children = [].concat(line[0].children, children);
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
  = value:atom { return value }
  / value:lambda { return value }
  / value:assignment { return value }
  / value:application { return value }

application
  = name:symbol _ sub:application
    { return { tag:"application", name:name, sub:sub } }
  / name:symbol _ param:param?
    { return { tag:"application", name:name, param:param } }

assignment
  = name:symbol _ "=" _ expression:expression?
    { return { tag:"assignment", name:name, children:[expression]} }

lambda
  = param:param? ":" _ expression:expression?
    { return { tag:"lambda", param: param, children:[expression]} }

param
  = value:symbol
    { return { tag:"symbol", value:value } }
  / value:atom
    { return { tag:"match", value:value } }

symbol
  = name:[a-zA-Z_.]+
    { return name.join("") }

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
