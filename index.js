const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    // try {
        const gh_token = process.env.GITHUB_TOKEN
        const octokit = github.getOctokit(token=gh_token)
    
        if (!github.context.payload.pull_request) {
        throw new Error(
            "Payload doesn't contain `pull_request`. Make sure this Action is being triggered by a pull_request event (https://help.github.com/en/articles/events-that-trigger-workflows#pull-request-event-pull_request)."
        )
        }
        const title = github.context.payload.pull_request.title
        core.info(title)
    
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

        let label = [];
        for (const [key, value ] of Object.entries(prefix_map)) {
            if (title.startsWith(key)) {
                label.push(value)
                break
            }
        }

        if (label.length > 0) {
            await octokit.issues.addLabels({
                owner: github.context.repo.owner,
                repo: github.context.repo.repo,
                issue_number: github.context.payload.pull_request.number,
                labels: label
            })
        }
    // }
    // catch (error) {
    //     core.setFailed(error.message)
    // }
}

run()