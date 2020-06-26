# pr-prefix-labeler 

For use with https://github.com/release-drafter/release-drafter.

Supported PR prefixes:

```
API: an (incompatible) API change
BENCH: changes to the benchmark suite
BLD: change related to building numpy
BUG: bug fix
DEP: deprecate something, or remove a deprecated object
DEV: development tool or utility
DOC: documentation
ENH: enhancement
MAINT: maintenance commit (refactoring, typos, etc.)
REV: revert an earlier commit
STY: style fix (whitespace, PEP8)
TST: addition or modification of tests
REL: related to releasing 
```

based off of https://numpy.org/devdocs/dev/development_workflow.html

Map to labels:

```
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
```

## Usage

```
name: "Pull Request Labeler"
on:
- pull_request

jobs:
  pr-labeler:
    runs-on: ubuntu-latest
    steps:
    - name: Label the PR
      uses: gerrymanoim/pr-prefix-labeler@v1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```