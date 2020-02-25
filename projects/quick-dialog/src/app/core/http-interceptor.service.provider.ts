import { Http2sxc } from './http-interceptor.service';
import { Http, XHRBackend, RequestOptions } from "@angular/http";
import { $2sxcService } from "app/core/$2sxc.service";

export function Http2SxcProviderFactory(backend: XHRBackend, defaultOptions: RequestOptions, sxc: $2sxcService) {
    return new Http2sxc(backend, defaultOptions, sxc);
}

export let Http2SxcHttpProvider =
    {
        provide: Http,
        useFactory: Http2SxcProviderFactory,
        deps: [XHRBackend, RequestOptions, $2sxcService]
    };
