import type { FileExplorerInitState } from "@/store/file-explorer/fileExplorer.type"
import type { AppDispatch } from "@/store/store"
import type { FileExplorerConfigurations } from "../type/fileExplorerConfigurations.type"

import { initializeWorkSpaces, insertPath, removePath } from "@/store/file-explorer/fileExplorer.slice"

import { useEffect } from "react"

export default function getConfigurations(Explorer: FileExplorerInitState, dispatch: AppDispatch): FileExplorerConfigurations {
  return {
    ...Explorer,
    IS_INITIALIZED: Explorer.modes.IS_INITIALIZED,
    initializeWorkSpaces: () => {
      useEffect(() => {
        if(!Explorer.modes.IS_INITIALIZED) dispatch(initializeWorkSpaces())
      }, [])
    },
    insertPath: (params) => {
      dispatch(insertPath(params))
    },
    removePath: (params) => {
      dispatch(removePath(params))
    }
  }
}