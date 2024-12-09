import { createAsyncThunk } from "@reduxjs/toolkit";

import Fetcher from "@/util/Fetcher/Fetcher.util";

import type { FileExplorerMoveExtraReturn, FileExplorerMoveExtraParam } from "../extraReducers.type";
import type { ServerErrorResponse } from "@/global.type";

import { ExplorerMoveDirections } from "../fileExplorer.enum";

export default createAsyncThunk<FileExplorerMoveExtraReturn, FileExplorerMoveExtraParam, { rejectValue: ServerErrorResponse }>(
  'file-explorer/move',
  async function(params, thunkApi) {
    try {
      if(params.direction === ExplorerMoveDirections.BACKWARD) return params
      return {...params, ...(await Fetcher.post<FileExplorerMoveExtraReturn>('/get/folder', { path: params.path })) }
    } catch(error) {
      return thunkApi.rejectWithValue(error as ServerErrorResponse)
    }
  }
)