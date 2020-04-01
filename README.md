2sxc UI - the JS UI of 2sxc
============

This project is part of 2sxc, https://github.com/2sic/2sxc.

It is separate to keep concerns separate and make contributions simpler (because it's a smaller project). 

## Many JS Projects for 2sxc in this Repo

Each project has different ways of building / deploying, mostly because they have different histories. Check out each readme for details. 

1. `projects/$2sxc` contains the API which does things like talk to the server using the dnn-headers etc.
1. `projects/$2sxc/angularjs` contains old (obsolete) code which was bundled with 2sxc to help with AngularJS 1.x applications
1. `projects/dnn-sxc-angular` Source for NPM package [@2sic/dnn-sxc-angular](https://www.npmjs.com/package/@2sic.com/dnn-sxc-angular)
1. `projects/quick-dialog` Source for the Quick-Dialog (which appears from below in the UI)
1. `projects/sxc-typings` Source for the NPM package [@2sic/sxc-typings](https://www.npmjs.com/package/@2sic.com/2sxc-typings)
1. `projects/sxc-ui-AngularJS` contains the 2sxc-ui parts of 2sxc extending the eav-ui

