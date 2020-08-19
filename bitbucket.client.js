const { Bitbucket } = require('bitbucket')
const { auth } = require('./config')
const client = new Bitbucket({ auth })
module.exports = client
