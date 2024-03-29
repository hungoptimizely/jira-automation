# Build & Release action


Install vercel/ncc by running this command in your terminal.
```
npm i -g @vercel/ncc
```

Compile your index.js file.

```
ncc build index.js --license licenses.txt
```

From your terminal, commit the updates to your action.yml, dist/index.js, and node_modules files.
```
git add action.yml dist/index.js node_modules/*
git commit -m "Use vercel/ncc"
git tag -a -m "My first action release" v1.1
git push --follow-tags
```

# Git action template to create JIRA release

Gets the version number of a release branch such as release/1.2.3, then create JIRA release and update JIRA release note

This action should only be run on release branches. Here is a suggested usage with a check:

```yaml
name: Create Jira Release

on:
  create:
    branches:
      - 'release/*'
env:
  JIRA_USERNAME: ${{ secrets.JIRA_USERNAME }}
  JIRA_PASSWORD: ${{ secrets.JIRA_PASSWORD }}
jobs:
  jira-release:
    runs-on: windows-latest
    name: Get release version & create JIRA release
    steps:
      - name: Checkout repository
        uses: actions/checkout@v1

      - name: Get release version
        uses: hungoptimizely/jira-automation/releaseversion@v1
        id: branchVersion

      - name: Create JIRA release
        uses: hungoptimizely/jira-automation/release@v1
        with:
          jira-project: <Project key, e.g.: GA, AFORM,...>
          jira-package: <Package name, e.g.: EPiServer.GoogleAnalytics, EPiServer.Forms,...>
          jira-host: jira.sso.episerver.net
          version: ${{ steps.branchVersion.outputs.manifestSafeVersionString }}
```
# Result:
E.g.: 

EPiServer.GoogleAnalytics 1.2.3

EPiServer.Forms 1.2.3
