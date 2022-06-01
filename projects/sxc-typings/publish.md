# Publishing Instructions

1. First generate the latest typings, by running the `generate` npm script
1. Then update the version number in this package here
1. probably do some dry-runs or beta releases
1. Then finally publish

## How it Works

Basically there are a few things necessary to work

1. The `typings.cmd` will clean the target folder
1. Then it will call `tsc` to generate the typings
1. To make it work, there is a `tsconfig.json` in this folder, which expands on the main `tsconfig.json` of $2sxc

## Dependencies

Because some old APIs still have some jQuery in it, we need to have these imported into this project so the build works. 