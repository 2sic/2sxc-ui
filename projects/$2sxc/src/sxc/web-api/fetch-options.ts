// Define the FetchOptions interface
export interface FetchOptions {
  method?: string;
  encrypt?: boolean | 'auto' | 'force'; // true / false / 'auto' (default) / 'force'
  encryptShowErrorToUser?: boolean;
}
