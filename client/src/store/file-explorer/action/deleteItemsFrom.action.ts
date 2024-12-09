import { createAsyncThunk } from "@reduxjs/toolkit";

import Fetcher from "@/util/Fetcher/Fetcher.util";

import type { DeleteItemsExtraReturn, DeleteItemsExtraParam } from "../extraReducers.type";
import type { ServerErrorResponse } from "@/global.type";

export default createAsyncThunk<DeleteItemsExtraReturn, DeleteItemsExtraParam, { rejectValue: ServerErrorResponse }>(
  'file-explorer/delete-items',
  async function(params, thunkApi) {
    try {
      return await Fetcher.post<DeleteItemsExtraReturn>('/delete/items', params)
    } catch(error) {
      return thunkApi.rejectWithValue(error as ServerErrorResponse)
    }
  }
)