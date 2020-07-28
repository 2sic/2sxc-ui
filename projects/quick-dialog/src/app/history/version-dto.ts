
export interface VersionDto {
  ChangeSetId: number;
  HistoryId: number;
  Json: string;
  TimeStamp: string;
  User: string;
  VersionNumber: number;
}

export interface EntityJsonDto {
  Entity: {
    Attributes: any[]
  };
}
