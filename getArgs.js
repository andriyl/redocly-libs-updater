const requiredArgv = [
  'repo_slug',
  'workspace',
  'branch'
]

// TODO: much better to use here a validator instead of running process.exit from loop :)

const getArgs = () => {
  let props = {}
  const args = process.argv.slice(2)
  if (requiredArgv.length !== args.length) {
    console.log('Error: Your have to input 3 parameters')
    process.exit(1)
  }

  for (let i = 0, len = args.length; i < len; i++) {
    const arg = args[i].split('=')
    if (!requiredArgv.includes(arg[0])) {
      console.log('parameter: ' + arg[0] + ' is not correct')
      process.exit(1)
    }
    props[arg[0]] = arg[1]
  }
  return props
}

module.exports = getArgs
