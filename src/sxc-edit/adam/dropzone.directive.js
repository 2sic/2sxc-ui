/* js/fileAppDirectives */
(function () {
    angular.module('Adam')
        /*@ngInject*/
        .directive('dropzone', function (sxc, tabId, AppInstanceId, ContentBlockId, dragClass, adamSvc, $timeout, $translate) {

            return {
                restrict: 'C',
                link: postLink,

                // This controller is needed, because it needs an API which can talk to other directives
                controller: controller
            };


            // this is the method called after linking the directive, which initializes Dropzone
            function postLink(scope, element, attrs, controller) {
                var header = scope.$parent.to.header;
                var field = scope.$parent.options.key;
                var entityGuid = header.Guid;
                var svc = adamSvc(header.ContentTypeName, entityGuid, field, '', scope.$parent.vm.adamModeConfig);
                var url = svc.url;

                var config = {
                    url: url,
                    urlRoot: url,
                    maxFilesize: 10000, // 10'000 MB = 10 GB, note that it will also be stopped on the server if it's larger than the really allowed sized
                    paramName: 'uploadfile',
                    maxThumbnailFilesize: 10,

                    headers: {
                        "ModuleId": AppInstanceId,
                        "TabId": tabId,
                        "ContentBlockId": ContentBlockId
                    },

                    dictDefaultMessage: '',
                    addRemoveLinks: false,
                    previewsContainer: '.field-' + field.toLowerCase() + ' .dropzone-previews',
                    // we need a clickable, because otherwise the entire area is clickable. so i'm just making the preview clickable, as it's not important
                    clickable: '.field-' + field.toLowerCase() + ' .invisible-clickable' // " .dropzone-adam"
                };


                var eventHandlers = {
                    'addedfile': function (file) {
                        // debugger;
                        $timeout(function () {
                            // anything you want can go here and will safely be run on the next digest.
                            scope.$apply(function () { // this must run in a timeout
                                scope.uploading = true;
                            });
                        });
                    },

                    'drop': function (event) {
                        // debugger;
                        console.log('stv: drop', event);
                    },

                    "processing": function (file) {
                        // debugger;
                        this.options.url = svc.uploadUrl(controller.adam.subFolder);
                    },

                    'success': function (file, response) {
                        // debugger;
                        if (response.Success) {
                            svc.addFullPath(response); // calculate additional infos
                            scope.$parent.afterUpload(response);
                        } else {
                            alert('Upload failed because: ' + response.Error);
                        }
                    },
                    'error': function (file, error, xhr) {
                        alert($translate.instant('Errors.AdamUploadError'));
                    },

                    "queuecomplete": function (file) {
                        if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                            scope.uploading = false;
                            controller.adam.refresh();
                        }
                    }
                };

                // delay building the dropszone till the DOM is ready
                $timeout(function () {
                    var dropzone = new Dropzone(element[0], config);

                    angular.forEach(eventHandlers, function (handler, event) {
                        dropzone.on(event, handler);
                    });

                    scope.processDropzone = function () { dropzone.processQueue(); };
                    scope.resetDropzone = function () { dropzone.removeAllFiles(); };
                    controller.openUpload = function () { dropzone.hiddenFileInput.click(); };
                    controller.processFile = function (file) { dropzone.processFile(file); }; // needed for clipboard paste


                    var pasteInstance;

                    // pastableTextarea - for adam input
                    pasteInstance = $(element[0]).children("div:first").children("div.after-preview:first").children("div:first").children("input:first");
                    if (pasteInstance.length > 0) {
                        pasteInstance.pastableTextarea();
                        //pasteInstance.on('pasteImage', function (ev, data) {
                        //    pasteImageInDropzone(ev, data, dropzone);
                        //});

                        // pastableNonInputable
                        pasteInstance = $(element[0]);
                        if (pasteInstance.length > 0) {
                            pasteInstance.pastableNonInputable();
                            pasteInstance.on('pasteImage', function (ev, data) {
                                pasteImageInDropzone(ev, data, dropzone);
                            });
                        }
                    }

                    // pastableContenteditable - for tinymce
                    pasteInstance = $(element[0]).children("div:first").children("div[contenteditable]:first");
                    if (pasteInstance.length > 0) {
                        pasteInstance.pastableContenteditable();
                        pasteInstance.on('pasteImage', function (ev, data) {
                            pasteImageInDropzone(ev, data, dropzone);
                        });
                    }

                    //.on('pasteText', function (ev, data) {
                    //    debugger;
                    //    //$('<div class="result"></div>').text('text: "' + data.text + '"').insertAfter(this);
                    //}).on('pasteTextRich', function (ev, data) {
                    //    debugger;
                    //    //$('<div class="result"></div>').text('rtf: "' + data.text + '"').insertAfter(this);
                    //}).on('pasteTextHtml', function (ev, data) {
                    //    debugger;
                    //    //$('<div class="result"></div>').text('html: "' + data.text + '"').insertAfter(this);
                    //});


                }, 0);

                function pasteImageInDropzone(ev, data, dropzone) {
                    var img = data.file;
                    var imageFileName = 'image.png';
                    // todo: generate hash sha256 for name
                    imageFileName = window.prompt('Enter clipboard image file name: ', imageFileName); // todo: i18n 
                    if (browser() !== 'Edge') {
                        img = twoSxcFile(img, imageFileName);
                    } else {
                        // fix this for Edge and IE
                        //try {
                        //    img = new File(data.file, imageFileName);
                        //} catch (e) {
                        //    console.log('paste image error', e);
                        //}
                        
                    }
                    // todo: convert png to jpg
                    dropzone.processFile(img);
                }

                /**
                 * creates new customized file
                 * @param {File} file
                 * @param {string} fileName
                 */
                function twoSxcFile(file, fileName) {
                    var data = new FormData();
                    data.append('file', file, fileName);
                    var newFile = data.get('file');
                    return newFile;
                }

                /**
                 * Gets the browser name or returns an empty string if unknown. 
                 * This function also caches the result to provide for any 
                 * future calls this function has.
                 * https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
                 *
                 * @returns {string}
                 */
                function browser() {
                    // Return cached result if avalible, else get result then cache it.
                    if (browser.prototype._cachedResult)
                        return browser.prototype._cachedResult;

                    // Opera 8.0+
                    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

                    // Firefox 1.0+
                    var isFirefox = typeof InstallTrigger !== 'undefined';

                    // Safari 3.0+ "[object HTMLElementConstructor]" 
                    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);

                    // Internet Explorer 6-11
                    var isIE = /*@cc_on!@*/false || !!document.documentMode;

                    // Edge 20+
                    var isEdge = !isIE && !!window.StyleMedia;

                    // Chrome 1+
                    var isChrome = !!window.chrome && !!window.chrome.webstore;

                    // Blink engine detection
                    var isBlink = (isChrome || isOpera) && !!window.CSS;

                    browser.prototype._cachedResult =
                        isOpera ? 'Opera' :
                            isFirefox ? 'Firefox' :
                                isSafari ? 'Safari' :
                                    isChrome ? 'Chrome' :
                                        isIE ? 'IE' :
                                            isEdge ? 'Edge' :
                                                isBlink ? 'Blink' :
                                                    "Don't know";

                    return browser.prototype._cachedResult;
                }

            }



            /*@ngInject*/
            function controller() {
                var vm = this;
                vm.adam = {
                    show: false,
                    subFolder: '',
                    refresh: function () { }
                };

            }

        });


})();