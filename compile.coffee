PEG = require 'pegjs'
fs = require 'fs'
beautify = require('js-beautify').js_beautify

toString = (x) -> JSON.stringify x, null, ' '

exports.getFile = (filename, callback) ->
  fs.readFile filename, 'utf8', (err,data) ->
    if err
      console.log err
    else
      callback data

exports.readStdIn = (callback) ->
  source = ""
  process.stdin.setEncoding 'utf8'
  process.stdin.on 'readable', ->
    chunk = process.stdin.read()
    if chunk != null
      source += chunk
  process.stdin.on 'end', -> callback source

exports.parse = (grammerFile, output) ->
  exports.getFile grammerFile, (grammer) ->
    parser = PEG.buildParser(grammer)
    exports.readStdIn (source) ->
      console.log "soure='#{source}'"
      try
        output parser.parse source.trim()
      catch e
        console.error e

exports.compileToJS = (ast) ->
  compileExpression = (expr) ->
    switch expr
      when null then ""
      else
        if expr?.tag
          switch expr.tag
            when 'integer' then expr.value
            when 'string' then expr.value
            when 'match' then compileExpression expr.value
            when 'symbol' then expr.value
            when 'application' then compileApplication expr
            when 'reference' then "#{expr.name}"
            when 'scope' then "(#{compileExpression expr.value})"
            when 'assignment' then compileAssignment expr
            when 'lambda' then compileLambdaGroup [expr]
            else "//TODO #{toString expr}"
        else "//ERROR tag=#{expr?.tag} expr=#{toString expr}"

  compileApplication = (app) ->
    if app.children
      rest = ("#{compileExpression e}" for e in app.children).join " "
    else
      rest = ""
    "(#{compileExpression app.func})#{rest}"

  compileAssignment = (assignment) ->
    "var #{assignment.name} = #{compileLambdaGroup assignment.children}"

  compileLambdaGroup = (lambdaList) ->
    "function(){ #{(compileLambda lambda for lambda in lambdaList).join " "} }"

  compileLambda = (lambda) ->
    children = (compileExpression child for child in lambda.children).join " "
    if lambda.param?.tag == 'match'
      "if(arguments[0] == #{lambda.param.value.value}) { return #{children} }"
    else if lambda.param?.tag == 'symbol'
      "var #{lambda.param.value} = arguments[0]; return #{children}"
    else
      "return #{children}"

  compiled = (compileExpression expression for expression in ast)
  expressions = compiled.join "\n"
  expressions

grammerFile = process.argv[2]
console.log "grammerFile=#{grammerFile}"

compiledJsFile = process.argv[3]

exports.parse grammerFile, (ast) ->
  console.log "ast=#{toString ast}"
  if compiledJsFile
    exports.getFile 'prelude.js', (prelude) ->
      compiled = prelude + exports.compileToJS(ast)
      jscode = beautify(compiled, { indent_size: 2 })
      console.log "javascript=#{jscode}"
      fs.writeFileSync compiledJsFile, jscode

