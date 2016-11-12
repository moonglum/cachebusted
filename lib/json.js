const fs = require('fs')

exports.readJSONFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, fileContent) => {
      if (err) {
        return reject(err)
      }

      return resolve(JSON.parse(fileContent))
    })
  })
}

exports.writeJSONFile = (path, val) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path,
      JSON.stringify(val),
      (err) => {
        if (err) {
          return reject(err)
        }

        resolve()
      }
    )
  })
}
