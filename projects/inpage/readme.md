# 2sxc-inpage for 2sxc 10.00 on DNN

This is the inpage libraries / code which are responsible for creating toolbars etc. for [2sxc](https://2sxc.org).

## Build

### Release

`npm run release`

### Develop

...with watcher: `npm run dev`

- this is configured to build and auto-copy the files to the local dnn copy in the default dev-setup of the 2sxc team.
- if your folders are different, you'll need to adjust the path in the webpack.config.js

## 2sxc-inpage notes for developers

### webpack static module bundler

After bounding, it will copy of all files from **./dist/** to **%Dev2sxcDnnRoot%/dist/inpage** folder. It uses the environment variable `Dev2sxcDnnRoot` to find DNN

Our **webpack.config.js** supports bundling for Development or Production (depending on process.env.NODE_ENV, but 'development' is default).

### Development

- currently bundles only ts & js files to support watch mode
- bundling of \*.css, and other assets is skipped

### Production

- bundles all ts/js and css files
- currently all css files are minimized (but only min.css have to be minimized)
- all 4 icons\*.png images are serialized into the CSS file
- currently do not work in watch mode

### TypeDoc

Documentation can be auto-generated in **./docs** folder, but you have to change variable **generateTypedocDocumentation** to **true**.
For faster webpack execution during development it is not enabled by default.

```javascript
var generateTypedocDocumentation = false;
```
