(() => {
    const
        dest2sxc = 'C:/Projects/2sxc-dnn742/Website/DesktopModules/ToSIC_SexyContent/dist/ng-assets/',
        gulp = require('gulp'),
        jsXlsx = require('gulp-js-xlsx'),
        rename = require('gulp-rename'),
        // $ = require('gulp-load-plugins')({ lazy: false }),
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

})();