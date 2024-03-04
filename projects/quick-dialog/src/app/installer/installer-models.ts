// copied to eav-ui
export interface InstallSpecs {
  installedApps?: InstalledApp[];
  rules?: InstallRule[];
}

// copied to eav-ui
export interface InstallSettings extends InstallSpecs {
  remoteUrl: string;
  // installedApps?: InstalledApp[];
  // rules?: InstallRule[];
}

// copied to eav-ui
export interface InstalledApp {
  name: string;
  version: string;
  guid: string;
}

// copied to eav-ui
export interface InstallRule {
  target: string;
  mode: string;
  appGuid: string;
  url: string;
}
