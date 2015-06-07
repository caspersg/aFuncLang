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

exports.getPrelude = (callback) ->
  exports.getFile 'prelude.lamj', callback

exports.parse = (grammerFile, inputFunc, output) ->
  exports.getFile grammerFile, (grammer) ->
    parser = PEG.buildParser(grammer)
    inputFunc (source) ->
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
            when 'nothing' then "null"
            when 'match' then compileExpression expr.value
            when 'symbol' then expr.value
            when 'application' then compileApplication expr
            when 'reference' then "#{expr.name}"
            when 'scope' then "(#{compileExpression expr.value})"
            when 'assignment' then compileAssignment expr
            when 'lambda' then compileLambdaGroup [expr]
            when 'comment' then "//#{expr.value}"
            when 'emptyLine' then ""
            else "//TODO #{toString expr}"
        else "//ERROR tag=#{expr?.tag} expr=#{toString expr}"

  compileApplication = (app) ->
    if app.children
      rest = ("#{compileExpression e}" for e in app.children).join " "
    else
      rest = ""
    if app.func
      "#{compileExpression app.func}#{rest}"
    else
      "(#{compileExpression app.next})#{rest}"

  compileAssignment = (assignment) ->
    "var #{assignment.name} = #{compileLambdaGroup assignment.children}"

  compileLambdaGroup = (lambdaList) ->
    values = (compileLambda lambda for lambda in lambdaList).join " "
    "function(){ #{values} }"

  compileLambda = (lambda) ->
    if lambda.children && lambda.children[0].tag isnt "lambda"
      children = (compileExpression child for child in lambda.children).join " "
    else if lambda.children
      children = compileLambdaGroup lambda.children
    if lambda.param?.tag == 'match'
      "if(arguments[0] == #{lambda.param.value.value}) { return #{children} }"
    else if lambda.param?.tag == 'symbol'
      "var #{lambda.param.value} = arguments[0]; return #{children}"
    else if lambda.children
      "return #{children}"
    else
      ""

  compiled = (compileExpression expression for expression in ast)
  expressions = compiled.join "\n"
  expressions

grammerFile = process.argv[2]
console.log "grammerFile=#{grammerFile}"

compiledJsFile = process.argv[3]

exports.parse grammerFile, exports.getPrelude, (preludeAst) ->
  console.log "preludeAst=#{toString preludeAst}"
  fs.writeFileSync "prelude.ast", toString(preludeAst)
  exports.parse grammerFile, exports.readStdIn, (ast) ->
    console.log "ast=#{toString ast}"
    fs.writeFileSync "compiled.ast", toString(ast)
    if compiledJsFile
      exports.getFile 'predefined.js', (predefined) ->
        compiled = predefined + exports.compileToJS(preludeAst) + exports.compileToJS(ast)
        jscode = beautify(compiled, { indent_size: 2 })
        console.log "javascript=#{jscode}"
        fs.writeFileSync compiledJsFile, jscode

