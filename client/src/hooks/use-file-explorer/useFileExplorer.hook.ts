import type { AppDispatch, RootState } from "@/store/store";
import type { FileExplorer, FileExplorerInitState } from "@/store/file-explorer/fileExplorer.type";
import type { UseFileExplorerReturn } from "./useFileExplorer.type";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import getActions from "./properties/getActions.property";
import getLocation from "./properties/getLocation.property";
import getModes from "./properties/getModes.property";
import getConfigurations from "./properties/getConfigurations.property";

export default function useFileExplorer(): UseFileExplorerReturn {
  const Explorer = useSelector<RootState, FileExplorerInitState>(state => state.fileExplorer),
        dispatch = useDispatch<AppDispatch>(),
        navigate = useNavigate(),
        [localError, setLocalError] = useState<string | undefined>()

  return {
    ...Explorer,
    getExplorer: () => {
      let fileExplorer: FileExplorer[] = Explorer.explorer

      if(Explorer.location.numeric.length === 0) {
        return fileExplorer
      }

      for(let index: number = 0; index < Explorer.location.numeric.length; index++) {
        fileExplorer = fileExplorer[Explorer.location.numeric[index]].files || []
      }
    
      return fileExplorer 
    },
    getItem: (index) => {
      if(!index) return undefined

      let items: FileExplorer[] = Explorer.explorer
    
      for(let index: number = 0; index < Explorer.location.numeric.length; index++) {
        items = items[Explorer.location.numeric[index]].files || []
      }
    
      return items[parseInt(index)]
    },
    localError,
    actions: {...getActions(Explorer, dispatch, navigate) },
    location: {...getLocation(Explorer, dispatch) },
    modes: {...getModes(Explorer, dispatch) },
    configurations: {...getConfigurations(Explorer, dispatch) }
  }
}