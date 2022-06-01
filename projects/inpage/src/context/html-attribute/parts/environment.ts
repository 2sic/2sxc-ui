import { AttrJsonEntity } from './parameters-entity';

/**
 * @internal
 */
export class AttrJsonEnvironment {
  // ReSharper disable InconsistentNaming
  WebsiteId: number;
  WebsiteUrl: string;
  PageId: number;
  PageUrl: string;
  parameters: AttrJsonEntity[] | null;
  InstanceId: number;
  SxcVersion: string;
  SxcRootUrl: string;
  IsEditable: boolean;
  // ReSharper restore InconsistentNaming
}
