import { VersionDto } from './version-dto';

export interface Version extends VersionDto {
    // ChangeSetId: number;
    Data: VersionData[];
    // HistoryId: number;
    // TimeStamp: string;
    // User: string;
    // VersionNumber: number;
}

export interface VersionData {
  type: string;
  key: string;
  value: [string, any][];
  expand?: boolean;
  hasChanged: boolean;
}
