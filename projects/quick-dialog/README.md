# 2sxc Quick-Dialog

This is a UI component of 2sxc - a dialog which slides in from the bottom of the screen. It has these functions

1. Pick content-type, app, view etc.
1. Start the installer to auto-install packages (Content or Apps)
1. View / restore the history of items

## Technology

As of 2020-07 it's built using Angular 10 and Ivy.

## Build

The package is standalone, but when built will copy the result to a very specific path in `c:\`. The build scripts always use watchers.

For development (unminified) use: `npm run dev`

For production (minified with external source files) use: `npm run release`

## Source Maps

During development the source maps are used from the `dist/ng` folder. The release build changes to use source maps from `sources.2sxc.org`.
