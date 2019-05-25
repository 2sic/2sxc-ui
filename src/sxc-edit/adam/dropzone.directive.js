/* js/fileAppDirectives */
(function () {
  angular.module('Adam')
    /*@ngInject*/
    .directive('dropzone', function (sxc, tabId, AppInstanceId, ContentBlockId, dragClass, adamSvc, $timeout, $translate, featuresSvc, toastr) {

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
        var paths = scope.$parent.to.settings.merged.Paths;
        var svc = adamSvc(header.ContentTypeName, entityGuid, field, paths, scope.$parent.vm.adamModeConfig);
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
            "ContentBlockId": ContentBlockId,
            "RequestVerificationToken": window.$.ServicesFramework(0).getAntiForgeryValue()
          },

          dictDefaultMessage: '',
          addRemoveLinks: false,
          previewsContainer: '.field-' + field.toLowerCase() + ' .dropzone-previews',
          // we need a clickable, because otherwise the entire area is clickable. so i'm just making the preview clickable, as it's not important
          clickable: '.field-' + field.toLowerCase() + ' .invisible-clickable' // " .dropzone-adam"
        };


        var eventHandlers = {
          'addedfile': function (file) {
            $timeout(function () {
              // anything you want can go here and will safely be run on the next digest.
              scope.$apply(function () { // this must run in a timeout
                scope.uploading = true;
              });
            });
          },

          'drop': function (event) {
            // console.log('stv: drop', event);
          },

          "processing": function (file) {
            this.options.url = svc.uploadUrl(controller.adam.subFolder);
          },

          'success': function (file, response) {
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

          clipboardPasteImageFeature(element[0], dropzone); // add clipboard paste image feature if enabled

        }, 0);


        /**
         * add clipboard paste image feature if enabled
         * @param {any} element
         * @param {any} dropzone
         */
        function clipboardPasteImageFeature(element, dropzone) {
          featuresSvc.enabled('f6b8d6da-4744-453b-9543-0de499aa2352').then(
            function (enabled) {
              if (enabled) {
                clipboardPasteImageFunctionalityEnable(element, dropzone);
              }
            });
        }


        /**
         * attach paste functionality to UI elements in dropzone
         * @param {any} element
         * @param {any} dropzone
         */
        function clipboardPasteImageFunctionalityEnable(element, dropzone) {

          var pasteInstance;

          // 1. pastableContenteditable - for tinymce
          pasteInstance = element.querySelector('div > div[contenteditable]');
          if (pasteInstance) {
            pasteInstance.pastableContenteditable();
            pasteInstance.addEventListener('handleImage', function (ev, data) {
              pasteImageInDropzone(ev, data, dropzone);
            });
            return;
          }

          // 2. pastableTextarea - for adam input
          pasteInstance = element.querySelector('div > div.after-preview > div > input');
          if (pasteInstance) {
            pasteInstance.pastableTextarea();
            pasteInstance.addEventListener('handleImage', function (ev, data) {
              pasteImageInDropzone(ev, data, dropzone);
            });

            // pastableNonInputable
            pasteInstance = element; // whole dropzone
            pasteInstance.pastableNonInputable();
            pasteInstance.addEventListener('handleImage', function (ev, data) {
              pasteImageInDropzone(ev, data, dropzone);
            });

            return;
          }

          // 3. pastableTextarea - for adam library
          pasteInstance = element.querySelector('div.paste-image');
          if (pasteInstance) {
            // pastableNonInputable
            pasteInstance = element; // whole dropzone
            pasteInstance.pastableNonInputable();
            pasteInstance.addEventListener('handleImage', function (ev, data) {
              pasteImageInDropzone(ev, data, dropzone);
            });

            return;
          }
        }


        /**
         * handle clipboard image after paste and prompt for new image filename
         * @param {any} ev event
         * @param {any} data clipboard image data
         * @param {any} dropzone
         */
        function pasteImageInDropzone(ev, data, dropzone) {
          if (ev.detail && !data) {
            data = ev.detail;
          }

          // todo: convert png to jpg to reduce file size
          var filename = ev.imageFileName ? ev.imageFileName : ev.detail.imageFileName;
          var img = getFile(data, filename);
          dropzone.processFile(img);
          //ev.stopImmediatePropagation();
          //ev.preventDefault();
        }

        /**
         * creates new file with custom fileName
         * @param {File} file
         * @param {string} fileName
         */
        function getFile(data, fileName) {
          var newFile = data.file; // for fallback

          try {
            if (document.documentMode || /Edge/.test(navigator.userAgent) || /MSIE/.test(navigator.userAgent) || /rv:11/.test(navigator.userAgent)) {
              // fix this for Edge and IE
              newFile = new Blob([data.file], { type: data.file.type });
              newFile.lastModifiedDate = data.file.lastModifiedDate;
              newFile.name = fileName;
            } else {
              // File.name is readonly so we do this
              var formData = new FormData();
              formData.append('file', data.file, fileName);
              newFile = formData.get('file');
            }
          } catch (e) {
            console.log('paste image error', e);
          }
          return newFile;
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