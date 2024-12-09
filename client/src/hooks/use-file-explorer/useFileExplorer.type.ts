import type { FileExplorer } from "@/store/file-explorer/fileExplorer.type";
import type { ServerErrorResponse } from "@/global.type";

import type { FileExplorerActions } from "./type/fileExplorerActions.type";
import type { FileExplorerLocation } from "./type/fileExplorerLocation.type";
import type { FileExplorerModes } from "./type/fileExplorerModes.type";
import type { FileExplorerConfigurations } from "./type/fileExplorerConfigurations.type";
// import type TFileExplorerTools from "./type/fileExplorerTools.type";

export type UseFileExplorerReturn = {
  explorer: FileExplorer[]
  localError?: string
  globalError?: ServerErrorResponse
  isLoading: boolean
  getExplorer: () => FileExplorer[]
  getItem: (index: string | undefined) => FileExplorer | undefined
  actions: FileExplorerActions
  location: FileExplorerLocation
  modes: FileExplorerModes
  configurations: FileExplorerConfigurations
  // tools: TFileExplorerTools
}