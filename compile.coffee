PEG = require 'pegjs'
fs = require 'fs'

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
  # TODO
  compileExpression = (expr) ->
    switch expr
      when 'INDENT' then "{"
      when 'DEDENT' then "}"
      when null then "null"
      else
        switch expr.tag
          when 'integer' then expr.value
          when 'string' then "\"#{expr.value}\""
          when 'match' then compileExpression expr.value
          when 'symbol' then expr.value
          when 'application' then "#{expr.name}(#{compileExpression expr.param})"
          when 'definition' then "var #{expr.name} = function() {\n#{compileDefinition expr.param, expr.value}\n}"
          else "TODO"

  compileDefinition = (param, value) ->
    compileExpression value


  compiled = (compileExpression expression for expression in ast)
  compiled.join "\n"

grammerFile = process.argv[2]
console.log "grammerFile=#{grammerFile}"

exports.parse grammerFile, (ast) ->
  console.log "ast=#{JSON.stringify ast, null, ' '}"
  jscode = exports.compileToJS ast
  console.log "javascript=#{jscode}"
