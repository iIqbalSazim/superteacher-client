import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { AppDispatch, RootState } from "./StoreTypes";

import authSlice from "./Slices/AuthSlice/AuthSlice";
import classroomSlice from "./Slices/ClassroomSlice/ClassroomSlice";
import { projectApi } from "./Api/api.config";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  classroom: classroomSlice.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: [projectApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(projectApi.middleware),
});

export let persistor = persistStore(store);

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
