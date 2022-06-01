import { AttrJsonContentGroup, AttrJsonEnvironment, AttrJsonError, AttrJsonLanguage, AttrJsonUi, AttrJsonUser, ContentBlockReference } from '.';

/**
 * @internal
 */
export class AttrJsonEditContext {
  Environment: AttrJsonEnvironment;
  User: AttrJsonUser;
  Language: AttrJsonLanguage;

  /** Reference to the content block with information about the parent */
  contentBlockReference: ContentBlockReference;

  /** Information about the content block itself */
  contentBlock: AttrJsonContentGroup;

  error: AttrJsonError;
  Ui: AttrJsonUi;
}
