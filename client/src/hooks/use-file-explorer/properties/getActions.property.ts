import copyItemsTo from "@/store/file-explorer/action/copyItemsTo.action"
import deleteFileFrom from "@/store/file-explorer/action/deleteFileFrom.action"
import deleteItemsFrom from "@/store/file-explorer/action/deleteItemsFrom.action"
import editMediaFile from "@/store/file-explorer/action/editMediaFile.action"
import editTextFile from "@/store/file-explorer/action/editTextFile.action"
// import moveItemsTo from "@/store/file-explorer/action/moveItemsTo.action"
import downloadFilesFromURL from "@/store/file-explorer/action/downloadFilesFromURL.action"
import insertSingleItem from "@/store/file-explorer/action/insertSingleItem.action"

import type { FileExplorerInitState } from "@/store/file-explorer/fileExplorer.type"
import type { AppDispatch } from "@/store/store"
import type { NavigateFunction } from "react-router-dom"
import type { DownloadMediaFilesFromURLsData, FileExplorerActions } from "../type/fileExplorerActions.type"

import joinPath from "../util/joinPath.util"

export default function getActions(Explorer: FileExplorerInitState, dispatch: AppDispatch, navigate: NavigateFunction): FileExplorerActions {
  return {
    copyItemsTo: (items) => {
      const itemPaths = items.map(item => item.fullPath),
            params = { itemPaths, items, pathTo: joinPath(Explorer.location.string) }

      dispatch(copyItemsTo(params))
    },
    deleteItemsFrom: (items) => {
      const itemPaths = items.map(item => item.fullPath),
            params = { itemPaths, pathTo: joinPath(Explorer.location.string) }

      dispatch(deleteItemsFrom(params))
    },
    deleteItemFrom: (fullPath) => {
      dispatch(deleteFileFrom(fullPath))
      navigate(-1)
    },
    editMediaFile: (param) => {
      dispatch(editMediaFile(param))
    },
    editTextFile: (param) => {
      dispatch(editTextFile(param))
    },
    downloadFilesFromURL: (params) => {
      dispatch(downloadFilesFromURL({ filesToDownload: params, saveInToPath: joinPath(Explorer.location.string) }))
    },
    insertSingleItem: (params) => {
      dispatch(insertSingleItem(params))
    },
    createDownloadData: (data, urls) => {
      let toDownload: DownloadMediaFilesFromURLsData[] = []
      
      for(let index: number = 0; index < urls.length; index++) {
        toDownload.push({
          url: urls[index],
          compress: parseInt(data[`${index}-compress`] || '0') || undefined,
          name: data[`${index}-name`] || undefined,
          resize: [parseInt(data[`${index}-resize-x`]) || null, parseInt(data[`${index}-resize-y`]) || null]
        })
      }

      return toDownload
    }
    // moveItemsTo: (fileNames) => {
    //   dispatch(moveItemsTo({ itemPaths: fileNames, pathToCopy: joinPath(location.string) }))
    // },
  }
}