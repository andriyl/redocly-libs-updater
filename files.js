const fetch = require('node-fetch')
const fs = require('fs')
const { promisify } = require('util')
const writeFilePromise = promisify(fs.writeFile)

const outputTempPath = './tmp'
const filePathPackage = outputTempPath +'/package.json'
const filePathLock = outputTempPath +'/yarn.lock'

const downloadFile = (workspace, repo_slug) => {
  // TODO: I hope we can use SDK here
  const downloadUrl = `https://api.bitbucket.org/2.0/repositories/${workspace}/${repo_slug}/src/master/package.json`
  return fetch(downloadUrl)
    .then(x => x.arrayBuffer())
    .then(x => writeFilePromise(filePathPackage, Buffer.from(x)))
}

const readFile = (path, opts = 'utf8') => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const readFilesToCommit = () => {
  return Promise.all([
    readFile(filePathLock),
    readFile(filePathPackage)
  ])
}

const createTempFolder = () => {
  if (!fs.existsSync(outputTempPath)) {
    fs.mkdirSync(outputTempPath)
  }
}

module.exports = {
  createTempFolder,
  downloadFile,
  readFilesToCommit
}
