const json = require('./lib/json')

class Manifest {
  constructor ({ path }) {
    this.path = path
  }

  translate (key) {
    return json.readJSONFile(this.path).then((manifest) => {
      return manifest[key]
    })
  }

  add (addedManifest) {
    return json.readJSONFile(this.path).then((oldManifest) => {
      return json.writeJSONFile(
        this.path,
        Object.assign({}, oldManifest, addedManifest)
      )
    }).catch((err) => {
      if (err.code === 'ENOENT') {
        return json.writeJSONFile(this.path, addedManifest)
      } else {
        return Promise.reject(err)
      }
    })
  }
}

exports.Manifest = Manifest
