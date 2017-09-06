(function() {
    $2sxc._commands.initializeInstanceCommands = function(editContext) {
        var cg = editContext.ContentGroup;
        return $2sxc._commands.definitions.create({
            canDesign: editContext.User.CanDesign,
            templateId: cg.TemplateId,
            contentTypeId: cg.ContentTypeName,
            isContent: cg.IsContent,
            queryId: cg.QueryId,
            appResourcesId: cg.AppResourcesId,
            appSettingsId: cg.AppSettingsId,
            allowPublish: editContext.ContentBlock.VersioningRequirements === $2sxc.c.publishAllowed
        });
    };

})();