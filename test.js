const test = require('tape')
const lib = require('.')
const Manifest = lib.Manifest
const fs = require('fs')

test('get a value from the manifest file', (t) => {
  t.plan(1)
  withManifestCopiedFrom('examples/simple-example-manifest.json', (manifestPath) => {
    let manifest = new Manifest({
      path: manifestPath
    })

    manifest.translate('index.js').then((val) => {
      t.equal(val, 'build/index-1291928chcjfj.js', 'Get the correct value from the file')
    }).catch((err) => {
      t.error(err, 'Getting the file should not return an error')
    })
  })
})

test('write a value to a non-existing manifest file', (t) => {
  t.plan(1)
  withEmptyManifest((manifestPath) => {
    let writeManifest = new Manifest({
      path: manifestPath
    })

    writeManifest.add({ 'frontend.js': 'frontend-123.js' }).then(() => {
      let readManifest = new Manifest({
        path: manifestPath
      })

      readManifest.translate('frontend.js').then((val) => {
        t.equal(val, 'frontend-123.js', 'Get the correct value from the file')
      }).catch((err) => {
        t.error(err, 'Reading the file should not return an error')
      })
    }).catch((err) => {
      t.error(err, 'Writing to the file should not return an error')
    })
  })
})

test('write a value to an existing manifest file', (t) => {
  t.plan(2)
  withManifestCopiedFrom('examples/simple-example-manifest.json', (manifestPath) => {
    let writeManifest = new Manifest({
      path: manifestPath
    })

    writeManifest.add({ 'frontend.js': 'frontend-123.js' }).then(() => {
      let readManifest = new Manifest({
        path: manifestPath
      })

      readManifest.translate('index.js').then((val) => {
        t.equal(val, 'build/index-1291928chcjfj.js', 'Get the correct value from the preexisting file')
      }).catch((err) => {
        t.error(err, 'Reading the file should not return an error')
      })

      readManifest.translate('frontend.js').then((val) => {
        t.equal(val, 'frontend-123.js', 'Get the correct value that was added to the file')
      }).catch((err) => {
        t.error(err, 'Reading the file should not return an error')
      })
    }).catch((err) => {
      t.error(err, 'Writing to the file should not return an error')
    })
  })
})

function withEmptyManifest (cb) {
  let manifestPath = `/tmp/cachebusted-test-${Date.now()}.json`
  cb(manifestPath)
}

function withManifestCopiedFrom (original, cb) {
  let manifestPath = `/tmp/cachebusted-test-${Date.now()}.json`
  fs.createReadStream(original)
    .pipe(fs.createWriteStream(manifestPath))
  cb(manifestPath)
}
