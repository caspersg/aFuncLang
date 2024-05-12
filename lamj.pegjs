// whitespace indent from http://stackoverflow.com/questions/11659095/parse-indentation-level-with-peg-js
// do not use result cache, nor line and column tracking

{ var indentStack = [], indent = "";

  var log = function(object) { console.log(JSON.stringify(object,null," ")) }
}

start
  = INDENT? l:line*
    { return l; }

line
  = SAMEDENT line:(!EOL c:expression { return c; })+ EOL?
    children:( INDENT c:line* DEDENT { return c; })?
      {
        var filtered = [].concat(line[0].children, children).filter(function(n){ return n != undefined && n != null });
        line[0].children = filtered;
        return line[0];
      }
  / value:comment EOL { return value }
  / value:emptyLine EOL { return value }

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
  / value:atom { return value }
  / value:scope { return value }

part
  = value:lambda { return value }
  / value:assignment { return value }
  / value:reference { return value }
  / value:atom { return value }
  / value:scope { return value }
  / value:eval { return value }

reference
  = name:symbol
    { return { tag:"reference", name:name} }

eval
  = "`" name:symbol
    { return { tag:"eval", name:name} }

application
  = head:part tail:tail?
    { return {tag:"application", func:head, children:[tail] } }

tail
  = __ next:part tail:tail?
    { return {tag:"application", next:next, children:[tail] } }

assignment
  = "exports" _ name:symbol _ "=" _ expression:expression?
    { return { tag:"exports", name:name, children:[expression]} }
  / name:symbol _ "=" _ expression:expression?
    { return { tag:"assignment", name:name, children:[expression]} }

lambda
  = param:param? ":" _ expression:expression?
    { return { tag:"lambda", param:param, children:[expression]} }

param
  = value:valueAtom
    { return { tag:"match", value:value } }
  / "{" _ value:lambda _ "}"
    { return { tag:"lambdaMatch", value:value } }
  / value:symbol
    { return { tag:"symbol", value:value } }
  / value:nothing
    { return { tag:"nothingMatch", value:value } }

symbol
  = first:[a-zA-Z] name:[a-zA-Z0-9._]*
    { return first+name.join("") }

scope
  = "(" _ value:expression _ ")"
    { return { tag:"scope", value:value } }

atom
  = value:valueAtom
    { return value }
  / value:nothing
    { return value }

valueAtom
  = value:aFloat
    { return { tag:"number", value: value } }
  / value:integer
    { return { tag:"number", value: value } }
  / value:string
    { return { tag:"string", value: value } }
  / value:bool
    { return { tag:"bool", value: value } }

nothing
  = [_]
    { return { tag:"nothing", value: 'null' } }

string
  = quotation_mark chars:characters* quotation_mark
    { return '"'+chars.join("")+'"' }

characters
  = [\x20-\x21\x23-\x5B\x5D-\u10FFFF\\]

integer
  = digits:[0-9]+
    { return parseInt(digits.join(""), 10) }

aFloat
  = value:(integer "." integer)
    { return parseFloat(value.join(""), 10) }

bool
  = "true"
    { return true }
  / "false"
    { return false }

comment
  = "#" comment:[^\n\r]*
    { return { tag:"comment", value:comment.join("") } }

emptyLine
  = value:__*
    { return { tag:"emptyLine"} }

quotation_mark
  = '"'

EOL
  = "\r\n"
  / "\n"
  / "\r"

// optional space
_ 
  = [ ]*

// mandatory whitespace
__
  = [ ]+
