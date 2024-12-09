export type Console = {
  info: (text: string, object?: any) => void
  error: (text: string, object?: any) => void
}

export enum ConsoleLogLevel {
  ERROR = 'ERROR',
  INFO = 'INFO'
}