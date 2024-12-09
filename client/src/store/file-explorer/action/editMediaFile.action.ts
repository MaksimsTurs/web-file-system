import { createAsyncThunk } from "@reduxjs/toolkit";

import Fetcher from "@/util/Fetcher/Fetcher.util";

import type { EditMediaFileExtraReturn, EditMediaFileExtraParam } from "../extraReducers.type";
import type { ServerErrorResponse } from "@/global.type";

export default createAsyncThunk<EditMediaFileExtraReturn, EditMediaFileExtraParam, { rejectValue: ServerErrorResponse }>(
  '/file-explorer/edit-media-file',
  async function(params, thunkApi) {
    try {
      return await Fetcher.post<EditMediaFileExtraReturn>('/edit/media-file', params)
    } catch(error) {
      return thunkApi.rejectWithValue(error as ServerErrorResponse)
    }
  }
)