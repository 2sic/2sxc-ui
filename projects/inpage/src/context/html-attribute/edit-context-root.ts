import { AttrJsonContentBlock, AttrJsonContentGroup, AttrJsonEnvironment, AttrJsonError, AttrJsonLanguage, AttrJsonUi, AttrJsonUser } from '.';

export class AttrJsonEditContext {
  // ReSharper disable InconsistentNaming
  Environment: AttrJsonEnvironment;
  User: AttrJsonUser;
  Language: AttrJsonLanguage;
  ContentBlock: AttrJsonContentBlock;
  ContentGroup: AttrJsonContentGroup;
  error: AttrJsonError;
  Ui: AttrJsonUi;
  // ReSharper restore InconsistentNaming
}
