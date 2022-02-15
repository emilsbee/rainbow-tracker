export type ApiError = {
  message: string;
};

type Body =
  | Blob
  | Int8Array
  | Int16Array
  | Int32Array
  | Uint8Array
  | Uint16Array
  | Uint32Array
  | Uint8ClampedArray
  | Float32Array
  | Float64Array
  | DataView
  | ArrayBuffer
  | FormData
  | string
  | null;

type RequestInitWithObjectBody = Omit<RequestInit, 'body'> & {
  body?: Body;
};

type RequestOptions = {
  path: string;
  options: RequestInitWithObjectBody;
  file: any;
  json: boolean;
  withAuth?: boolean;
};

type Options = {
  path: string;
  withAuth?: boolean;
  body?: any;
  query?: any;
  file?: boolean;
  json?: boolean;
  upload?: boolean;
  url?: string;
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT'
}

export type RequestApi = {
  get: FetchCall;
  del: FetchCall;
  post: FetchCall;
  put: FetchCall;
  patch: FetchCall;
};

export type FetchOptions = Omit<Options, 'method'>;

export type Request = <T = any>(options: RequestOptions) => Promise<T>;

export type FetchCall = <T = any>(args: FetchOptions) => Promise<T>;

export type GenerateOptions = (options: Options) => RequestOptions;

export type SetupRequest = (options: Options) => Promise<any>;
