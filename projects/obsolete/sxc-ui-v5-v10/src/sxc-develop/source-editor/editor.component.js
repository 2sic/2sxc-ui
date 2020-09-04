(function () {

angular.module("SourceEditor").component("editor", {
    templateUrl: "source-editor/editor.html",
    controller: EditorController,
    controllerAs: "vm"
});

/*@ngInject*/
function EditorController(sourceSvc, snippetSvc, appAssetsSvc, appId, sxcDialogs, items, $uibModalInstance, $window, $scope, $translate, saveToastr, ctrlS, debugState) {
    // todo: must re-think this, nicer would be if it's a proper parameter
    var item = items[0];

    $translate.refresh();   // necessary to load stuff added in this lazy-loaded app

    var vm = this;
    vm.debug = debugState;

    // if item is an object with EntityId, it referrs to a template, otherwise it's a relative path

    var svc = sourceSvc(item.EntityId !== undefined ? item.EntityId : item.Path);

    vm.view = {};
    vm.tempCodeBecauseOfBug = "";
    vm.editor = null;

    svc.get().then(function (result) {
        vm.view = result.data;
        svc.initSnippets(vm.view);
    });

    // load appropriate snippets from the snippet service
    svc.initSnippets = function (template) {
        vm.snipSvc = snippetSvc(template, ace);
        vm.snipSvc.getSnippets().then(function (result) {
            vm.snippets = result;   // prep for binding to the snippet-selector

            // now register the snippets in the editor
            vm.registerSnippets();
        });
    };

    //#region close / prevent-close
    vm.close = function () {
        if (!confirm($translate.instant("Message.ExitOk")))
            return;
        window.close();
    };

    // prevent all kind of closing when accidentally just clicking on the side of the dialog
    $scope.$on("modal.closing", function (e) { e.preventDefault(); });

    $window.addEventListener("beforeunload", function (e) {
        var unsavedChangesText = $translate.instant("Message.ExitOk");
        (e || window.event).returnValue = unsavedChangesText; //Gecko + IE
        return unsavedChangesText; //Gecko + Webkit, Safari, Chrome etc.
    });

    //#endregion

    //#region save
    vm.save = function (autoClose) {
        var after = autoClose ? vm.close : function () { };

        //#region bugfix 607
        // check if there is still some temp-snippet which we must update first 
        // - because of issue https://github.com/2sic/2sxc/issues/607
        // it's very important that we place the text into a copy of the variable
        // and NOT in the view.Code, otherwise undo will stop working
        var latestCode = vm.editor.getValue();
        var savePackage = angular.copy(vm.view);
        if (savePackage.Code !== latestCode) //{
            savePackage.Code = latestCode;
        //#endregion

        // now save with appropriate toaster
        saveToastr(svc.save(savePackage)).then(after);
    };
    //#endregion

    activate();

    function activate() {
        // add ctrl+s to save
        ctrlS(function () { vm.save(false); });


    }

    //#region snippets
    vm.registerSnippets = function registerSnippets() {
        // ensure we have everything first (this may be called multiple times), then register them
        if (!(vm.snipSvc && vm.editor))
            return;
        vm.snipSvc.registerInEditor();
    };
    //#endregion

    // this event is called when the editor is ready
    vm.aceLoaded = function (_editor) {
        vm.editor = _editor;        // remember the editor for later actions
        vm.registerSnippets();      // try to register the snippets
    };

}


}());