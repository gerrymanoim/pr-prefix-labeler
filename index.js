import { getInput, info } from '@actions/core';
import { getOctokit, context } from '@actions/github';

async function run() {
    const token = process.env.GITHUB_TOKEN
    const octokit = getOctokit(token)
  
    if (!context.payload.pull_request) {
    throw new Error(
        "Payload doesn't contain `pull_request`. Make sure this Action is being triggered by a pull_request event (https://help.github.com/en/articles/events-that-trigger-workflows#pull-request-event-pull_request)."
    )
    }
    const title = context.payload.pull_request.title
    info(title)
  
    let prefix_map = {
        "API": "api",
        "BENCH": "bench",
        "BLD": "build",
        "BUG": "bug",
        "DEP": "deprication",
        "DEV": "development",
        "DOC": "documentation",
        "ENH": "enhancement",
        "MAINT": "maintenance",
        "REV": "revert",
        "STY": "style",
        "TST": "test",
        "REL": "releasing", 
    }

    let label = null;
    for (const [key, value ] of Object.entries(prefix_map)) {
        if (title.startsWith(key)) {
            label = value
            break
        }
    }

    if (label !== null) {
        await octokit.issues.addLabels({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: context.payload.pull_request.number,
            labels: label
          })
    }
}

run()