# Standard Readme

[![Contributor Covenant](https://img.shields.io/badge/contributor%20covenant-1.4-4C1161.svg?style=flat-square)](http://contributor-covenant.org/version/1/4)
[![Uses editorconfig](https://img.shields.io/badge/editorconfig--e0efef.svg?style=flat-square)](.editorconfig)
[![JS written in Standard style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)
[![Licensed under MIT](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](LICENSE)

> Map artifact names to cachebusted names

A manifest file is a JSON file that maps the name of an artifact to the path you can actually find it at. This is an important feature when you use cachebusting. This library helps you read and write these files.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Contribute](#contribute)
* [License](#license)

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
$ npm install cachebusted
```

## Usage

Initialize a new manifest file like this (the file doesn't need to exist yet):

```javascript
let manifest = new Manifest({
  path: '/path/to/a/manifest.json'
})
```

You can read from the file like this:

```javascript
manifest.translate('index.js').then((val) => {
  // val is now the cachebusted version of index.js
  console.log(val)
}).catch((err) => {
  // Don't forget to handle errors
})
```

You can now add entries to the file like this:

```javascript
writeManifest.add({ 'frontend.js': 'frontend-123.js' }).then(() => {
  // Do what you need to do next
}).catch((err) => {
  // Don't forget to handle errors
})
```

## Contribute

Bug reports and pull requests are welcome on GitHub at https://github.com/moonglum/cachebusted. You can find more information about contributing in the [CONTRIBUTING.md](CONTRIBUTING.md). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
