﻿# 2sxc Core API

## TypeScript Information
The code here is written in TypeScript but is available _globally_ on `window.$2sxc`. 
To use it typed in your TypeScript, please don't reference these files, but use the npm package [@2sic.com/2sxc-typings](https://www.npmjs.com/package/@2sic.com/sxc-angular).



## The SxcController window.$2sxc
This folder contains the $2sxc Controller, which does the following:

1. Build SxcInstance objects for each ContentBlock, which is either a DNN Module or a ContentBlock inside such a module (very rich content / inner content)
2. Provide version information in case your JS needs it

### SxcController in Edit Mode
In Edit-Mode it also manages all additional edit features of the CMS, like multi-language labels, access to toolbar-apis and more. 

The code for that functionality is not found here, as it's only loaded when needed. You can find that code in `/src/inpage/`.



## The SxcInstance
This is generated by the SxcController as needed (see documentation). It's functions are to

1. assist in web service requests

### SxcInstance in Edit Mode
In Edit Mode it also provides more features like translation, toolbar APIs and more. This is also only loaded when needed, you can find it in `/src/inpage`.