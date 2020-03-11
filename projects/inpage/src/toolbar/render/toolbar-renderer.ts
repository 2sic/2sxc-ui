import { ContextBundleButton } from '../../context';
import { RenderButton } from './render-button';
import { RenderButtonGroups } from './render-groups';
import { ContextBundleToolbar } from '../../context/bundles/context-bundle-toolbar';


export class ToolbarRenderer {
  private readonly groups: RenderButtonGroups;
  public readonly button: RenderButton;

  constructor(private context: ContextBundleToolbar) {
    this.groups = new RenderButtonGroups(this);
    this.button = new RenderButton(this);
  }

  render(): string {
    // render groups of buttons
    const context = this.context;
    const groups = this.groups.render(context);

    // render toolbar
    const toolbar = document.createElement('ul');
    toolbar.classList.add('sc-menu');
    toolbar.classList.add('group-0'); // IE11 fix, add each class separately

    // add behaviour classes
    toolbar.classList.add(`sc-tb-hover-${context.toolbar.settings.hover}`);
    toolbar.classList.add(`sc-tb-show-${context.toolbar.settings.show}`);
    if (context.toolbar.params.sortOrder === -1)
      toolbar.classList.add('listContent');

    this.addClasses(toolbar, context.toolbar.settings.classes, ' ');

    // add button groups to toolbar
    toolbar.setAttribute('group-count', context.toolbar.groups.length.toString());
    for (let g = 0; g < groups.length; g++)
      toolbar.appendChild(groups[g]);

    return toolbar.outerHTML;
  }

  /**
   * Add html classes to a DOM element
   */
  addClasses(element: HTMLElement, classes: string, spliter: string) {
    if (!classes) return;
    const classessArray = classes.split(spliter);
    for (let c = 0; c < classessArray.length; c++)
      if (classessArray[c])
        element.classList.add(classessArray[c]);
  }
}
