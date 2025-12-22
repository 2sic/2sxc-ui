# 2sxc Quick-Dialog

## Installation

1. Put the 2sxc-ui folder inside C:\Projects\2sxc (it searches for the `2sxc-build.config.json` file)
1. Run `npm ci` inside the root of 2sxc-ui
1. Go to the desired project (eg. ...\2sxc-ui\projects\quick-dialog)
1. To run the website see Build instructions below
1. Add this param: `?debug=true` to your dev websites url

This is a UI component of 2sxc - a dialog which slides in from the bottom of the screen. It has these functions

1. Pick content-type, app, view etc.
1. Start the installer to auto-install packages (Content or Apps)
1. View / restore the history of items

## Technology

As of 2025-02-14 it's built using Angular 19.

## Development

1. Run `dev` and `dev-dist`
1. You can change something in the debug box in the template-picker and open your devsite with **?debug=true** to see it.

## Build

The package is standalone, but when built will copy the result to a very specific path in `c:\`. The build scripts always use watchers.

For development (unminified) use: `npm run dev`

For production (minified with external source files) use: `npm run release`

## Source Maps

During development the source maps are used from the `dist/quick-dialog` folder. The release build changes to use source maps from `sources.2sxc.org`.
