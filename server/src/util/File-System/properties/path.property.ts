import type { FileSystemPath } from "../FileSystem.type";

const path: FileSystemPath = {
  getName: function(path) {
    const name = path.split(/\\|\//)
    return name[name.length - 1]
  },
  getFileExtention: function(path) {
    let extention: string[] = []

    for(let index: number = path.length - 1; index > 0; index--) {
      if(path[index] === '.') return extention.reverse().join('')
      extention.push(path[index])
    }

    return extention.reverse().join('')
  },
  rename: function(path, newName) {
    const splited: string[] = path.split(/\\/)
    return [...splited.slice(0, -1), newName].join('\\')
  }
}

export default path