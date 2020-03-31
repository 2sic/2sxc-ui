import { WindowWith$2sxc, SxcRoot, SxcInstance } from '@2sic.com/2sxc-typings';
import { ElementRef, Injectable } from '@angular/core';
import { appTag } from '../names';
import { ContextInfo } from './context-info';
import { AppTagService } from './apptag.service'
import { ContextInfoPreconfigure } from './context-info-preconfigure'

declare const window: WindowWith$2sxc;

const runtimeDefaults: Partial<ContextInfo> = {
    addHttpHeaders: true
};

@Injectable({
    providedIn: 'root',
})
export class Context implements ContextInfo {
    $2sxc: SxcRoot;
    sxc: SxcInstance;
    addHttpHeaders: boolean;
    appNameInPath: string;
    edition: string;
    apiEdition: string;
    moduleId: number;
    contentBlockId: number;

    private appTagService: AppTagService;
    private preConfiguration: Partial<ContextInfoPreconfigure>;

    constructor() {
        this.$2sxc = window.$2sxc;
        if (this.$2sxc === undefined) {
            throw new Error('window.$2sxc is null - you probably forgot to include the script before loading angular');
        }
        this.check2sxcVersion();
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

        let contextFromApp = {
            // 2019-09-29 2dm important now
            edition: this.appTagService.getAttribute(appTag.edition),
            apiEdition: this.appTagService.getAttribute(appTag.apiEdition)
        }

        // Return an object containing only the not-null properties
        return contextFromApp;
    }

}
