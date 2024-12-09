import type { FileExplorerInitState } from "@/store/file-explorer/fileExplorer.type"
import type { FileExplorerLocation } from "../type/fileExplorerLocation.type"
import type { AppDispatch } from "@/store/store"

import fileExplorerMove from "@/store/file-explorer/action/fileExplorerMove.action"
import joinPath from "../util/joinPath.util"

export default function getLocation(Explorer: FileExplorerInitState, dispatch: AppDispatch): FileExplorerLocation {
  return {
    ...Explorer.location,
    move: (params) => {
      dispatch(fileExplorerMove({...params, path: joinPath([...Explorer.location.string, params.to!]) }))
    }
  }
}