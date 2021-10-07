import { NoJQ } from '../../jquery-ajax/no-jquery';
import { SxcInstance } from '../sxc-instance';

/**
 * Helper API to run ajax / REST calls to the server
 * it will ensure that the headers etc. are set correctly
 * and that urls are rewritten
 */
export class SxcWebApi2 {

    constructor(private readonly sxc: SxcInstance) { }

    get<T = any>(
        url: string,
        params?: Record<string, any>,
        preventAutoFail?: boolean,
        headers?: Record<string, string>,
        success?: (data: T) => void,
        error?: (error: Error) => void,
    ): Promise<T> {
        return this.request<T>('GET', url, headers, params, undefined, success, error, preventAutoFail);
    }

    post<T = any>(
        url: string,
        params?: Record<string, any>,
        data?: Record<string, any>,
        preventAutoFail?: boolean,
        headers?: Record<string, string>,
        success?: (data: T) => void,
        error?: (error: Error) => void,
    ): Promise<T> {
        return this.request<T>('POST', url, headers, params, data, success, error, preventAutoFail);
    }

    delete<T = any>(
        url: string,
        params?: Record<string, any>,
        data?: Record<string, any>,
        preventAutoFail?: boolean,
        headers?: Record<string, string>,
        success?: (data: T) => void,
        error?: (error: Error) => void,
    ): Promise<T> {
        return this.request<T>('DELETE', url, headers, params, data, success, error, preventAutoFail);
    }

    put<T = any>(
        url: string,
        params?: Record<string, any>,
        data?: Record<string, any>,
        preventAutoFail?: boolean,
        headers?: Record<string, string>,
        success?: (data: T) => void,
        error?: (error: Error) => void,
    ): Promise<T> {
        return this.request<T>('PUT', url, headers, params, data, success, error, preventAutoFail);
    }

    private request<T>(
        method: 'GET' | 'POST' | 'DELETE' | 'PUT',
        url: string,
        headers?: Record<string, string>,
        params?: Record<string, any>,
        data?: Record<string, any>,
        success?: (data: T) => void,
        error?: (error: Error) => void,
        preventAutoFail = false,
    ): Promise<T> {
        const urlParts = url.split('/');
        if (urlParts.length === 2 && urlParts[0] && urlParts[1]) {
            const controller = urlParts[0];
            const action = urlParts[1];
            url = `app/auto/api/${controller}/${action}`;
        }
        url = this.sxc.root.http.apiUrl(url);

        const urlObj = new URL(url, location.origin);

        const headersObj = new Headers();
        Object.entries({
            'accept': 'application/json, text/javascript, */*; q=0.01',
            'content-type': 'application/json',
            'x-requested-with': 'XMLHttpRequest',
            ...this.headers(),
            ...(headers ?? {}),
        }).forEach(([k, v]) => {
            // ignores casing, e.g. 'Content-Type' and 'content-type'
            headersObj.set(k, v);
        });

        const init: RequestInit = {
            headers: headersObj,
            method,
        };
        if (params != null) {
            const searchParams = new URLSearchParams(NoJQ.param(params));
            searchParams.forEach((value, key) => {
                urlObj.searchParams.append(key, value);
            });
        }
        if (data != null) {
            init.body = JSON.stringify(data);
        }

        const request = new Request(urlObj.href, init);

        return fetch(request)
            .then(response => {
                return Promise.all([
                    Promise.resolve(response),
                    response.status >= 200 && response.status < 300 ? response.json() : response.text(),
                ]);
            })
            .then(([response, data]) => {
                if (response.status >= 200 && response.status < 300) {
                    return data;
                }
                const err = new Error(response.statusText) as HttpError2;
                err._request = request;
                err._response = response;
                err._responseText = data;
                throw err;
            })
            .then(data => {
                success?.(data);
                return data;
            })
            .catch((err: HttpError2) => {
                error?.(err);
                if (preventAutoFail) {
                    throw err;
                }
                this.sxc.showDetailedHttpError2(err);
                return undefined;
            });
    }

    /**
     * All the headers which are needed in an ajax call for this to work reliably.
     * Use this if you need to get a list of headers in another system
     */
    headers(): Record<string, string> {
        return this.sxc.root.http.headers(this.sxc.id, this.sxc.cbid);
    }
}

export interface HttpError2 extends Error {
    _request: Request;
    _response: Response;
    _responseText: string;
}
