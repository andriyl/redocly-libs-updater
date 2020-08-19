const { createBranch, makePullRequest, makeCommit } = require('./api')
const { createTempFolder, downloadFile } = require('./files')
const getPropsFromArgs = require('./getArgs')
const yarnUpdateScript = require('./yarn.update')

async function run() {
  try {
    const commitMessage = 'Update redoc lib version'
    const PRTitle = 'PR: update lib redoc'
    const props = getPropsFromArgs()

    const { data } = await createBranch(props)
    console.log(`====> branch: ${data.name} for repo: ${data.target.repository.name} has been created`)

    await createTempFolder()
    console.log(`====> temporary folder 'tmp' has been created`)

    await downloadFile(props.workspace, props.repo_slug)
    console.log(`====> file: package.json has been downloaded`)

    yarnUpdateScript()

    const commit = await makeCommit(props, commitMessage)
    console.log(`====> commit for repo has been added`)

    const pr = await makePullRequest(props, PRTitle)
    console.log(`====> PR for repo has been added`)
  }
  catch (err) {
    console.log(err)
    throw err
  }
}
run()
