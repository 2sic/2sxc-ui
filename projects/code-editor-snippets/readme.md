# Code Editor Snippets

Here we develop the snippets used in the code editor. 

1. They are managed in an excel file, which lets us easily do mass changes etc. and search-and-replace. 
1. Once it's done, we run gulp to generate a js file from it.  
   It's actually a json, but we add .js so it works on all IIS servers, even such that are not configured to deliver `.json` files.