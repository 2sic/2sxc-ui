# $2sxc JS API for 2sxc

## What you need to know

### Folders

1. `src` contains the source to be compiled
1. `js` is the target - this is then copied to the DNN which contains the 2sxc for release
1. `angularjs` is the old, obsolete code which was compiled into `js/AngularJS` for support of AngularJs 1.x stuff

## Develop / Install 2sxc-api

This uses TypeScript and is built using Webpack. It also contains some older bits like 2sxc4ng (for the old AngularJs) which must be included with 2sxc because older sites may still reference the JS files.

1. Build with `npm run 2sxc-api-dev` for dev-build with source-maps on dev-server.
1. Build with `npm run 2sxc-api-prod` for production build with source-maps pointing to sources.2sxc.org.
