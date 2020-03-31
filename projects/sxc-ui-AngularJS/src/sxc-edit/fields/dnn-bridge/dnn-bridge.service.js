// This is the service which allows opening dnn-bridge dialogs and processes the results

angular.module('sxcFieldTemplates')
    /*@ngInject*/
    .factory('dnnBridgeSvc', function ($uibModal, $http, appId, promiseToastr) {
        var svc = {};
        svc.open = function open(oldValue, params, callback) {
            var type = 'pagepicker';

            var connector = {
                params: params,
                valueChanged: callback,
                dialogType: type
            };

            connector.valueChanged = function valueChanged(value) {
                connector.modalInstance.close();
                callback(value);
            };

            connector.params.CurrentValue = oldValue;

            console.log('before open page picker');
            console.log($uibModal);
            connector.modalInstance = $uibModal.open({
                templateUrl: 'fields/dnn-bridge/hyperlink-default-pagepicker.html',
                resolve: {
                    bridge: function () {
                        return connector;
                    }
                },
                /*@ngInject*/
                controller: function ($scope, bridge) {
                    $scope.bridge = bridge;
                },
                windowClass: 'sxc-dialog-filemanager'
            });
            console.log('after open page picker');

            return connector.modalInstance;
        };


        // handle short-ID links like file:17
        svc.getUrlOfId = function(idCode, contentType, guid, field) {
            var linkLowered = idCode.toLowerCase();
            if (linkLowered.indexOf('file:') !== -1 || linkLowered.indexOf('page:') !== -1)
                return $http.get('dnn/Hyperlink/ResolveHyperlink?hyperlink='
                    + encodeURIComponent(idCode)
                    + (guid ? '&guid=' + guid : '')
                    + (contentType ? '&contentType=' + contentType : '')
                    + (field ? '&field=' + field : '')
                    + '&appId=' + appId);
            return null;
        };

        return svc;

    });