import type { DownloadMediaFilesFromURLsData, EditMediaFileData, EditTextFileData, InsertSingleItemData } from "@/hooks/use-file-explorer/type/fileExplorerActions.type"
import type { FileExplorerMoveData } from "@/hooks/use-file-explorer/type/fileExplorerLocation.type"
import type { FileExplorer } from "./fileExplorer.type"

export type InsertSingleItemExtraReturn = InsertSingleItemData

export type InsertSingleItemExtraParam = InsertSingleItemData

export type FileExplorerMoveExtraReturn = {
  folder?: FileExplorer[]
} & FileExplorerMoveData

export type FileExplorerMoveExtraParam = {
  path?: string  //Full name of the path
} & FileExplorerMoveData

export type EditTextFileExtraReturn = {
  oldFullPath: string
  size: number
} & EditTextFileData

export type EditTextFileExtraParam = EditTextFileData

export type EditMediaFileExtraReturn = {
  oldFullPath: string
  size: number
} & Pick<EditMediaFileData, 'name' | 'fullPath'>

export type EditMediaFileExtraParam = EditMediaFileData

export type DownloadMediaFilesFromURLsExtraReturn = {
  files: FileExplorer[]
}

export type DownloadMediaFilesFromURLsExtraParama = {
  filesToDownload: DownloadMediaFilesFromURLsData[]
  saveInToPath: string
}

export type DeleteItemsExtraReturn = {
  fullPaths: string[]
}

export type DeleteItemsExtraParam = {
  pathTo: string
  itemPaths: string[] 
}

export type CopyItemsToExtraReturn = {
  files: FileExplorer[]
}

export type CopyItemsToExtraParam = {
  pathTo: string
  items: FileExplorer[]
  itemPaths: string[] 
}

export type DeleteFileExtraReturn = {
  fullPath: string
}