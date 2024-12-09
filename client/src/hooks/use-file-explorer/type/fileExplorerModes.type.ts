import { ExplorerModes } from "@/store/file-explorer/fileExplorer.enum"

export type FileExplorerModes = {
  IS_COPY_MODE: boolean
  IS_MOVE_MODE: boolean
  IS_DELETE_MODE: boolean
  IS_INSERT_FILE_MODE: boolean
  IS_INSERT_FOLDER_MODE: boolean
  setModesValues: (params: SetModesValueData) => any
}

export type SetModesValueData = {
  [key in ExplorerModes]?: boolean
}