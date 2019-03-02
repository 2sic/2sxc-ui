// This is the service which sanitize path, file or folder name
angular.module('Adam')
  .factory('sanitizeSvc', function () {

    removeFromStart = function (sanitized, charToRemove) {
      // check for undefined 
      if (!sanitized) return sanitized;

      while (sanitized.substring(0, 1) === charToRemove) {
        sanitized = sanitized.substring(1);
      }
      return sanitized;
    };

    removeFromEnd = function (sanitized, charToRemove) {
      // check for undefined 
      if (!sanitized) return sanitized;
      while (sanitized.substring(sanitized.length - 1, sanitized.length) === charToRemove) {
        sanitized = sanitized.substring(0, sanitized.length - 1);
      }
      return sanitized;
    };

    cleanBadPath = function (sanitized) {
      // check for undefined 
      if (!sanitized) return sanitized;

      var goodChar = "_";
      var illegalRe = /[\?<>\\:\*\|":]/g;
      var controlRe = /[\x00-\x1f\x80-\x9f]/g;
      var reservedRe = /^\.+$/;
      var windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
      var windowsTrailingRe = /[\. ]+$/;
      return sanitized
        .replace(illegalRe, goodChar)
        .replace(controlRe, goodChar)
        .replace(reservedRe, goodChar)
        .replace(windowsReservedRe, goodChar)
        .replace(windowsTrailingRe, goodChar);
    };

    var svc = {};

    // sanitize path
    svc.sanitizePath = function (sanitized) {
      // check for undefined 
      if (!sanitized) return sanitized;

      // remove slashes form start of path
      sanitized = removeFromStart(sanitized, '\/');

      // remove slashed form end of path
      sanitized = removeFromEnd(sanitized, '\/');

      // remove backslashes form start of path
      sanitized = removeFromStart(sanitized, '\\');

      // remove backslashes form end of path
      sanitized = removeFromEnd(sanitized, '\\');

      // replace bad
      sanitized = cleanBadPath(sanitized);

      return sanitized;
    };

    // sanitize file or folder name
    svc.sanitizeName = function (sanitized) {
      // check for undefined 
      if (!sanitized) return sanitized;
      
      // in addition to all path validation rules
      // slashes are not valid in file or folder name
      var replacement = "_";
      var illegalRe = /\//g;
      return svc.sanitizePath(sanitized)
        .replace(illegalRe, replacement);
    };

    return svc;
  });