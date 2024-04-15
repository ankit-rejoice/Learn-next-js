import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import authSlice from "./slices/authSlice";
import profileSlice from "./slices/profileSlice";

const reducers = combineReducers({
  auth: authSlice,
  profile: profileSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const isProd = false;

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: isProd,
});

export const persistor = persistStore(store);

export default store;
