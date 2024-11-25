import { EncryptedData } from "./encrypted-data";

declare global {
  interface Window {
    $2sxc: {
      env: {
        secureEndpointPublicKey: () => string;
      };
    };
  }
}

export class SecureEndpoint {
  private cachedPublicKey: string | null = null;

  /**
   * Function to encrypt data
   * @param data - Data to encrypt
   * @returns Encrypted data containing the encrypted key, IV, and encrypted data, or unecrypted data if public key or crypto is not available
   */
  public async encryptData(data: any): Promise<any> {
    // Fetch the RSA public key from the server
    const publicKeyPem: string | null = await this.getPublicKey();

    // Enable/disable secure-endpoint feature (implicit by existance of SecureEndpointPublicKey in html).
    // If the public key is not available, return original unencrypted data
    if (!publicKeyPem) {
      console.warn("Public key not available. Returning unencrypted data.");
      return data;
    }

    // window.crypto.subtle feature is available only in secure browser contexts (HTTPS). 
    // Need to provide warning and fallback when feature is missing.
    if (!window.crypto.subtle) {
      console.warn("window.crypto.subtle is not available. Check if pages is on HTTPS. Returning unencrypted data.");
      return data;
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
   * Read the public key from the jsApi
   */
  private getPublicKey(): string {
    if (this.cachedPublicKey !== null) {
      return this.cachedPublicKey;
    }

    this.cachedPublicKey = window.$2sxc.env.secureEndpointPublicKey()
    return this.cachedPublicKey;
  }

  /**
   * Converts SPKI PEM format to DER ArrayBuffer
   * @param spkiPem - SPKI public key in PEM format
   * @returns ArrayBuffer of DER
   */
  private getSpkiDer(spkiPem: string): ArrayBuffer {
    const pemContents: string = this.getPemContents(spkiPem);
    const binaryDerString: string = window.atob(pemContents);
    return this.str2ab(binaryDerString);
  }

  /**
   * Extracts the base64 content from a PEM formatted string
   * @param spkiPem - SPKI public key in PEM format
   * @returns Base64 string without PEM headers/footers and quotes
   */
  private getPemContents(spkiPem: string): string {
    let pemContent: string = spkiPem;
    pemContent = pemContent.replace(/\\r\\n/g, '');
    pemContent = this.removeFromStart(pemContent, "-----BEGIN PUBLIC KEY-----");
    pemContent = this.removeFromEnd(pemContent, "-----END PUBLIC KEY-----");
    pemContent = this.removeFromStart(pemContent, `"`);
    pemContent = this.removeFromEnd(pemContent, `"`);
    return pemContent;
  }

  /**
   * Removes a specified substring from the start of the content if it exists
   * @param content - Original string
   * @param remove - Substring to remove
   * @returns Modified string
   */
  private removeFromStart(content: string, remove: string): string {
    return content.startsWith(remove) ? content.substring(remove.length) : content;
  }

  /**
   * Removes a specified substring from the end of the content if it exists
   * @param content - Original string
   * @param remove - Substring to remove
   * @returns Modified string
   */
  private removeFromEnd(content: string, remove: string): string {
    return content.endsWith(remove) ? content.substring(0, content.length - remove.length) : content;
  }

  /**
   * Imports the public key for encryption
   * @param spkiPem - SPKI public key in PEM format
   * @returns CryptoKey usable for encryption
   */
  private async importPublicKey(spkiPem: string): Promise<CryptoKey> {
    // TODO: #2 window.crypto.subtle feature is available only in secure browser contexts (HTTPS). Need to provide warning and fallback when feature is missing.
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