2sxc UI - the JS UI of 2sxc
============

This project is part of 2sxc, https://github.com/2sic/2sxc.

It is separate to keep concerns separate and make contributions simpler (because it's a smaller project). 

## Many JS Projects for 2sxc in this Repo

1. `src` contains the 2sxc-ui parts of 2sxc extending the eav-ui
1. `projects/$2sxc` contains the API which does things like talk to the server using the dnn-headers etc.
1. `projects/$2sxc/angularjs` contains old (obsolete) code which was bundled with 2sxc to help with AngularJS 1.x applications
1. `projects/dnn-sxc-angular` Source for NPM package [@2sic/dnn-sxc-angular](https://www.npmjs.com/package/@2sic.com/dnn-sxc-angular)
1. `projects/quick-dialog` Source for the Quick-Dialog (which appears from below in the UI)
1. `projects/sxc-typings` Source for the NPM package [@2sic/sxc-typings](https://www.npmjs.com/package/@2sic.com/2sxc-typings)

## Folders

1. `dist` contains the built JS UIs, which is deployed to the DNN installation with 2sxc installed
1. `projects` contains the source code for all the projects except `src` which will be moved later
1. `src` contains the root project, and must be moved to `/projects` when possible

## Develop / Install 2sxc-ui

1. the normal `npm install`
1. some dependencies are handled by bower (old), and because we're not sure if it will still work, we're including the bower folder in the git repo. Should be refactored some day, but probably will never happen, as most of these UIs will be completely rebuilt using Angular 8.
1. run gulp `A-watch-our-code` to build to dist
1. run gulp `B-watch-publish-to-2sxc` to copy to local 2sxc in dnn

## Develop / Install 2sxc-api

This uses TypeScript and is built using Webpack. It also contains some older bits like 2sxc4ng (for the old AngularJs) which must be included with 2sxc because older sites may still reference the JS files.

1. Build with `npm run 2sxc-api-dev` for dev-build with source-maps on dev-server.
1. Build with `npm run 2sxc-api-prod` for production build with source-maps pointing to sources.2sxc.org.
