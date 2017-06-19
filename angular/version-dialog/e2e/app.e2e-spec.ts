import { VersionDialogPage } from './app.po';

describe('version-dialog App', () => {
  let page: VersionDialogPage;

  beforeEach(() => {
    page = new VersionDialogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
