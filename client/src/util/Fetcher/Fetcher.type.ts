export type FetcherUtil = {
  base?: string
  get: <T>(URL: string, headers?: ParamHeaders) => Promise<T>
  post: <T>(URL: string, body?: any, headers?: ParamHeaders) => Promise<T>
}

export type THeadersKeys = 
  'Content-Length'   |
  'Content-Type'     |
  'Accept-Encoding'  |
  'Cache-Control'    |
  'Content-Language' |
  'Expires'          |
  'Last-Modified'    |
  'Pragma'           |
  'Authentification'

export type ParamHeaders = Record<THeadersKeys, string>