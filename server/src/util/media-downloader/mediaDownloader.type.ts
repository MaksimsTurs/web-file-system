import STRING from "../../const/string.const"

export type DataToDownload = {
  url: string
  name?: string
  compress?: number
  resize?: [number | null, number | null]
}

export type DataOfDownloadedItem = {
  name: string
  fullPath: string
  size: number
  type: keyof typeof STRING.FILE_EXPLORER_ITEM_TYPES
}