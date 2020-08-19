# redocly-libs-updater

# How to run script:

#### rename .env.example to .env
#### edit auth credentials

```sh
yarn
yarn run start repo_slug=my_repo workspace=my_space branch=redoc_update
```

## Required arguments to run script:
```sh
repo_slug: 'redocly-test-repo',
workspace: 'my_workspace',
branch: 'redoc-version-update_v_15'
```

## Required Scopes:
repository:write - Read and modify your repositories
