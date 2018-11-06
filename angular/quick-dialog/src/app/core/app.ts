export class App {
    AppId: number;
    Name: string;
    Thumbnail: string;
    SupportsAjaxReload: boolean;
    Version: string;
    VersionMain: number;

    constructor(json: any) {
        Object.assign(this, json);

        try {
            this.VersionMain = parseInt(this.Version.substr(0,2));
        } catch(e) { /* ignore */}
    }

}
