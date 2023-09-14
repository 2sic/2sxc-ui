const gulp = require('gulp'),
    jsXlsx = require('gulp-js-xlsx'),
    rename = require('gulp-rename'),
    path = require('path'),
    buildConfig = require('@2sic.com/2sxc-load-build-config').BuildConfig,
    rootDist = 'dist/';

const targets = [
  rootDist, 
  ...(buildConfig.Sources?.map(t => path.resolve(t, 'dist/ng-assets/')) || []),
  ...(buildConfig.JsTargets?.map(t => path.resolve(t, 'dist/ng-assets/')) || [])
].filter(item => item !== null);

function xlsxSnippetsToJson(target) {
    console.log('Processing target: ' + target);
    var src = 'snippets.xlsx';
    return gulp.src(src)
        .pipe(jsXlsx.run({
            parseWorksheet: 'row_array'
        }))
        .pipe(rename({
            extname: '.json.js'
        }))
        .pipe(gulp.dest(target))
}

// Gulp task that loops over each target and runs the xlsxSnippetsToJson function
gulp.task('processAllTargets', function(done) {
  targets.forEach(target => {
      xlsxSnippetsToJson(target);
  });
  done();
});

// Set the default Gulp task to 'processAllTargets'
gulp.task('default', gulp.series('processAllTargets'));
