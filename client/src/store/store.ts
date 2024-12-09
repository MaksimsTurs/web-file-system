import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import fileExplorer from './file-explorer/fileExplorer.slice'

const reducers = combineReducers({
  fileExplorer
})

const store = configureStore({ reducer: reducers })

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export default store