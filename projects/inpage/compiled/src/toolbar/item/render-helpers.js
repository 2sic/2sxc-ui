"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * helper method to add list of zero to many classes to Element
 * @param element
 * @param classes
 * @param spliter
 */
function addClasses(element, classes, spliter) {
    if (classes) {
        var classessArray = classes.split(spliter);
        for (var c = 0; c < classessArray.length; c++) {
            if (classessArray[c]) {
                element.classList.add(classessArray[c]);
            }
        }
    }
}
exports.addClasses = addClasses;
//# sourceMappingURL=render-helpers.js.map