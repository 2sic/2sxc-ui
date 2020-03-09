# 2sxc inpage public API

This folder contains all the mapping etc. to the public API, for commands used from outside of 2sxc

ATM they are

$2sxc.api.edit

*. command(command stuff)
* .button(...)
* .group(...)
* .toolbar({}), .toolbar(name1, name2, ...)

* either this: .registerCommand($2sxc.api.edit.command(...));
* or better: .register(command | toolbarTemplate | ...)




## Naming convention

* .[object-name] builds an object, but doesn't register it anywhere
* .register[something] will create an object and register it



## Types of toolbars

* single-button toolbar
* 3-button for the same item
* 2-groups with 2-3 buttons each
* a button which uses a self-made custom command
