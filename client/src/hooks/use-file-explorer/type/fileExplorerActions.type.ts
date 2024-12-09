import type { ExplorerItemTypes } from "@/store/file-explorer/fileExplorer.enum"
import type { FileExplorer } from "@/store/file-explorer/fileExplorer.type"

export type FileExplorerActions = {
  copyItemsTo: (items: FileExplorer[]) => any
  deleteItemsFrom: (items: FileExplorer[]) => any
  deleteItemFrom: (fullPath: string) => any
  editMediaFile: (params: EditMediaFileData) => any
  editTextFile: (params: EditTextFileData) => any
  // Etra actions
  downloadFilesFromURL: (params: DownloadMediaFilesFromURLsData[]) => any
  createDownloadData: (data: any, urls: string[]) => DownloadMediaFilesFromURLsData[]
  insertSingleItem: (params: InsertSingleItemData) => any
  //TODO:
  // moveItemsTo: (items: FileExplorer[]) => any
}

export type EditMediaFileData = {
  name?: string
  compress?: number
  resize?: [number | null, number | null]
  fullPath: string
}

export type EditTextFileData = {
  name?: string
  content?: string
  fullPath: string
}

export type DownloadMediaFilesFromURLsData = {
  url: string
  name?: string
  compress?: number
  resize?: [number | null, number | null]
}

export type InsertSingleItemData = {
  type: ExplorerItemTypes
} & Partial<Pick<FileExplorer, 'name' | 'content'>>