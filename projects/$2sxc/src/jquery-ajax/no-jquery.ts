export class NoJQ {

  /** https://api.jquery.com/jquery.param/ */
  static param(obj: any): string {
    const param = Object.entries(obj)
      .map(([k, v]) => `${encodeURIComponent(k)}=${typeof v === 'string' ? encodeURIComponent(v) : encodeURIComponent(JSON.stringify(v))}`)
      .join('&');
    return param;
  }
}
