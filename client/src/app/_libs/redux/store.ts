import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./features/auth/auth.slice";

const reducers = combineReducers({
  auth: authSlice,
});

export const makeStore = () => {
  return configureStore({
    reducer: reducers,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
