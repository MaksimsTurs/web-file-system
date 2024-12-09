export default function inObject<T>(keys: (keyof T)[], object?: any,): boolean {
  if(!object) return false

  for(let index: number = 0; index < keys.length; index++) {
    if(keys[index] in object) return true
  }

  return false
}