// this is the 2sxc-javascript API
// 2sxc will include this automatically when a user has edit-rights
// a template developer will typically use this to use the data-api to read 2sxc-data from the server
// read more about this in the wiki: https://github.com/2sic/2sxc/wiki/JavaScript-%242sxc

// ReSharper disable InconsistentNaming
interface Window { $2sxc: ToSic.Sxc.SxcController | ToSic.Sxc.SxcControllerWithInternals; }

if (!window.$2sxc) // prevent double execution
    window.$2sxc = ToSic.Sxc.buildSxcController();
// ReSharper restore InconsistentNaming
