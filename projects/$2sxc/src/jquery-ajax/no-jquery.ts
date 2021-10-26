export class NoJQ {

  /** https://api.jquery.com/ready/ */
  static ready(callback: () => void): void {
    if (document.readyState === 'complete') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', () => callback(), { once: true });
    }
  }

  /** https://api.jquery.com/jquery.param/ */
  static param(obj: any): string {
    const param = Object.entries(obj)
      .map(([k, v]) => `${encodeURIComponent(k)}=${typeof v === 'string' ? encodeURIComponent(v) : encodeURIComponent(JSON.stringify(v))}`)
      .join('&');
    return param;
  }
}
