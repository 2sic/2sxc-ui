import { AttrJsonContentGroup, AttrJsonEnvironment, ContextErrorJsonAndObj, AttrJsonLanguage, AttrJsonUi, AttrJsonUser, ContentBlockReference } from '.';
import { EnvironmentSpecs } from '../../../../$2sxc/src/environment/environment-specs';
import { InstanceContext } from '../../../../$2sxc/src/dom/instance-context';
/**
 * @internal
 */
export class AttrJsonEditContext implements InstanceContext {
  Environment: AttrJsonEnvironment;
  User: AttrJsonUser;
  Language: AttrJsonLanguage;

  /** Reference to the content block with information about the parent */
  contentBlockReference: ContentBlockReference;

  /** Information about the content block itself */
  contentBlock: AttrJsonContentGroup;

  error: ContextErrorJsonAndObj;
  Ui: AttrJsonUi;

  JsApi: EnvironmentSpecs;
}
