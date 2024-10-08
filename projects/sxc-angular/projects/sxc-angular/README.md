<img src="https://raw.githubusercontent.com/2sic/2sxc-ui/develop/projects/sxc-angular/assets/logo-dark.png" width="300px" align="right">

# sxc-angular

> Connecting 2sxc, Angular with Dnn/Oqtane

This is a connector for angular 18+ ([git](https://github.com/angular/angular) | [web](https://angular.io/)) for developers using

1. the open source CMS Meta-Module 2sxc 14+ ([git](https://github.com/2sic/2sxc/) | [web](https://2sxc.org/)) 
1. either the open source platform DNN 9.6.1+ ([git](https://github.com/dnnsoftware/Dnn.Platform) | [web](https://www.dnnsoftware.com/)) 
1. ...or the open source platform Oqtane 3.1+ ([git](https://github.com/oqtane/oqtane.framework) | [web](https://www.oqtane.org/)) 

This connector...

1. allows you to develop from local while running with hot-reload on a Dnn/Oqtane, even on the production site
1. automatically provides all important server-headers (module ID, security token, etc.) to angular
1. adds an Http Interceptor for the HttpClient which automatically applies these parameters to all requests
1. gives you quick commands like `query(...)` to get data with little effort from the server
1. prevents the enter-key from causing form submits (optional, you can override this)
1. enables content-editing **toolbars** to work directly in Angular views

It uses **observables** to make it happen, thereby avoiding timing / async problems common in this scenario. 

## First Step: Watch Introduction Video

Best watch the [introduction video](https://docs.2sxc.org/js-code/angular/index.html) and read the general docs.

## Setup & Discover Sxc-Angular

It's published on [npm](https://www.npmjs.com/package/@2sic.com/sxc-angular), so the most common way is to get it using npm with 
`npm i "@2sic.com/sxc-angular" --save`. But we recommend that you follow the quick-start guide.

1. Start discovery using the [tutorial app](https://2sxc.org/en/apps/app/tutorial-and-template-app-for-angular-11) - ideally using the [getting started recipe](https://azing.org/2sxc/r/oCmPBI3p)
1. If you've already mastered the basics and wish to build your own, you can
    1. [Rename the tutorial app](https://azing.org/2sxc/r/S-VS0nPH) and continue working with that
    1. or modify an existing app to work with the same conventions

## How To Use

### Use WebAPIs

This will now work automatically, because all headers etc. are now automatically added by the system. 
So just use your normal http-requests and everything works like magic 😊

### Configuring Alternate Context / Startup Configuration

By default **sxc-angular** will pick up all the values on the page automatically by asking `$2sxc` for the initial values. 
Yet there are some things that `$2sxc` doesn't know, or why you may want to override. 

#### Method 1: Attributes on the Angular app-root Tag

**sxc-angular** will check for some properties on the `<app-root>` tag to see if it should do something special. 
If not found, it will default to the most common value. 

* `edition` would tell angular that it's running in an app-edition where multiple editions exist. 
  So it would use `live` etc. for it base path. Default is empty/not set.
* `api-edition` is important to access another edition of the API. default is empty/not set
* `angular-path` (new in 11.01)

#### Method 2: Set values on initialization

Once installed correctly, the context is autoloaded when the `AppComponent` which inherits `SxcAppComponent` does the `super(...)` call - like this:

```javascript
export class AppComponent extends SxcAppComponent {
  constructor(el: ElementRef, context: Context) {
    super(el, context);
  }
}
```

If you want to provide alternate configurations, you can do this here, by changing the `super` call. 
Here's an example (you can do more, check the code):

```javascript
export class AppComponent extends SxcAppComponent {
  constructor(el: ElementRef, context: Context) {
    super(el, context.preConfigure({moduleId: 42}));
  }
}
```


### Using 2sxc Content-Items, Queries and APIs

This package is fully documented with intellisense. 
Once configured it ensures that all HTTP requests in angular include system headers (like RVT in Dnn/Oqtane). 
It also contains a `SxcData` and `Api` object, which provides 3 observable streams

* `SxcApp.data<T>(contentTypeName)`
* `SxcApp.query<T>(queryName)`
* `SxcApp.api(controller).get<T>(apiNameAndParams)`
* `SxcApp.api.post<T>(apiNameAndParams)`
* plus various overloads

To use them, best check out the [tutorial app](https://2sxc.org/en/apps/app/tutorial-and-template-app-for-angular-11).

> Best to just use TypeScript intelisense - we documented all the commands. 


## History

1. ca. 2015 first version for Angular 2
1. ca. 2016 enhanced for Angular 6 and latest 2sxc features
1. 2019 Enhanced with Hot-Reloading features for Angular 8 and completely reworked how context is detected in DNN
1. 2020 Improved Hot-Reloading
1. 2021-02 Added tag-toolbar attribute and created refresh callback so the page doesn't reload (_requires 2sxc 11.12_)
1. 2021-02-26 v.11.01 - added new attribute `angular-path` to use as base for lazy loading
1. 2022-06-24 released v14 and changed from `dnn-sxc-angular` to `sxc-angular` as it's now for Dnn and Oqtane
1. 2024-09-30 released v18 for Angular 18

## Todo (status 2022-06)

These are things the 2sxc developers plan on enhancing

* enhance the content-manager to provide write commands (ATM read-only) - you can still do this, but must use the `context.sxc...` classic JS API
* enhance the content-manager to provide create-metadata commands - you can still do this, but must use the `context.sxc...` classic JS API
