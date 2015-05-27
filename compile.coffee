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
          when 'definition' then compileDefinition expr
          when 'scope' then "(#{compileExpression expr.value})"
          else "//TODO #{JSON.stringify expr, null, ' '}"

  compileDefinition = (def) ->
    if def.param && def.param.tag == 'match'
      "#{def.name}: function() {\nreturn {\n#{def.param.value.value}: #{compileExpression def.value}}\n}"
    if def.param && def.param.tag == 'symbol'
      "#{def.name}: function(#{def.param.value}) {\nreturn #{compileExpression def.value}\n}"
    else
      "#{def.name}: function() {\nreturn #{compileExpression def.value}\n}"

  compiled = (compileExpression expression for expression in ast)
  expressions = compiled.join "\n"
  "module.exports = {\n#{expressions}\n}"

grammerFile = process.argv[2]
console.log "grammerFile=#{grammerFile}"

exports.parse grammerFile, (ast) ->
  console.log "ast=#{JSON.stringify ast, null, ' '}"
  jscode = exports.compileToJS ast
  console.log "javascript=#{jscode}"
