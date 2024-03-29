2sxc UI - the JS UI of 2sxc
============

This project is part of 2sxc, <https://github.com/2sic/2sxc>.

It is separate to keep concerns separate and make contributions simpler (because it's a smaller project).

## Build Everything

Note that using `npm run release-all` all projects will be built.

But there is a requirement: in each project you must have previously install all npm packages.
So if this is the first time you do it, call `npm run ci-all` in the root projects.

Building each project will just place the stuff in each `dist` folder.
To auto-distribute it to wherever you want, check out <https://go.2sxc.org/build>.

## JS Projects for 2sxc in this Repo

Each project has different ways of building / deploying, mostly because they have different histories. Check out each readme for details.

1. `projects/$2sxc` contains the API which does things like talk to the server using the dnn-headers etc.  
    put into `[target]/js`
1. `projects/code-editor-snippets` contains template code snippets for the code editor  
    put into `[target]/dist/ng-assets`
1. `projects/core` shared parts of code for other components  
1. `projects/dnn-sxc-angular` Source for NPM package [@2sic/dnn-sxc-angular](https://www.npmjs.com/package/@2sic.com/dnn-sxc-angular)
1. `projects/inpage` the CMS/edit JS API stuff  
    put into `[target]/dist/inpage`
1. `projects/quick-dialog` Source for the Quick-Dialog (which appears from below in the UI)  
    put into `[target]/dist/ng`
1. `projects/sxc-typings` Source for the NPM package [@2sic/sxc-typings](https://www.npmjs.com/package/@2sic.com/2sxc-typings)

## Obsolete Projects

These projects have been moved to the [2sxc-js-archive repo](https://github.com/2sic/2sxc-js-archive)

1. `AngularJS` - previous versions of 2sxc included a library to make it easier to create AngularJS projects - now deprecated
1. `published` - contains the built releases of the angular libraries - in case someone needs it for old apps
1. `sxc-ui-v5-v10` contains the 2sxc-ui parts of 2sxc extending the eav-ui - removed as of 2sxc 11.05
