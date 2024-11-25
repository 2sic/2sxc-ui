export class EncryptedData {
  public version: number;
  public data: string;
  public key: string;
  public iv: string;

  constructor(data: string, key: string, iv: string) {
    this.version = 1;
    this.data = data;
    this.key = key;
    this.iv = iv;
  }
}
