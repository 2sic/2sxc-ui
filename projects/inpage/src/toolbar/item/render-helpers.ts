/**
 * helper method to add list of zero to many classes to Element
 * @param element
 * @param classes
 * @param spliter
 */
export function addClasses(element: HTMLElement, classes: string, spliter: string) {
  if (classes) {
    const classessArray = classes.split(spliter);
    for (let c = 0; c < classessArray.length; c++) {
      if (classessArray[c]) {
        element.classList.add(classessArray[c]);
      }
    }
  }
}
