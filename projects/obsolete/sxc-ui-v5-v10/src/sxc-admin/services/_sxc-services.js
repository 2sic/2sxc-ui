﻿// Init the main eav services module
angular.module("SxcServices", [
    "ng",                   // Angular for $http etc.
    "EavConfiguration",     // global configuration
	"EavServices",
    "InitSxcParametersFromUrl",
    "InitParametersFromUrl"
//    "pascalprecht.translate",
]);