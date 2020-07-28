# 2sxc Quick-Dialog

This is a UI component of 2sxc - a dialog which slides in from the bottom of the screen. It has these functions

1. Pick content-type, app, view etc.
1. Start the installer to auto-install packages
1. View / restore the history of items

## Build

The package is standalone, but when built will copy the result to a very specific path in `c:\`. The build scripts always use watchers.

For development (unminified) use: `npm run dev`

For production (minified with external source files) use: `npm run release`
