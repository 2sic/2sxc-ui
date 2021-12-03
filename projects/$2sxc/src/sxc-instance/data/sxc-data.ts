import { SxcInstance } from "..";
import { SxcWebApi } from "../web-api/sxc-web-api";

export class SxcData {
  private readonly webApi: SxcWebApi;
  
  constructor(
    private readonly sxc: SxcInstance,
    readonly contentType: string
    ) {
    this.webApi = sxc.webApi;
    
    if (contentType == null) throw "contentType is empty";
    if (contentType.indexOf("/") != -1 || contentType.indexOf("\\") != -1)
      throw "contentType has slashes - not allowed";
  }
      
  get<T = any>(ids?: string | number, params?: string | Record<string, any>): Promise<T> {
    let path = "app/auto/content/" + this.contentType;
    if (ids && (typeof ids === 'string' || typeof ids === 'number')) path += "/" + ids;
    return this.webApi.fetchJson(this.webApi.url(path, params));
  }
}
