import { createAsyncThunk } from "@reduxjs/toolkit";

import Fetcher from "@/util/Fetcher/Fetcher.util";

import type { DeleteFileExtraReturn } from "../extraReducers.type";
import type { ServerErrorResponse } from "@/global.type";

export default createAsyncThunk<DeleteFileExtraReturn, string, { rejectValue: ServerErrorResponse } >(
  '/file-explorer/delete-file',
  async function(params, thunkApi) {
    try {
      return await Fetcher.post<DeleteFileExtraReturn>('/delete/file', params)
    } catch(error) {
      return thunkApi.rejectWithValue(error as ServerErrorResponse)
    }
  }
)