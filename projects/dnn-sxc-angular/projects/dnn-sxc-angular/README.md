# dnn-sxc-angular - Connecting Angular to DNN and/or 2sxc

This is a connector for angular 6-11+ ([git](https://github.com/angular/angular) | [web](https://angular.io/)) for developers using

1. the open source platform DNN 7-9+ ([git](https://github.com/dnnsoftware/Dnn.Platform) | [web](http://dnnsoftware.com/)) 
1. and/or the open source CMS 2sxc 10-11+ ([git](https://github.com/2sic/2sxc/) | [web](https://2sxc.org/)) 

This connector does

1. allows you to develop from local while running with hot-reload on a DNN, even on the production site
1. automatically provides all important dnn-parameters (module ID, security token, etc.) to angular
1. adds an Http Interceptor for the HttpClient which automatically applies these parameters to all requests
1. gives you quick commands like `data.query$` to get data with little effort from the server
1. prevents the enter-key from causing DNN form submits (optional, you can override this)

It uses **observables** to make it happen, thereby avoiding timing / async problems common in this scenario. 

## Setup & Discover Dnn-Sxc-Angular

It's published on [npm](https://www.npmjs.com/package/@2sic.com/dnn-sxc-angular), so the most common way is to get it using npm with 
`npm install "@2sic.com/dnn-sxc-angular" --save`. But we recommend that you follow the quick-start guide.

1. Start discovery using the [tutorial app](https://2sxc.org/en/apps/app/tutorial-angular-8) - ideally using the [getting started recipe](https://azing.org/2sxc/r/oCmPBI3p)
1. If you've already mastered the basics and wish to build your own, you can
    1. [Rename the tutorial app](https://azing.org/2sxc/r/S-VS0nPH) and continue working with that
    1. or modify an existing app to work with the same conventions

## How To Use

### Using WebAPIs inside DNN

This will now work automatically, because all headers etc. are now automatically added by the system. So just use your normal http-requests and everything works like magic :)

### Using 2sxc Content-Items, Queries and APIs

This package contains a `Data` object, which provides 3 observable streams

* `content$`
* `query$`
* `api$`

To use them, best check out the [tutorial app](https://2sxc.org/en/apps/app/tutorial-angular-8) or simply work through TypeScript intelisense - we documented all the commands. 

### Getting ModuleId, TabId, etc. and the `sxc` Instance

There is a `Context` object which provides these properties as streams (observables). Just inject `Context` and access it from there. Note that you almost never need this, as the HttpClient is already configured and ready to go, including the headers it needs. 

* `moduleId$`
* `tabId$`
* `sxc$`
* etc. (there are about 3 more...)

## Todo (status 2021-02)

These are things the 2sxc developers plan on enhancing

* enhance the content-manager to provide write commands (ATM read-only)
* enhance toolbar system to give angular call-backs when dialogs close
