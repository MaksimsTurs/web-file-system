import { createAsyncThunk } from "@reduxjs/toolkit";

import Fetcher from "@/util/Fetcher/Fetcher.util";

import type { DownloadMediaFilesFromURLsExtraReturn, DownloadMediaFilesFromURLsExtraParama } from "../extraReducers.type";
import type { ServerErrorResponse } from "@/global.type";

export default createAsyncThunk<DownloadMediaFilesFromURLsExtraReturn, DownloadMediaFilesFromURLsExtraParama, { rejectValue: ServerErrorResponse }>(
  'filee-xplorer/download-files-from-url',
  async function(params, thunkApi) {
    try {
      return await Fetcher.post<DownloadMediaFilesFromURLsExtraReturn>('/insert/download-files-from-url', params)
    } catch(error) {
      return thunkApi.rejectWithValue(error as ServerErrorResponse)
    }
  }
)