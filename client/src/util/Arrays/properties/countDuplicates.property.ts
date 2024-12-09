export default function countDuplicates<T>(array: any[], find: (keyof T)[]): Record<keyof T, number> {
  //@ts-ignore
  let count: Record<keyof T, number> = {}

  for(let index: number = 0; index < array.length; index++) {
    for(let jndex: number = 0; jndex < find.length; jndex++) {
      const a = array[index],
            b = find[jndex]
      
      if(a === b) count?.[b] ? count[b]++ : count[b] = 1
    }
  }
  
  return count!
}