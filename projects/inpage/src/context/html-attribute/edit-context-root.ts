import { AttrJsonContentBlock, AttrJsonContentGroup, AttrJsonEnvironment, AttrJsonError, AttrJsonLanguage, AttrJsonUi, AttrJsonUser } from '.';

export class AttrJsonEditContext {
  Environment: AttrJsonEnvironment;
  User: AttrJsonUser;
  Language: AttrJsonLanguage;
  ContentBlock: AttrJsonContentBlock;
  ContentGroup: AttrJsonContentGroup;
  error: AttrJsonError;
  Ui: AttrJsonUi;
}
