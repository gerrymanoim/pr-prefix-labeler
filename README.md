# PR Prefix Labeler

For use with https://github.com/release-drafter/release-drafter.

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
      uses: gerrymanoim/pr-prefix-labeler@v3
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```

## Defaults

By default `PR PRefix Labeler` supports the following PR prefixes (via  https://numpy.org/devdocs/dev/development_workflow.html):

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
"API": "api"
"BENCH": "bench"
"BLD": "build"
"BUG": "bug"
"DEP": "deprecation"
"DEV": "development"
"DOC": "documentation"
"ENH": "enhancement"
"MAINT": "maintenance"
"REV": "revert"
"STY": "style"
"TST": "test"
"REL": "release"
```

## Configuration

Optionally, if you have a `configuration-path` (defaulting to `.github/pr-prefix-labeler.yml`), you can provide your own prefixes and mappings. For an example see https://github.com/gerrymanoim/pr-prefix-labeler/blob/master/.github/pr-prefix-labeler.yml.


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
