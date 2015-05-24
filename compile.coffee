PEG = require 'pegjs'
fs = require 'fs'

exports.getFile = (filename, callback) ->
  fs.readFile filename, 'utf8', (err,data) ->
    if err
      console.log err
    else
      callback data

grammerFile = process.argv[2]
console.log "grammerFile=#{grammerFile}"

exports.getFile grammerFile, (grammer) ->
  parser = PEG.buildParser(grammer)

  source = ""
  process.stdin.setEncoding 'utf8'
  process.stdin.on 'readable', ->
    chunk = process.stdin.read()
    if chunk != null
      source += chunk
  process.stdin.on 'end', ->
    console.log "soure='#{source}'"
    try
      output = parser.parse source
      console.log output
    catch e
      console.error e
