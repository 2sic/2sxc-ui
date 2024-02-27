import { InstallSpecs } from './installer-models';

// copied to eav-ui
export interface CrossWindowMessage {
  action: string;
  moduleId: string | number; // probably string, must safely convert to Number()
  packages: InstallPackage[];
}

// copied to eav-ui
export interface InstallPackage {
  displayName: string;
  url: string;
}

// copied to eav-ui
export interface SpecsForInstaller {
  action: 'specs';
  data: InstallSpecs;
}
