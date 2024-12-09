import type { ServerErrorResponse } from "@/global.type"
import type { ExplorerItemTypes } from "./fileExplorer.enum"

export type FileExplorer = {
  name: string
  type: ExplorerItemTypes
  fullPath: string
  alias?: string
  size?: number
  dimension?: {
    width: number
    height: number
  }
  content?: string
  files?: FileExplorer[]
}

export type FileExplorerInitState = {
  explorer: FileExplorer[]
  workSpaces: WorkSpace[]
  excludePaths: string[]
  itemsToCopyRemoveOrMove: string[]
  isLoading: boolean
  globalError?: ServerErrorResponse
  location: {    
    numeric: number[] //Used by client for navigation or actions
    string: string[]  //Used by server for navigation or actions
  }
  modes: {
    IS_INSERT_FOLDER_MODE: boolean
    IS_INSERT_FILE_MODE: boolean
    IS_DELETE_MODE: boolean
    IS_MOVE_MODE: boolean
    IS_COPY_MODE: boolean
    IS_INITIALIZED: boolean
  }
}

export type WorkSpace = { path: string, alias?: string }