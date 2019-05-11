2sxc UI - the JS UI of 2sxc
============

This project is part of 2sxc, https://github.com/2sic/2sxc.

It is separate to keep concerns separate and make contributions simpler (because it's a smaller project). 

## Develop / Install

1. the normal `npm install`
1. some dependencies are handled by bower (old), and because we're not sure if it will still work, we're including the bower folder in the git repo. Should be refactored some day, but probably will never happen, as most of these UIs will be completely rebuilt using Angular 8.
1. run gulp `A-watch-our-code` to build to dist
1. run gulp `B-watch-publish-to-2sxc` to copy to local 2sxc in dnn