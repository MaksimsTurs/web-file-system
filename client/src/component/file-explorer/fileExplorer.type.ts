import type { TFileExplorer } from "@/store/file-explorer/type/fileExplorer.type"

export type FolderProps = {
  index: number
  folder: TFileExplorer
}

export type FileProps = {
  index: number
  file: TFileExplorer
}