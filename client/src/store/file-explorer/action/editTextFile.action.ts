import { createAsyncThunk } from "@reduxjs/toolkit";

import Fetcher from "@/util/Fetcher/Fetcher.util";

import type { EditTextFileExtraReturn, EditTextFileExtraParam } from "../extraReducers.type";
import type { ServerErrorResponse } from "@/global.type";

export default createAsyncThunk<EditTextFileExtraReturn, EditTextFileExtraParam, { rejectValue: ServerErrorResponse }>(
  '/file-explorer/edit-text-file',
  async function(params, thunkApi) {
    try {
      return await Fetcher.post<EditTextFileExtraReturn>('/edit/text-file', params)
    } catch(error) {
      return thunkApi.rejectWithValue(error as ServerErrorResponse)
    }
  }
)