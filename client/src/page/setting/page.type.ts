import type { ExplorerConfiguratinsKeys } from "@/store/file-explorer/fileExplorer.enum"
import type { UseFileExplorerReturn } from "@/hooks/use-file-explorer/useFileExplorer.type"

export type PreviewPathProps = {
  title?: string
  explorer: UseFileExplorerReturn
  wichArray: ExplorerConfiguratinsKeys
}

export type InsertNewPathState = Record<ExplorerConfiguratinsKeys, { path: string, alias?: string } | undefined>