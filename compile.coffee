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
      #console.log "soure='#{source}'"
      try
        output parser.parse source
      catch e
        console.error e

exports.filterNull = (list) ->
  if list
    x for x in list when !!x and x isnt ""

exports.compileToJS = (ast) ->
  compileExpression = (expr) ->
    switch expr
      when null then ""
      else
        if expr?.tag
          switch expr.tag
            when 'number' then expr.value
            when 'string' then expr.value
            when 'bool' then expr.value
            when 'nothing' then "null"
            when 'match' then compileExpression expr.value
            when 'symbol' then expr.value
            when 'application' then compileApplication expr
            when 'reference' then "#{expr.name}"
            when 'scope' then "(#{compileExpression expr.value})"
            when 'assignment' then compileAssignment expr
            when 'exports' then compileExports expr
            when 'lambda' then compileLambdaGroup [expr]
            when 'comment' then "//#{expr.value}"
            when 'emptyLine' then ""
            else "//TODO #{toString expr}"
        else "//ERROR tag=#{expr?.tag} expr=#{toString expr}"

  compileApplication = (app) ->
    children = exports.filterNull app.children
    if children
      rest = ("#{compileExpression e}" for e in children).join " "
    else
      rest = ""
    if app.func
      "#{compileExpression app.func}#{rest}"
    else
      "(#{compileExpression app.next})#{rest}"

  compileAssignment = (assignment) ->
    children = exports.filterNull assignment.children
    if children && children[0]?.tag isnt "lambda"
      rest = compileExpression children[0]
    else
      rest = compileLambdaGroup children
    "var #{assignment.name} = #{rest}"

  compileExports = (assignment) ->
    children = exports.filterNull assignment.children
    "exports.#{assignment.name} = #{compileLambdaGroup children}"

  compileLambdaGroup = (lambdaList) ->
    keys = compileKeysFunction(lambdaList)
    values = (compileLambda lambda for lambda in lambdaList).join " "
    "function(){ #{keys} #{values} }"

  compileKeysFunction = (lambdaList) ->
    keys = (for lambda in lambdaList when lambda.param?.tag == 'match'
      lambda.param.value.value
    ).join ","
    "if(arguments[0] == \"keys\") { return [#{keys}]; }"

  compileLambdaBody = (children) ->
    if children && children[0]?.tag isnt "lambda"
      kids = (compileExpression child for child in children)
      filtered = exports.filterNull kids
      # last statement gets the return
      filtered[filtered.length-1] = "return #{filtered[filtered.length-1]}"
      rest = filtered.join " "
    else if children
      rest = "return #{compileLambdaGroup children}"

  compileLambda = (lambda) ->
    children = exports.filterNull lambda.children
    rest = compileLambdaBody children
    if lambda.param?.tag == 'match'
      "if(arguments[0] == #{lambda.param.value.value}) { #{rest} }"
    else if lambda.param?.tag == 'nothingMatch'
      "if(!arguments[0]) { #{rest} }"
    else if lambda.param?.tag == 'lambdaMatch'
      # variable defined in lambdaMatch must be available to rest of lambda
      lambdaVariableName = lambda.param.value.param.value
      # temp test function can get overwritten, only needed for if statement
      "var #{lambdaVariableName} = arguments[0];" +
        "var test=#{compileExpression lambda.param.value};" +
        " if(test(#{lambdaVariableName})) { #{rest} }"
    else if lambda.param?.tag == 'symbol'
      "var #{lambda.param.value} = arguments[0]; #{rest}"
    else if children
      "#{rest}"
    else
      ""

  compiled = (compileExpression expression for expression in ast)
  expressions = compiled.join "\n"
  expressions

grammerFile = process.argv[2]
#console.log "grammerFile=#{grammerFile}"

compiledJsFile = process.argv[3]

exports.parse grammerFile, exports.getPrelude, (preludeAst) ->
  #console.log "preludeAst=#{toString preludeAst}"
  fs.writeFileSync "prelude.ast", toString(preludeAst)
  exports.parse grammerFile, exports.readStdIn, (ast) ->
    #console.log "ast=#{toString ast}"
    fs.writeFileSync "compiled.ast", toString(ast)
    if compiledJsFile
      exports.getFile 'predefined.js', (predefined) ->
        compiled = predefined + exports.compileToJS(preludeAst) + exports.compileToJS(ast)
        jscode = beautify(compiled, { indent_size: 2 })
        #console.log "javascript=#{jscode}"
        fs.writeFileSync compiledJsFile, jscode

