import type { ExplorerMoveDirections } from "@/store/file-explorer/fileExplorer.enum"

export type FileExplorerLocation = {
  string: string[]
  numeric: number[]
  move: (params: FileExplorerMoveData) => any
}

export type FileExplorerMoveData = {
  to?: string    //Name of the folder
  deep?: number  //Index of the folder in files array
  direction: ExplorerMoveDirections
}