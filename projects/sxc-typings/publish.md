# Publish and Generate Documentation

This readme is called `publish.md` so it's not listed in npm on home. 

We're explaining how to do 2 things

1. Create the `@2sic.sxc-typings` package for NPM
1. Generate the documentation for 2sic-docs package

## 1. How to publish the Types @2sic.sxc-typings to NPM

1. First generate the latest typings, by running the `generate` npm script
1. Trim the latest typings, by running the `api-extractor` npm script
1. Then update the version number in this package here
1. probably do some dry-runs or beta releases
1. Then finally publish

### How it Works

Basically there are a few things necessary to work

1. The `typings.cmd` will clean the target folder
1. Then it will call `tsc` to generate the typings
1. To make it work, there is a `tsconfig.json` in this folder, which expands on the main `tsconfig.json` of $2sxc

### Dependencies

Because some old APIs still have some jQuery in it, we need to have these imported into this project so the build works. 

## 2. How to generate the documentation

This is controlled from the 2sxc-docs project and documented there. 

The only thing needed here is the `tsconfig.typedoc.json` file, which is in this folder