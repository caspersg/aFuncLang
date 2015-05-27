/* Initializations */
// a stack to represent the current indent level
{
  function start(first, tail) {
    var done = [first[1]];
    for (var i = 0; i < tail.length; i++) {
      done = done.concat(tail[i][1][0])
      done.push(tail[i][1][1]);
    }
    return done;
  }

  var depths = [0];

  function indent(s) {
    var depth = s.length;

    if (depth == depths[0]) return [];

    if (depth > depths[0]) {
      depths.unshift(depth);
      return ["INDENT"];
    }

    var dents = [];
    while (depth < depths[0]) {
      depths.shift();
      dents.push("DEDENT");
    }

    if (depth != depths[0]) dents.push("BADDENT");

    return dents;
  }
}

/* The real grammar */
start   = first:line tail:(EOL line)* EOL? { return start(first, tail) }
line    = depth:indent s:text { return [depth, s] }
indent  = s:" "* { return indent(s) }

text = value:expression { return value }

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

EOL = "\r\n" / "\n" / "\r" { }
