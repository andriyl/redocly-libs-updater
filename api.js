const bitbucketClient = require('./bitbucket.client')
const { readFilesToCommit } = require('./files')

// TODO: props validation for all methods

const createBranch = ({ repo_slug, workspace, branch }) => {
  const props = {
    _body: {
      "name": branch,
      "target": {
        "hash": "master"
      }
    },
    repo_slug,
    workspace,
  }
  return bitbucketClient.refs.createBranch(props)
}

const makeCommit = async ({ repo_slug, workspace, branch }, message) => {
  const filesToCommit = await readFilesToCommit()
  const fileLock = filesToCommit[0]
  const filePackage = filesToCommit[1]
  const props = {
    repo_slug,
    workspace,
    _body: {
      'yarn.lock': fileLock,
      'package.json': filePackage,
      message,
      branch,
    }
  }
  return bitbucketClient.repositories.createSrcFileCommit(props)
}

const makePullRequest = ({ repo_slug, workspace, branch }, bodyTitle) => {
  const props = {
    repo_slug,
    workspace,
    _body: {
      "title": bodyTitle,
      "source": {
        "branch": {
          "name": branch
        }
      }
    }
  }
  return bitbucketClient.pullrequests.create(props)
}

module.exports = {
  makeCommit,
  createBranch,
  makePullRequest
}
