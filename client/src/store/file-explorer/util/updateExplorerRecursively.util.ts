import type { FileExplorer } from "../fileExplorer.type"

export default function updateExplorerRecursively(
  explorer: FileExplorer[], 
  deep: number[], 
  callback: (files: FileExplorer[], deep: number[], index: number) => FileExplorer[]
) {
  let index: number = 0

  const update = (deeperExplorer: FileExplorer[]) => {
    if(index === deep.length - 1) {
      deeperExplorer[deep[index]].files = callback(deeperExplorer[deep[index]].files || [], deep, index)
      return
    }

    update(deeperExplorer[deep[index++]]?.files || [])
  }

  update(explorer)
}