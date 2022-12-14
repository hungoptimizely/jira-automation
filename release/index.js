const core = require('@actions/core');
const { checkEnv, run } = require('../utils');
const { createJiraRelease } = require('./jira-release');

const action = async () => {
  checkEnv(['JIRA_USERNAME', 'JIRA_PASSWORD']);

  const protocol = core.getInput('jira-protocol', { required: true });
  const host = core.getInput('jira-host', { required: true });
  const projectKey = core.getInput('jira-project', { required: true });
  const component = core.getInput('jira-component') || '';
  const package  = core.getInput('jira-package') || '';
  const version = core.getInput('version', { required: true });
  const versionSuffix = core.getInput('versionSuffix') || '';

  await createJiraRelease({
    protocol,
    host,
    projectKey,
    component,
    version,
    package,
    versionSuffix
  });
};

if (require.main === module) {
  run(action);
}

module.exports = action;
