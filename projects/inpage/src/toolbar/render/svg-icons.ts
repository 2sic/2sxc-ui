import { ToolbarConstants } from '../../constants/toolbar';

const viewBoxAttribute = 'viewBox';

// 2022-08-15 2dm experimental
// must have a bunch of try-catch to prevent failure
// This should handle special SVGs added do the page

export function monitorSvgIconsInToolbar() {
  const observer = new MutationObserver((m) => {
    // Once a change has been made, It's easiest to just find unprocessed SVGs in the document
    // ...inside the svg-wrapper span
    const svgs = document.querySelectorAll(`${ToolbarConstants.svgWrapElement}.${ToolbarConstants.svgWrapClass} svg:not([${viewBoxAttribute}])`);

    svgs.forEach((svg) => {
      setSvgViewBox(svg);
    });
  });

  observer.observe(document.body, {
    attributes: false,
    childList: true,
    subtree: true,
  });
}



function setSvgViewBox(svg: any)  {
  // Skip if it already has a viewBox
  const previous = svg.getAttribute(viewBoxAttribute);
  if (previous) return;

  // do whatever
  const { xMin, xMax, yMin, yMax } = [...(svg).children].reduce((acc, el) => {
    const { x, y, width, height } = el.getBBox();
    if (!acc.xMin || x < acc.xMin) acc.xMin = x;
    if (!acc.xMax || x + width > acc.xMax) acc.xMax = x + width;
    if (!acc.yMin || y < acc.yMin) acc.yMin = y;
    if (!acc.yMax || y + height > acc.yMax) acc.yMax = y + height;
    return acc;
  }, {});

  const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;

  svg.setAttribute(viewBoxAttribute, viewbox);
}

