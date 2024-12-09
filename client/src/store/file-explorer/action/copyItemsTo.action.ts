import { createAsyncThunk } from "@reduxjs/toolkit";

import Fetcher from "@/util/Fetcher/Fetcher.util";

import type { CopyItemsToExtraReturn, CopyItemsToExtraParam } from "../extraReducers.type";
import type { ServerErrorResponse } from "@/global.type";

export default createAsyncThunk<CopyItemsToExtraReturn, CopyItemsToExtraParam, { rejectValue: ServerErrorResponse }>(
  'file-explorer/copy-items',
  async function(params, thunkApi) {
    try {
      return await Fetcher.post<CopyItemsToExtraReturn>('/copy/items', params)
    } catch(error) {
      return thunkApi.rejectWithValue(error as ServerErrorResponse)
    }
  }
)