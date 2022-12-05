import { InstallSpecs } from './installer-models';
export interface CrossWindowMessage {
  action: string;
  moduleId: string | number; // probably string, must safely convert to Number()
  packages: InstallPackage[];
}

export interface InstallPackage {
  displayName: string;
  url: string;
}

export interface SpecsForInstaller {
  action: 'specs';
  data: InstallSpecs;
}
