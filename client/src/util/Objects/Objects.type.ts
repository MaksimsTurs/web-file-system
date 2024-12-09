export type ObjectsUtil = {
  inObject: <T>(keys: (keyof T)[], object?: T) => boolean
  createFormDataFromJSON: (object: any) => FormData
}