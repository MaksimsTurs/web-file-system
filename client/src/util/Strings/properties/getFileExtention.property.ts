export default function getFileExtention(name: string): string {
  let index: number = name.length - 1
  let extention: string[] = []

  for(; index > 0; index--) {
    if(name[index] === '.') return extention.reverse().join('')
    extention.push(name[index])
  }

  return extention.reverse().join('')
}