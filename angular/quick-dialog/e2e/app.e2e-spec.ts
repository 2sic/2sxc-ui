import { TemplateSelectorA4Page } from './app.po';

describe('template-selector-a4 App', () => {
  let page: TemplateSelectorA4Page;

  beforeEach(() => {
    page = new TemplateSelectorA4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
