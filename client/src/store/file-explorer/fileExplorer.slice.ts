import { createSlice } from "@reduxjs/toolkit"

import { FileExplorerInitState, WorkSpace } from "./fileExplorer.type"
import type { 
  InsertPathToConfigPayload, 
  DeletePathFromConfigPayload, 
  SetModesValuePayload
} from "./reducers.type"

import fileExplorerMove from "./action/fileExplorerMove.action"
import copyItemsTo from "./action/copyItemsTo.action"
import deleteFileFrom from "./action/deleteFileFrom.action"
import deleteItemsFrom from "./action/deleteItemsFrom.action"
import editMediaFile from "./action/editMediaFile.action"
import editTextFile from "./action/editTextFile.action"

import { 
  ExplorerConfiguratinsKeys, 
  ExplorerItemTypes, 
  ExplorerModes, 
  ExplorerMoveDirections 
} from "./fileExplorer.enum"

import updateExplorerRecursively from "./util/updateExplorerRecursively.util"

import LocalStorage from "@/util/Local-Storage/localStorage.util"

const initState: FileExplorerInitState = {
  ...LocalStorage.get<FileExplorerInitState>('CONFIGURATION', '{ "workSpaces": [], "excludePaths": [] }'),
  explorer: [],
  itemsToCopyRemoveOrMove: [],
  location: { numeric: [], string: [] },
  isLoading: false, 
  globalError: undefined,
  modes: {
    IS_COPY_MODE: false, 
    IS_INITIALIZED: false, 
    IS_INSERT_FILE_MODE: false,
    IS_INSERT_FOLDER_MODE: false, 
    IS_MOVE_MODE: false,
    IS_DELETE_MODE: false,
  }
}

const slice = createSlice({
  name: 'file-explorer',
  initialState: initState,
  reducers: {
    initializeWorkSpaces: (state) => {
      state.explorer = state.workSpaces.map(space => ({ name: space.path, alias: space.alias, type: ExplorerItemTypes.FOLDER, fullPath: space.path }))
      state.modes.IS_INITIALIZED = true
    },
    setModesValues: (state, { payload }: SetModesValuePayload) => {
      const modesKeys: string[] = Object.keys(state.modes)

      for(let key in modesKeys) {
        if(typeof payload[modesKeys[key] as ExplorerModes] === 'undefined') state.modes[modesKeys[key] as ExplorerModes] = false
        else state.modes[modesKeys[key] as ExplorerModes] = Boolean(payload[modesKeys[key] as ExplorerModes])
      }
    },
    insertPath: (state, { payload }: InsertPathToConfigPayload) => {
      const key = payload.toArray as keyof typeof state
      (state[key] as any[]) = [...state[key] as any[], payload.value]

      LocalStorage.set('CONFIGURATION', { excludePaths: state.excludePaths, workSpaces: state.workSpaces })

      //When "toArray" is equal to "workSpaces" add new Folder into Explorer
      if(ExplorerConfiguratinsKeys.WORKSPACES === payload.toArray) {
        const _payload = payload.value as unknown as WorkSpace
        state.explorer = [...state.explorer, { name: _payload.path, alias: _payload.alias, fullPath: _payload.path, type: ExplorerItemTypes.FOLDER }]
      }
    },
    removePath: (state, { payload }: DeletePathFromConfigPayload) => {
      switch(payload.fromArray) {
        case ExplorerConfiguratinsKeys.EXCLUDE_PATHS:
          state.excludePaths = state.excludePaths.filter(path => payload.value !== path)
          break
        case ExplorerConfiguratinsKeys.WORKSPACES:
          state.workSpaces = state.workSpaces.filter(path => path.path !== payload.value)  
          state.explorer = state.explorer.filter(folder => folder.name !== payload.value) 
          break
      }
      
      LocalStorage.set('CONFIGURATION', { excludePaths: state.excludePaths, workSpaces: state.workSpaces })
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fileExplorerMove.pending, (state) => {
      state.isLoading = true
      state.globalError = undefined
    })
    .addCase(fileExplorerMove.rejected, (state, { payload }) => {
      state.globalError = payload
      state.isLoading = false
    })
    .addCase(fileExplorerMove.fulfilled, (state, { payload }) => {
      //Processed as simple "back" as well as back with breadcrumbs
      if(payload.direction === ExplorerMoveDirections.BACKWARD) {
        state.location.numeric = state.location.numeric.slice(0, (payload.deep || -1))
        state.location.string = state.location.string.slice(0, (payload.deep || -1))
        return
      }

      if(typeof payload.deep !== 'undefined' && typeof payload.to !== 'undefined') {
        state.location.numeric = [...state.location.numeric, payload.deep]
        state.location.string = [...state.location.string, payload.to]
  
        updateExplorerRecursively(state.explorer, state.location.numeric, () => payload.folder || [])
      }  

      state.globalError = undefined
      state.isLoading = false
    })
    .addCase(copyItemsTo.pending, (state) => {
      state.globalError = undefined
      state.isLoading = true
    })
    .addCase(copyItemsTo.rejected, (state, { payload }) => {
      state.globalError = payload
      state.isLoading = false
    })
    .addCase(copyItemsTo.fulfilled, (state, { payload }) => {
      updateExplorerRecursively(state.explorer, state.location.numeric, (files) => [...files, ...payload.files])

      state.globalError = undefined
      state.modes.IS_COPY_MODE = false
      state.isLoading = false
    })
    .addCase(deleteItemsFrom.pending, (state) => {
      state.globalError = undefined
      state.isLoading = true
    })
    .addCase(deleteItemsFrom.rejected, (state, { payload }) => {
      state.globalError = payload
      state.isLoading = false
    })
    .addCase(deleteItemsFrom.fulfilled, (state, { payload }) => {
      updateExplorerRecursively(state.explorer, state.location.numeric, (files) => files.filter(file => !payload.fullPaths.includes(file.fullPath)))

      state.modes.IS_DELETE_MODE = false
      state.globalError = undefined
      state.isLoading = false
    })
    .addCase(deleteFileFrom.pending, (state) => {
      state.isLoading = true
      state.globalError = undefined
    })
    .addCase(deleteFileFrom.rejected, (state, { payload }) => {
      state.isLoading = false
      state.globalError = payload
    })
    .addCase(deleteFileFrom.fulfilled, (state, { payload }) => {
      updateExplorerRecursively(state.explorer, state.location.numeric, (files) => files.filter(file => file.fullPath !== payload.fullPath))

      state.globalError = undefined
      state.isLoading = false
    })
    .addCase(editMediaFile.pending, (state) => {
      state.isLoading = true
      state.globalError = undefined
    })
    .addCase(editMediaFile.rejected, (state, { payload }) => {
      state.globalError = payload
      state.isLoading = false
    })
    .addCase(editMediaFile.fulfilled, (state, { payload }) => {
      updateExplorerRecursively(
        state.explorer, 
        state.location.numeric, 
        (files) => files.map(file => file.fullPath === payload.oldFullPath ? 
          ({...file, fullPath: payload.fullPath, name: payload.name || file.name, size: payload.size, type: ExplorerItemTypes.FILE }) : 
          file)
      )

      state.globalError = undefined
      state.isLoading = false
    })
    .addCase(editTextFile.pending, (state) => {
      state.globalError = undefined
      state.isLoading = true
    })
    .addCase(editTextFile.rejected, (state, { payload }) => {
      state.isLoading = false
      state.globalError = payload
    })
    .addCase(editTextFile.fulfilled, (state, { payload }) => {
      updateExplorerRecursively(
        state.explorer, 
        state.location.numeric, 
        (files) => files.map(file => file.fullPath === payload.oldFullPath ? 
          ({...file, content: payload.content, fullPath: payload.fullPath, name: payload.name || file.name, size: payload.size, type: ExplorerItemTypes.FILE }) : 
          file)
      )

      state.globalError = undefined
      state.isLoading = false
    })
  },
})

export default slice.reducer

export const { 
  initializeWorkSpaces,
  insertPath,
  removePath,
  setModesValues
} = slice.actions