PEG = require 'pegjs'
fs = require 'fs'
beautify = require('js-beautify').js_beautify

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
        output parser.parse source
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
            when 'string' then "\"#{expr.value}\""
            when 'match' then compileExpression expr.value
            when 'symbol' then expr.value
            when 'application' then compileApplication expr
            when 'assignment' then compileAssignment expr
            when 'scope' then "(#{compileExpression expr.value})"
            else "//TODO #{JSON.stringify expr, null, ' '}"
        else "//ERROR tag=#{expr?.tag} expr=#{JSON.stringify expr, null, ' '}"

  compileApplication = (expr) ->
    if expr.sub
     "#{expr.name}(#{compileExpression expr.sub})"
    else if expr.param
     "#{expr.name}(#{compileExpression expr.param})"
    else
     "#{expr.name}"

  compileAssignment = (assignment) ->
    "var #{assignment.name} = #{compileLambdaGroup assignment.children}"

  compileLambdaGroup = (lambdaList) ->
    "function(){ #{(compileLambda lambda for lambda in lambdaList).join " "} }"

  compileLambda = (lambda) ->
    children = (compileExpression child for child in lambda.children).join " "
    if lambda.param?.tag == 'match'
      "if(arguments[0] == #{lambda.param.value.value}) { return #{children} }"
    else if lambda.param?.tag == 'symbol'
      "var #{lambda.param.value} = arguments[0]; return #{children} }"
    else
      "return #{children}"

  compiled = (compileExpression expression for expression in ast)
  expressions = compiled.join "\n"
  expressions

grammerFile = process.argv[2]
console.log "grammerFile=#{grammerFile}"

compiledJsFile = process.argv[3]

exports.parse grammerFile, (ast) ->
  console.log "ast=#{JSON.stringify ast, null, ' '}"
  if compiledJsFile
    jscode = beautify(exports.compileToJS(ast), { indent_size: 2 })
    console.log "javascript=#{jscode}"
    fs.writeFileSync compiledJsFile, jscode

