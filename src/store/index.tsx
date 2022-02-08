import { ThunkAction, Action } from "@reduxjs/toolkit";
import reducers from "./reducers/index";
import { createStore, StoreEnhancer } from "redux";

// ...

type WindowWithDevTools = Window & {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, {}>;
};

const isReduxDevtoolsExtenstionExist = (
  arg: Window | WindowWithDevTools
): arg is WindowWithDevTools => {
  return "__REDUX_DEVTOOLS_EXTENSION__" in arg;
};

// ...

export const store = createStore(
  reducers,
  isReduxDevtoolsExtenstionExist(window) &&
    (process.env.NODE_ENV !== "production" || process.env.PUBLIC_URL.length > 0)
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
