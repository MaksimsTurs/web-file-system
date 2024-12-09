import type { FileExplorerInitState } from "@/store/file-explorer/fileExplorer.type"
import type { AppDispatch } from "@/store/store"
import type { FileExplorerModes } from "../type/fileExplorerModes.type"

import { setModesValues } from "@/store/file-explorer/fileExplorer.slice"

export default function getModes(Explorer: FileExplorerInitState, dispatch: AppDispatch): FileExplorerModes {
  return {
    ...Explorer.modes,
    setModesValues: (params) => {
      dispatch(setModesValues(params))
    }
  }
}