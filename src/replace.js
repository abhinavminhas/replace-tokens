"use strict"

const fs = require('fs')

async function replaceTokens(files, replacements, delimiter = ',') {
  if (delimiter === null || delimiter === undefined || delimiter.length <= 0) {
    delimiter = ','
  } else {
    delimiter = delimiter.replace(/\s/g, '')
  }
  const fileNames = files.replace(/\s/g, '').split(delimiter)
  const replacementValues = replacements.replace(/\s/g, '').split(delimiter)
  console.log(`Total Files: ${fileNames.length}`)
  for (let file = 1; file <= fileNames.length; file++) {
    let fileName = fileNames[file - 1]
    console.log(`File ${file}: ${fileName}`)
    let result = ''
    try {
      result = fs.readFileSync(fileName, 'utf8')
      console.log(result)
    } catch (err) {
      throw err
    }
    for (let i = 0; i < replacementValues.length; i++) {
      let keyValuePair = replacementValues[i].split('=')
      let key = keyValuePair[0]
      let value = keyValuePair[1]
      result = result.replace(key, value)
    }
    console.log(`File ${file} (Replaced): ${fileName}`)
    try {
      fs.writeFileSync(fileName, result, 'utf8')
    } catch (err) {
      throw err
    }
    console.log(result)
  }
  await delay(100)
}

const delay = millisecs => new Promise(resolve => setTimeout(resolve, millisecs))

module.exports = {
  replaceTokens
}