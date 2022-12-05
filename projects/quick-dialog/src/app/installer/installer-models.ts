export interface InstallSpecs {
  installedApps?: InstalledApp[];
  rules?: InstallRule[];
}

export interface InstallSettings extends InstallSpecs {
  remoteUrl: string;
  // installedApps?: InstalledApp[];
  // rules?: InstallRule[];
}

export interface InstalledApp {
  name: string;
  version: string;
  guid: string;
}

export interface InstallRule {
  target: string;
  mode: string;
  appGuid: string;
  url: string;
}
