(() => {
    const
        dests = {
          current: 'default',
            default: 'c:/projects/2sxc-dnn742/Website',
            evoq: '../../TestWebsites/Evoq 9.1.0',
            dnn92cb: '../../2SexyContent/WebDNN9',
        },
        gulp = require('gulp'),
        $ = require('gulp-load-plugins')({
            lazy: false
        }),
        packageJSON = require('./package'), // would need this to always auto-publish after compile... runSequence = require('run-sequence'),
        jshintConfig = packageJSON.jshintConfig,
        merge = require('merge-stream'),
        js = 'js',
        css = 'css',
        config = {
            debug: true,
            autostart: true,
            autopublish: true,
            autopublishTarget: '/DesktopModules/ToSIC_SexyContent/dist',
            autopublishTargetJs: '/DesktopModules/ToSIC_SexyContent/js',
            rootDist: 'dist/' // 'tmp-gulp/dist/'
        };
    
    gulp.task('develop', () => {
        watchSet(createSetsForOurCode());
        watchDnnUi();

        // publish the changed files
        $.watch('./dist/**/*')
            .pipe(gulp.dest(dests[dests.current] + config.autopublishTarget));
    });

    // gulp.task('watch-publish', ['b-publish']);

    // register all watches & run them
    gulp.task('a-compile', () => {
        watchSet(createSetsForOurCode());
        watchDnnUi();
    });

    gulp.task('import-libs', importDependencies);
    gulp.task('c-snippets', watchSnippets);

    // deploy to the current 2sxc-dev
    gulp.task('publish-dist-to-2sxc', function () {
        gulp.src(['./dist/**/*'])
            .pipe(gulp.dest(dests[dests.current] + config.autopublishTarget));
    });

    gulp.task('b-publish', function () {
        gulp.watch('./dist/**/*', ['publish-dist-to-2sxc']);
        gulp.watch('./js/**/*', ['publish-js-to-2sxc']);
    });

    gulp.task('b-copy-all-with.data', () => copyAll(dests.default));

    // special helper - necessary to copy everything incl the ".data" folders
    // which are otherwise skipped
    function copyAll(dest) {
        gulp.src([
                        'dist/**/*', 'dist/.**/*'
                    ],
                    {
                        dot: true
                    }).pipe($.debug())
                .pipe(gulp.dest(dest + config.autopublishTarget))
            ;
    }

    // watch the dnn ui.html for changes and republish
    function watchDnnUi() {
        gulp.watch('src/dnn/' + '**/*', function () {
            gulp.src('src/dnn/**')
                .pipe(gulp.dest(config.rootDist + 'dnn'));
        });
    }

    function watchSnippets() {
        var root = 'src/sxc-develop/source-editor/snippets.';
        var src = root + 'xlsx';
        gulp.src(src)
            .pipe($.jsXlsx.run({
                parseWorksheet: 'row_array'
            }))
            .pipe($.rename({
                extname: '.json.js'
            }))
            .pipe(gulp.dest(config.rootDist + 'sxc-develop/'));
    }

    function importDependencies() {
        var bwr = 'bower_components/';
        gulp.src(bwr + 'angular-ui-tinymce/dist/tinymce.min.js')
            .pipe($.concat('set.js'))
            .pipe(gulp.dest(config.rootDist + 'edit/extensions/field-string-wysiwyg-tinymce/'));

        // icon-fonts and font-definitions
        var src = '../2sxc-icons/';
        gulp.src([src + '**/*.woff', src + '**/*.ttf', src + '**/*.eot'])
            .pipe($.rename({
                dirname: ''
            }))
            .pipe(gulp.dest(config.rootDist + 'lib/fonts'));

        // icon-definition file for app-icons
        gulp.src(src + 'full-system/css/app-icons-codes.css')
            .pipe(gulp.dest('src/sxc-edit/'));

        // 2018-04-13 2dm disabled, not part of this project - moved to 2sxc-inpage
        // icon-definition for inpage-icons
        //gulp.src(src + 'in-page-icons/css/inpage-icons-codes.css')
        //    .pipe(gulp.dest('src/inpage/'));

        // 2018-04-13 2dm disabled, now copying directly from project
        // i18n files
        //gulp.src(bwr + '2sxc-eav-languages/dist/i18n/**/*.js')
        //    .pipe(gulp.dest(config.rootDist + 'i18n/'));

        // lib angular-ui-ace
        gulp.src(bwr + 'angular-ui-ace/*.js')
            .pipe(gulp.dest(config.rootDist + 'lib/angular-ui-ace/'));

        // 2018-04-13 2dm disabled, as shake is now in 2sxc-inpage and not here any more
        //gulp.src(bwr + 'shake.js/shake.js')
        //    .pipe(gulp.dest('src/inpage/toolbar/libs/'));
    }

    //#region basic functions I'll need a lot
    function createConfig(key, tmplSetName, altDistPath, altJsName, libFiles, cwd) {
        cwd = cwd || 'src/' + key + '/';
        return {
            name: key,
            cwd: cwd,
            dist: altDistPath || config.rootDist + key + '/',
            css: {
                run: true,
                alsoRunMin: true,
                files: [cwd + '**/*.css'],
                libs: [],
                concat: key + '.css'
            },
            js: {
                run: true,
                files: [cwd + '**/*.js', '!' + cwd + '**/*spec.js', '!' + cwd + '**/tests/**'],
                libs: libFiles || [],
                concat: altJsName || key + '.js',
                templates: ['src/' + key + '/**/*.html'],
                templateSetName: tmplSetName,
                autoSort: true,
                alsoRunMin: true
            },
            json: {
                run: false,
                files: [`${cwd}**/*.json`,
                    `!${cwd}**/*spec.json`,
                    `!${cwd}**/tests*`],
            }
        }
    }

    // package a JS set
    function packageJs(set) {
        if (config.debug) console.log('bundling start: ' + set.name);

        var js = gulp.src(set.js.files);
        if (set.js.autoSort)
            js = js.pipe($.sort());
        js = js.pipe($.jshint(jshintConfig))
            .pipe($.jshint.reporter('jshint-stylish'))
            //.pipe($.jshint.reporter('fail'))
            .pipe($.ngAnnotate());

        var tmpl = set.js.templates ? gulp.src(set.js.templates)
            .pipe($.sort())
            //.pipe($.htmlmin({ collapseWhitespace: true }))
            .pipe($.angularTemplatecache('templates.js', { // set.js.templateSetName + '.js', { //'templates.js', {
                standalone: true,
                module: set.js.templateSetName // 'eavTemplates'
            })) : null;

        var libs = gulp.src(set.js.libs);

        var prelib = merge(js, tmpl);
        if (set.js.autoSort)
            prelib = prelib.pipe($.sort());

        var result = merge(libs, prelib);
        if (set.js.autoSort)
            result = result.pipe($.sort());

        if (config.debug) console.log('ready to save main js for: ' + set.name);
        result = result.pipe($.concat(set.js.concat))
            .pipe(gulp.dest(set.dist));

        console.log(`copy to ${set.dist}`);

        if (config.debug) console.log('ready to create min for: ' + set.name);
        if (set.js.alsoRunMin) {
            gulp.src(set.dist + set.js.concat) // reload the dist as new src for source-map
                .pipe($.rename({
                    extname: '.min.js'
                }))
                // 2016-04-23 2dm had to disable source-maps for now, something is buggy inside
                // 2016-09-07 2dm re-enabled it, seems to work now...
                // 2016-09-08 2rm had to disable it again, sourcmap generator throws an error
                // 2016-10-08 2dm enabled it again, now that we're not loading previous maps I think it should work

                .pipe($.sourcemaps.init()) //{ loadMaps: true }))
                .pipe($.uglify())
                .on('error', $.util.log)
                .pipe($.sourcemaps.write('./'))
                .pipe(gulp.dest(set.dist));
            if (config.debug) console.log('minification done on: ' + set.name + ' into file: ' + set.dist);
        } else {
            if (config.debug) console.log('no minification on: ' + set.name);
        }
        if (config.debug) console.log($.util.colors.cyan('bundling done: ' + set.name));

        return result;
    }


    function packageJsonTypes(set) {
        if (config.debug) console.log(`json start: ${set.name}`);
        gulp.src(set.json.files)
            .pipe($.flatten())
            .pipe(gulp.dest(set.dist + ".data/contenttypes/"));
    }


    // package a set of CSS
    function packageCss(set) {
        if (config.debug) console.log('css packaging start: ' + set.name);

        var result = gulp.src(set.css.files)
            .pipe($.sort());
        // lint the css - not enabled right now, too many fix-suggestions
        //.pipe($.csslint())
        //.pipe($.csslint.reporter())
        var libs = gulp.src(set.css.libs); // don't sort libs

        result = merge(result, libs)

            // concat & save concat-only (for debugging)
            .pipe($.concat(set.css.concat))
            .pipe(gulp.dest(set.dist));

        if (set.css.alsoRunMin)
            result
            // minify and save
            .pipe($.rename({
                extname: '.min.css'
            }))
            .pipe($.sourcemaps.init())
            .pipe($.cleanCss({
                compatibility: '*',
                processImportFrom: ['!fonts.googleapis.com'] /* ie9 compatibility */
            }))
            .pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest(set.dist));;
        if (config.debug) console.log($.util.colors.cyan('css packaging done: ' + set.name));
        return result;
    }

    // assemble a function which will call the desired set - this is a helper for the watch-sequence. 
    function createWatchCallback(set, part) {
        if (config.debug) console.log('creating watcher callback for ' + set.name);
        var run = function (event) {
            if (config.debug) console.log('File ' + event.path + ' was ' + event.type + ', running tasks on set ' + set.name);
            var call = (part === 'js'
                ? packageJs
                : part === 'json'
                    ? packageJsonTypes
                    : packageCss);
            call(set);
            console.log(`finished ${set.name} ${new Date()}`);
        }
        if (config.autostart) run({
            path: '[none]',
            type: 'autostart'
        });
        return run;
    }
    //#endregion

    /// create watch-sets for all our code blocks
    function createSetsForOurCode() {
        var sets = [];
        // setup admin, exclude pipeline css (later also exclude pipeline js)
        var admin = createConfig('sxc-admin', 'SxcTemplates');
        //admin.css.files.push('!' + admin.cwd + '**/pipeline*.css');
        sets.push(admin);

        // setup edit & extended
        var edit = createConfig('sxc-edit', 'SxcEditTemplates');
        edit.json.run = true;
        sets.push(edit);

        // setup inpage stuff
        var inpage = createConfig('inpage', 'templates');
        inpage.js.files.push('!src/inpage/translate/libs/**'); // excl. libs because we don't want to lint them
        inpage.js.libs = [
            'src/inpage/translate/libs/**.js'
        ];
        // 2018-03-13 2dm disabled in-page build for now, as we'll use the new github project just for in-page
        // new repo is https://github.com/2sic/2sxc-inpage
        // sets.push(inpage);

        // setup inpage dialogs
        var inpDialog = createConfig('inpage-dialogs', 'SxcInpageTemplates', 'dist/inpage/');
        sets.push(inpDialog);

        // setup inpage dialogs
        var eavConf = createConfig('config', 'templates');
        sets.push(eavConf);

        // setup inpage dialogs
        var develop = createConfig('sxc-develop', 'DevTemplates');
        sets.push(develop);

        // var api = createConfig('2sxc.api', 'templates', 'js/', '2sxc.api.js', undefined, '2sxc-api/js/');
        // sets.push(api);

        var ang1 = createConfig('2sxc4ng', 'templates', 'js/angularjs/', '2sxc4ng.js', undefined, '2sxc-api/angularjs/');
        sets.push(ang1);

        return sets;
    }

    // let gulp watch a series of packs
    function watchSet(setList) {
        setList.forEach(set => {
            if (set.js.run) gulp.watch(set.cwd + '**/*', createWatchCallback(set, js));
            if (set.json.run) gulp.watch(set.cwd + "**/*", createWatchCallback(set, 'json'));
            if (set.css.run) gulp.watch(set.cwd + '**/*css', createWatchCallback(set, css));
        });
    }
})();