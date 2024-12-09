export type KeyValueObject<T = any> = { 
  [key: string]: T 
}

export type ServerErrorResponse = {
  code: number
  message: string
}