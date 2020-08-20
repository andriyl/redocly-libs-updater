const { exec } = require('child_process')
const libName = 'redoc'
const commands = `cd tmp && yarn && yarn add ${libName}`

function execCommands(cmds) {
  return new Promise((resolve, reject) => {
    exec(cmds, (error, stdout, stderr) => {
      if (error) console.warn(error)
      resolve(stdout? stdout : stderr)
    })
  })
}

module.exports = () => execCommands(commands).then(console.log)
