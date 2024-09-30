# To Do

This contains a list of things we see could/should be done.

It's a bit like issues, but many things are too small to be issues, or not important enough to warrant issue management. 



## Build / Webpack

1. ATM 2sic.js is included in the build, even though it would already be in the page. Find out how to reconfigure this and exclude it from the build.
1. The build got very large when we added the tooltip library `tippy.js` - it appears to not properly tree-shake, as that shouldn't add so much. Optimize.


## Server parameters in json-attribute of context

1. Unify objects with the properties - for that, make them lower case on the server as well
1. possibly we won't need as many classes/interfaces afterwards...
