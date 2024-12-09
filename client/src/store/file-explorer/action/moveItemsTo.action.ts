// import { createAsyncThunk } from "@reduxjs/toolkit";

// import Fetcher from "@/tool/fetcher/fetcher.tool";

// import type { TCopyRemoveMoveItemExtraParam, TCopyMoveItemExtraReturn } from "../type/extraReducers.type";
// import type { ServerErrorResponse } from "@/global.type";

// export default createAsyncThunk<TCopyMoveItemExtraReturn, TCopyRemoveMoveItemExtraParam, { rejectValue: ServerErrorResponse }>(
//   'file-explorer/move-items',
//   async function(params, thunkApi) {
//     try {
//       return (await Fetcher.post<TCopyMoveItemExtraReturn>('/move/items', params))
//     } catch(error) {
//       return thunkApi.rejectWithValue(Fetcher.tools.parseError(error))
//     }
//   }
// )