export default function isObjectEmpty(object?: any): boolean {
  if(!object) return true

  return !(Object.keys(object).length > 0)
}