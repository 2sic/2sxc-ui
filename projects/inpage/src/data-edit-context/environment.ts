import { ParametersEntity } from './parameters-entity';

export class Environment {
  // ReSharper disable InconsistentNaming
  WebsiteId: number;
  WebsiteUrl: string;
  PageId: number;
  PageUrl: string;
  parameters: ParametersEntity[] | null;
  InstanceId: number;
  SxcVersion: string;
  SxcRootUrl: string;
  IsEditable: boolean;
  // ReSharper restore InconsistentNaming
}
