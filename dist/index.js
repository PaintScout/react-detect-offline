'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-detect-offline.cjs.production.min.js')
} else {
  module.exports = require('./react-detect-offline.cjs.development.js')
}
