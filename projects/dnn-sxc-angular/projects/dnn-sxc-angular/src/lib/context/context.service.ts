import {  SxcGlobal, Sxc } from '@2sic.com/2sxc-typings';
import { ElementRef, Injectable } from '@angular/core';
import { appTag } from '../names';
import { ContextInfo } from './context-info';
import { AppTagService } from './apptag.service'
import { ContextInfoPreconfigure } from './context-info-preconfigure'

declare const window: Window;

const runtimeDefaults: Partial<ContextInfo> = {
    addHttpHeaders: true
};

let constructorCount = 0;

/** WebPack variable for loading chunks in angular */
declare let __webpack_public_path__: any;


/**
 * The Context gives you things from DNN and 2sxc which matches the current runtime context.
 * So it auto-detects what's going on in the page and initializes / provides everything.
 *
 * Note: some properties like moduleId are probably not actually in use any more and will probably be empty
 *
 * @export
 * @class Context
 * @implements {ContextInfo}
 */
@Injectable({
    providedIn: 'root',
})
export class Context implements ContextInfo {
  /** The global $2sxc object */
  $2sxc: SxcGlobal;

  /** The current module-instance 2sxc-controller */
  sxc: Sxc;

  /** Setting if it should add HTTP headers. Default is true. You may want to change this if you have an own interceptor.  */
  addHttpHeaders: boolean;

  /** The current app name - used in API calls */
  appNameInPath: string;

  /** The current edition to use for the application. */
  edition: string;

  /** The API edition to use - if you use API-editions (recommended). Will usually be the same as the edition. */
  apiEdition: string;

  /** The Module ID if it was custom-configured. Will be 'unknown' if not manually set, as then the auto-configure will be used */
  moduleId: number;

  /** The Content Block ID if it was custom-configured. Will be 'unknown' if not manually set, as then the auto-configure will be used */
  contentBlockId: number;

  /**
   * The path angular is running in - it's important for lazy-loading to work properly.
   *
   * New in v11.01
   */
  angularPath?: string;

    private appTagService: AppTagService;
    private preConfiguration: Partial<ContextInfoPreconfigure>;

    constructor() {
        this.$2sxc = window.$2sxc;
        if (this.$2sxc === undefined) {
            throw new Error('window.$2sxc is null - you probably forgot to include the script before loading angular');
        }
        this.check2sxcVersion();

        constructorCount++;
        if (constructorCount > 1) {
          console.warn('The Context object of dnn-sxc-angular was created more than once. This is unexpected, and will probably lead to problems with the api calls.')
        }
    }

    private check2sxcVersion() {
        // Actually the required version is 10.25.2, but 2sxc-ui reports 10.25.1 in 2sxc 10.25.2
        const requiredVersion = [10,25,1];
        const version = this.$2sxc.sysinfo.version.split('.').map((v) => parseInt(v));

        // Reduce version to comparision number - 0 means equal, 1 means version > requiredVersion, -1 means version < requiredVersion
        const compareVersions = requiredVersion.reduce((acc, _, i) => acc != 0 ? acc : Math.sign(version[i] - requiredVersion[i]), 0);

        if(compareVersions < 0) {
            throw new Error(`Installed 2sxc version is ${version.join('.')} but ${requiredVersion.join('.')} is required for dnn-sxc-angular.`);
        }
    }

    /**
     * Pre-Configure this context - can be used to configure values in a subclass
     * @param preConfig Pre-Configuration values for this context
     */
    preConfigure(preConfig: Partial<ContextInfoPreconfigure>) {
        this.preConfiguration = preConfig;
        return this;
    }

    /**
     * Configure 2sxc in the context of a HTMLNode.
     * @param htmlNode the HTMLNode
     */
    autoConfigure(htmlNode: ElementRef) {

        this.appTagService = new AppTagService(htmlNode);

        let settings = {
            ...runtimeDefaults, // defaults - lowest priority
            ...this.getContextFromAppTag(), // app tags override settings
            ...this.preConfiguration
        } as ContextInfo;

        // Use pre-configured values already in settings if defined; otherwise
        // get from HTMLNode
        settings.sxc = settings.sxc ||
            (settings.moduleId
            ? this.$2sxc(settings.moduleId, settings.contentBlockId)
            : this.$2sxc(htmlNode.nativeElement));

        if (!settings.sxc) {
            throw new Error('couldn\'t get sxc instance - reason unknown');
        }

        this.sxc = settings.sxc;
        this.addHttpHeaders = settings.addHttpHeaders;
        this.appNameInPath = settings.appNameInPath;
        this.edition = settings.edition;
        this.apiEdition = settings.apiEdition;

        // new in 11.01 - change the base path for angular chunks if needed
        if (settings.angularPath) {
          this.angularPath = settings.angularPath;
          console.log('will set webpcak base to: ' + settings.angularPath);
          __webpack_public_path__ = settings.angularPath;
          console.log('done setting');
        }
    }

    /**
     * Get an attribute value from the app-tag
     * @param name attribute name
     */
    public getAppAttribute(name: string): string {
      return this.appTagService.getAttribute(name);
    }

    /**
     * Get context information like module-id from the app-root tag
     * new in Dnn-Sxc-Angular 8
     */
    private getContextFromAppTag() : Partial<ContextInfo> {

        let contextFromApp: Partial<ContextInfo> = {
            edition: this.appTagService.getAttribute(appTag.edition),
            apiEdition: this.appTagService.getAttribute(appTag.apiEdition),
            // 2021-02-26 2dm v11.01 added
            angularPath: this.appTagService.getAttribute(appTag.angularPath),
        }

        // Return an object containing only the not-null properties
        return contextFromApp;
    }

}
