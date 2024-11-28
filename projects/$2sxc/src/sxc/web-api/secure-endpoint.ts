import { Sxc } from '../sxc';
import { EncryptedData } from './encrypted-data';

export class SecureEndpoint {
  private encrypt: boolean | 'auto' | 'force';
  private throwIfFails: boolean = false;
  private showErrorToUser: boolean = false;
  private sxc: Sxc;

  constructor(config: {
    sxc: Sxc,
    encrypt?: null | boolean | 'auto' | 'force'; // true / false / 'auto' (default) / 'force'
    showErrorToUser?: boolean 
  }) {
    this.sxc = config.sxc;
    // Set the encryption mode, (null defaults to 'auto')
    this.encrypt = config.encrypt ?? 'auto';
    // If encrypt is 'force' and encryption fails, throw error
    this.throwIfFails = (config.encrypt == true || config.encrypt == 'force') ? true : false;
    // If showErrorToUser is true, show error to user
    this.showErrorToUser = config.showErrorToUser ?? false;
  }

  /**
   * Function to encrypt data
   * @param data - Data to encrypt
   * @returns Encrypted data containing the encrypted key, IV, and encrypted data, or unecrypted data if public key or crypto is not available
   */
  public async encryptData(data: any): Promise<any> {
    // Return unencrypted data if encryption is disabled
    if (this.encrypt === false) 
      return data;

    // Fetch the RSA public key from the server
    const publicKeyPem: string | null = this.sxc.env.publicKey();

    // If the public key is not available, eventaly return original unencrypted data
    if (!publicKeyPem) {
      this.handleOrThrowError("Encryption is not available. Public key is missing.");
      return data; // eventually fallback to return unencrypted data
    }

    // window.crypto.subtle feature is available only in secure browser contexts (HTTPS, localhost, etc). 
    if (!window.crypto.subtle) {
      this.handleOrThrowError("Encryption is not available because 'window.crypto.subtle' is unavailable. Check if page is on HTTPS.");
      return data; // eventually fallback to return unencrypted data
    }

    // Import the RSA public key
    const publicKey: CryptoKey = await this.importPublicKey(publicKeyPem);

    // Generate a random AES key
    const aesKey: CryptoKey = await window.crypto.subtle.generateKey(
      {
        name: "AES-CBC",
        length: 256,
      },
      true, // extractable
      ["encrypt", "decrypt"]
    );

    // Export the AES key to raw bits
    const rawAesKey: ArrayBuffer = await window.crypto.subtle.exportKey("raw", aesKey);

    // Encrypt the AES key using RSA public key
    const encryptedKey: ArrayBuffer = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKey,
      rawAesKey
    );

    // Generate a random IV
    const iv: Uint8Array = window.crypto.getRandomValues(new Uint8Array(16)); // 16 bytes for AES-CBC

    // Convert the data to ArrayBuffer
    const enc: TextEncoder = new TextEncoder();

    const dataString: string = JSON.stringify(data);

    const encodedMessage: Uint8Array = enc.encode(dataString);

    // Encrypt the data using AES key
    const encryptedData: ArrayBuffer = await window.crypto.subtle.encrypt(
      {
        name: "AES-CBC",
        iv: iv,
      },
      aesKey,
      encodedMessage
    );

    // Convert ArrayBuffers to base64 strings
    const encryptedKeyBase64: string = this.arrayBufferToBase64(encryptedKey);
    const encryptedDataBase64: string = this.arrayBufferToBase64(encryptedData);
    const ivBase64: string = this.arrayBufferToBase64(iv.buffer);

    return new EncryptedData(encryptedDataBase64, encryptedKeyBase64, ivBase64);
  }

  /**
   * Handle error as configured. Throw exception or log warning and eventually show alert to user
   * @param message - Error message
   */
  private handleOrThrowError(message: string) {
    if (this.showErrorToUser) alert(message);
    if (this.throwIfFails) {
      // console.error(message);  
      throw new Error(message);
    } else {
      console.warn(message + "\nReturning unencrypted data.");
    } 
  }

  /**
   * Converts SPKI PEM format to DER ArrayBuffer
   * @param spkiPem - SPKI public key in PEM format
   * @returns ArrayBuffer of DER
   */
  private getSpkiDer(spkiPem: string): ArrayBuffer {
    const pemContents: string = spkiPem;
    const binaryDerString: string = window.atob(pemContents);
    return this.str2ab(binaryDerString);
  }

  /**
   * Imports the public key for encryption
   * @param spkiPem - SPKI public key in PEM format
   * @returns CryptoKey usable for encryption
   */
  private async importPublicKey(spkiPem: string): Promise<CryptoKey> {
    // window.crypto.subtle feature is available only in secure browser contexts (HTTPS, localhost, etc).
    return await window.crypto.subtle.importKey(
      "spki",
      this.getSpkiDer(spkiPem),
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      true,
      ["encrypt"]
    );
  }

  /**
   * Converts a string to an ArrayBuffer
   * @param str - Input string
   * @returns ArrayBuffer representation
   */
  private str2ab(str: string): ArrayBuffer {
    const buf: ArrayBuffer = new ArrayBuffer(str.length);
    const bufView: Uint8Array = new Uint8Array(buf);
    for (let i = 0; i < str.length; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  /**
   * Converts an ArrayBuffer to a Base64 string
   * @param buffer - Input ArrayBuffer
   * @returns Base64 encoded string
   */
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes: Uint8Array = new Uint8Array(buffer);
    let binary: string = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}