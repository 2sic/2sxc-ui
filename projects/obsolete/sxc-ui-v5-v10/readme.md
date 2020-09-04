# 2sxc UI in Angular 1.x (2sxc 7 - 10.19)

This is the old edit UI used in 2sxc. It's still included in 2sxc 10.20+ but should rarely be updated. 

# Build and Deploy

To build it, you must use gulp. in 2 terminals, change the folder to this folder, then run:

* `gulp a-compile` to run the compile-watcher and compile everyting into the `dist` folder
* `gulp b-publish` to watch the dist and copy-publish everything to the 2sxc installation


When updating snippets, do this

1. edit them in the excel file
1. run `gulp c-snippets` to compile them to json for the code-editor


When updating JSON based entities in the distribution (located in various `.data` folders) run this

* `gulp b-copy-all-with.data`