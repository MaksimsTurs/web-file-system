export default function testRegExp(regexp: RegExp[], str: string): boolean {
  for(let index: number = 0; index < regexp.length; index++) {
    if(regexp[index].test(str)) return true 
  }

  return false
}