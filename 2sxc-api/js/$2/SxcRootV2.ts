import { Environment } from '../environment/Environment';
import { SxcHttp } from './SxcHttp';

// const environment = new Environment();

export class SxcRootV2 {
    /**
     * Environment information
     * @type {Environment}
     */
    public env = new Environment();

    public http: SxcHttp;

    constructor() {
        this.http = new SxcHttp(this);
    }

}
