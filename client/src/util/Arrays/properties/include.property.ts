export default function include(what: any[], inArrayOf: any[]): boolean {
  for(let index: number = 0; index < inArrayOf.length; index++) {
    for(let jndex: number = 0; jndex < what.length; jndex++) {
      if(what[jndex] === inArrayOf[index]) return true
    }
  }

  return false
}