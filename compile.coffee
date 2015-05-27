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
      when null then "null"
      else
        if expr?.tag
          switch expr.tag
            when 'integer' then expr.value
            when 'string' then "\"#{expr.value}\""
            when 'match' then compileExpression expr.value
            when 'symbol' then expr.value
            when 'application' then compileApplication expr
            when 'definition' then compileDefinition expr
            when 'scope' then "(#{compileExpression expr.value})"
            else "//TODO #{JSON.stringify expr, null, ' '}"
        else "//ERROR tag=#{expr?.tag} expr=#{JSON.stringify expr, null, ' '}"

  compileApplication = (expr) ->
    if expr.sub
     "#{expr.name}().#{compileExpression expr.sub}"
    else if expr.param
     "#{expr.name}()( function() { return #{compileExpression expr.param} } )"
    else
     "#{expr.name}()"

  compileDefinition = (def) ->
    if def.children.length is 1 and def.children[0].tag isnt 'definition'
      children = compileExpression def.children[0]
    else
      children = "{ #{(compileExpression child for child in def.children)} }"
    if def.param && def.param.tag == 'match'
      "#{def.name}: function() {\nreturn {\n#{def.param.value.value}: #{children}}\n}"
    if def.param && def.param.tag == 'symbol'
      "#{def.name}: function(#{def.param.value}) {\nreturn #{children}\n}"
    else
      "#{def.name}: function() {\nreturn #{children}\n}"

  compiled = (compileExpression expression for expression in ast)
  expressions = compiled.join "\n"
  "module.exports = {\n#{expressions}\n}"

grammerFile = process.argv[2]
console.log "grammerFile=#{grammerFile}"

compiledJsFile = process.argv[3]

exports.parse grammerFile, (ast) ->
  console.log "ast=#{JSON.stringify ast, null, ' '}"
  if compiledJsFile
    jscode = beautify(exports.compileToJS(ast), { indent_size: 2 })
    console.log "javascript=#{jscode}"
    fs.writeFileSync compiledJsFile, jscode

