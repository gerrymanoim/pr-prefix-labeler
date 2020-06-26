# PR Prefix Labeler

For use with https://github.com/release-drafter/release-drafter.

Supported PR prefixes (via  https://numpy.org/devdocs/dev/development_workflow.html):

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

Each prefix maps to these PR labels:

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
"REL": "release", 
```

## Usage

```yaml
name: "Pull Request Labeler"
on:
- pull_request

jobs:
  pr-labeler:
    runs-on: ubuntu-latest
    steps:
    - name: Label the PR
      uses: gerrymanoim/pr-prefix-labeler@master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```

## Release Drafter Category Settings

You'll want something like this:

```yaml
categories:
  - title: 'API Changes'
    labels:
      - 'api'
  - title: 'Benchmark Changes'
    labels:
      - 'bench'
  - title: 'Build Changes'
    labels:
      - 'build'
  - title: 'Bug Fixes'
    labels:
      - 'bug'
  - title: 'Deprecation'
    labels:
      - 'deprication'
  - title: 'Development Enhancements'
    labels:
      - 'development'
  - title: 'Documentation Updates'
    labels:
      - 'documentation'
  - title: 'Enhancements'
    labels:
      - 'enhancement'
  - title: 'Maintenance'
    labels:
      - 'maintenance'
  - title: 'Reverts'
    labels:
      - 'revert'
  - title: 'Style Changes'
    labels:
      - 'style'
  - title: 'Test Changes'
    labels:
      - 'test'
  - title: 'Release Changes'
    labels:
      - 'release'
```