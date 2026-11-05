# Repository scripts

This directory contains automation for the whole `2sxc-ui` repository. Project-specific build tools remain under `projects/`.

Use Git and a Node.js version compatible with the repository's dependency requirements. Run the following commands from the repository root.

## Pull

```sh
npm run pull
```

Pulls the current branch with rebase, temporarily stashing local changes and restoring them afterward. The stash remains as a backup. Ignored files and changes inside submodules are excluded. See [pull.mjs](pull.mjs) for implementation details and design decisions.

If a command fails, stop and inspect `git status` before retrying. The script prints the saved stash ID for recovery.

## Release

```sh
npm run ci-all
npm run release-all
```

Release builds the current working tree and copies artifacts to the configured build destinations. It does not pull updates. To pull and release, run `npm run pull` first and continue only if it succeeds.
