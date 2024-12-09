import type { FetcherUtil, ParamHeaders } from "./Fetcher.type"

const Fetcher: FetcherUtil = {
  base: undefined,
  get: async function<T>(URL: string, headers?: ParamHeaders) {
    const response = await fetch(formatURL(URL, this.base), {...formatInit(undefined, headers), body: undefined })
    const data = await response.json()

    if(!response.ok) throw data

    return data as T
  },
  post: async function<T>(URL: string, body?: any, headers?: any) { 
    const response = await fetch(formatURL(URL, this.base), { method: 'POST', ...formatInit(body, headers) })
    const data = await response.json()

    if(!response.ok) throw data
    
    return data as T
  }
}

function formatURL(URL: string, base?: string): string {
  if(base) return `${base}${URL}`
  return URL
}

function formatInit(body?: any, headers?: ParamHeaders): any {
  let init = { headers: headers || {}, body: body || {} }

  if(body && !(body instanceof FormData)) {
    if(!headers) init.headers = { 'Content-Type': 'application/json' }
    if(headers && !('Content-Type' in headers)) init.headers = {...init.headers, 'Content-Type': 'application/json'}
    
    return {...init, body: JSON.stringify(body) }
  }

  return init
}

export default Fetcher