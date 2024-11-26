/**
 * Represents encrypted data including the version, encrypted data, key, and IV.
 */
export class EncryptedData {
  /** The encryption version number. */
  public version: number;
  /** The base64-encoded encrypted data. */
  public data: string;
  /** The base64-encoded encrypted AES key. */
  public key: string;
  /** The base64-encoded initialization vector (IV). */
  public iv: string;

  /**
   * Creates an instance of EncryptedData.
   * @param data - The base64-encoded encrypted data.
   * @param key - The base64-encoded encrypted AES key.
   * @param iv - The base64-encoded initialization vector.
   */
  constructor(data: string, key: string, iv: string) {
    this.version = 1;
    this.data = data;
    this.key = key;
    this.iv = iv;
  }
}
