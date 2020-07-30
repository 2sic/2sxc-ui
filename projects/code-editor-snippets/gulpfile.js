
const
    webpackHelpers = require('../webpack/webpack-helpers');
    dest2sxc = webpackHelpers.DnnTargetFolder + 'dist/ng-assets/';
    gulp = require('gulp'),
    jsXlsx = require('gulp-js-xlsx'),
    rename = require('gulp-rename'),
    rootDist = 'dist/';

gulp.task('default', xlsxSnippetsToJson);

function xlsxSnippetsToJson() {
    var src = 'snippets.xlsx';
    return gulp.src(src)
        .pipe(jsXlsx.run({
            parseWorksheet: 'row_array'
        }))
        .pipe(rename({
            extname: '.json.js'
        }))
        .pipe(gulp.dest(rootDist))
        .pipe(gulp.dest(dest2sxc));
}
