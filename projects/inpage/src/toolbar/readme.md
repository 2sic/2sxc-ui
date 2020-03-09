# 2sxc Toolbar

This section contains everything to create hovering module and item toolbars.

Here's what you'll find:

1. The toolbarManager which basically hosts all the toolbar code
  1. The *buildToolbars* bootstrapper, which is in charge of starting toolbar-creation of an instance
  1. various *generate...Html* parts to produce HTML for the toolbar
  1. *createInstance* - which creates an OO-style access to the most common commands (deprecated)
  2. helpers - code to help build objects for toolbar structures
  3. toolbarTemplate - the template-object-tree containing default buttons
  4. standardButtons - an initializer which takes the template and builds the standard buttons based on context
1. shake support
1. event addition to prevent click-event bubling