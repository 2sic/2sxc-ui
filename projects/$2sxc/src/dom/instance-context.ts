import { EnvironmentSpecs } from '../environment/environment-specs';

/**
 * @internal
 */
export interface InstanceContext {
  // Environment: AttrJsonEnvironment;
  // User: AttrJsonUser;
  // Language: AttrJsonLanguage;

  // /** Reference to the content block with information about the parent */
  // contentBlockReference: ContentBlockReference;

  // /** Information about the content block itself */
  // contentBlock: AttrJsonContentGroup;

  // error: ContextErrorJsonAndObj;
  // Ui: AttrJsonUi;
  jsApi: EnvironmentSpecs;
}
