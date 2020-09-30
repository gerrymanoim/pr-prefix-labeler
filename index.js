const core = require('@actions/core');
const github = require('@actions/github');
const yaml = require('js-yaml');

async function run() {
    try {
        const gh_token = process.env.GITHUB_TOKEN
        const octokit = github.getOctokit(token=gh_token)

        if (!github.context.payload.pull_request) {
        throw new Error(
            "Payload doesn't contain `pull_request`. Make sure this Action is being triggered by a pull_request event (https://help.github.com/en/articles/events-that-trigger-workflows#pull-request-event-pull_request)."
        )
        }

        const title = github.context.payload.pull_request.title.split(":", 1)[0]
        core.info(title)

        const prefixTitleSeparator = core.getInput('prefix-title-separator')
        const separatorBetweenPrefixes = core.getInput('separator-between-prefixes');
        const prefixes = title.split(prefixTitleSeparator, 0)[0].split(separatorBetweenPrefixes)

        core.info(prefixes)

        let prefix_map = {
            "API": "api",
            "BENCH": "bench",
            "BLD": "build",
            "BUG": "bug",
            "DEP": "deprecation",
            "DEV": "development",
            "DOC": "documentation",
            "ENH": "enhancement",
            "MAINT": "maintenance",
            "REV": "revert",
            "STY": "style",
            "TST": "test",
            "REL": "release",
        }

        const configPath = core.getInput('configuration-path', {required: false});

        if (configPath !== '') {
            try {
                const config = await fetchConent(octokit, configPath)
                prefix_map =  yaml.safeLoad(config)
            } catch (error) {
                if (error.status !== 404) {
                    throw error
                }
            }
        }
        core.info(prefix_map)

        let labels = [];
        for (let prefix in prefixes) {
            if (prefix in prefix_map) {
                labels.push(prefix)
            }
        }

        if (label.length > 0) {
            await octokit.issues.addLabels({
                owner: github.context.repo.owner,
                repo: github.context.repo.repo,
                issue_number: github.context.payload.pull_request.number,
                labels: labels
            })
        }
    }
    catch (error) {
        core.setFailed(error.message)
    }
}

async function fetchConent(client, repoPath) {
    const response = await client.repos.getContent({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        path: repoPath,
        ref: github.context.sha
      });

      return Buffer.from(response.data.content, response.data.encoding).toString();
}

run()
