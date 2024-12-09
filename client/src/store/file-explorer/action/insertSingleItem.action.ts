import { createAsyncThunk } from "@reduxjs/toolkit";

import Fetcher from "@/util/Fetcher/Fetcher.util";

import type { InsertSingleItemExtraParam, InsertSingleItemExtraReturn } from "../extraReducers.type";
import type { ServerErrorResponse } from "@/global.type";

export default createAsyncThunk<InsertSingleItemExtraReturn, InsertSingleItemExtraParam, { rejectValue: ServerErrorResponse }>(
  'file-explorer/insert-single-item',
  async function(params, thunkApi) {
    try {
      return await Fetcher.post<InsertSingleItemExtraReturn>('/insert/single-item', params)
    } catch(error) {
      return thunkApi.rejectWithValue(error as ServerErrorResponse)
    }
  }
)