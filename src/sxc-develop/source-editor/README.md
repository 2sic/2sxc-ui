
# Source Editor

This is the source code editor in 2sxc. Mostly it's just normal angular stuff, but there are some specials.

## Source code editor with ace editor
The solution uses the [ace code editor](https://ace.c9.io/#nav=about). it loads it from a CDN so t's not included. 

The one thing that is included is the angular-bridge.

## Snippet Management using Excel
Because we have so many snippets, these are managed in an excel _snippets.xlsx_ .

You will find documentations/instructions for the snippets on azing: 
https://azing.org/2sxc/l/itSjkSK0/part-code-editor-and-snippets

Since we need json to consume it, they are converted within a grunt-job. This doesn't happen automatically, you must start the _C-snippets-build_ gulp to create them.
