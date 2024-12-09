import type { ExplorerConfiguratinsKeys } from "@/store/file-explorer/fileExplorer.enum"
import type { WorkSpace } from "@/store/file-explorer/fileExplorer.type"

export type FileExplorerConfigurations = {
  IS_INITIALIZED: boolean
  excludePaths: string[]
  workSpaces: WorkSpace[]
  insertPath: (params: ExplorerConfigurationInsertPathData) => any
  removePath: (params: ExplorerConfigurationDeletePath) => any
  initializeWorkSpaces: () => any
}

export type ExplorerConfigurationInsertPathData = {
  toArray: ExplorerConfiguratinsKeys
  value?: WorkSpace | string
}

export type ExplorerConfigurationDeletePath = {
  fromArray: ExplorerConfiguratinsKeys
  value?: string
}