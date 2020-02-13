2sxc UI - the JS UI of 2sxc
============

This project is part of 2sxc, https://github.com/2sic/2sxc.

It is separate to keep concerns separate and make contributions simpler (because it's a smaller project). 

## Two Code Sets

1. `src` contains the 2sxc-ui parts of 2sxc extending the eav-ui
1. `projects/$2sxc` contains the API which does things like talk to the server using the dnn-headers etc.

## Develop / Install 2sxc-ui

1. the normal `npm install`
1. some dependencies are handled by bower (old), and because we're not sure if it will still work, we're including the bower folder in the git repo. Should be refactored some day, but probably will never happen, as most of these UIs will be completely rebuilt using Angular 8.
1. run gulp `A-watch-our-code` to build to dist
1. run gulp `B-watch-publish-to-2sxc` to copy to local 2sxc in dnn

## Develop / Install 2sxc-api

This uses TypeScript and is built using Webpack. It also contains some older bits like 2sxc4ng (for the old AngularJs) which must be included with 2sxc because older sites may still reference the JS files.

1. Build with `npm run 2sxc-api-dev` for dev-build with source-maps on dev-server.
1. Build with `npm run 2sxc-api-prod` for production build with source-maps pointing to sources.2sxc.org.
