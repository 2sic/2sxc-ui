export interface EncryptedData {
  version: number;
  data: string;
  key: string;
  iv: string;
}