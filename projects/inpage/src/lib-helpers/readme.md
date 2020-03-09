# Library Helpers

Some common JS commands like "extend" are very useful, but we want to prevent a deep connection between 2sxc and jQuery. 

Because of this, any jQuery-like command needed by 2sxc should be wrapped here, so that we can always replace the implementation as browsers get better or jQuery becomes obsolete. 