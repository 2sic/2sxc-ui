
const webpackHelpers = require('../webpack/webpack-helpers');
const gulp = require('gulp'),
    jsXlsx = require('gulp-js-xlsx'),
    rename = require('gulp-rename'),
    rootDist = 'dist/';

const destDnn = webpackHelpers.DnnTargetFolder + 'dist/ng-assets/';
const dest2sxc = webpackHelpers.AssetsTarget + 'dist/ng-assets/';

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
        .pipe(gulp.dest(destDnn))
        .pipe(gulp.dest(dest2sxc));
}
