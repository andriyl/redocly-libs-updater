const { exec } = require('child_process')
const libName = 'redoc'
const commands = `cd tmp && yarn && yarn add ${libName}`
module.exports = () => exec(commands).stdout.on('data', console.log)
