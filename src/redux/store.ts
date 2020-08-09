// Imports: Dependencies
import storage from "redux-persist/lib/storage";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

// Imports: Redux
import { combineEpics, createEpicMiddleware } from "redux-observable";
import reducerRegistry from "./reducerRegistry";
import { combine } from "./combine";
import { BehaviorSubject } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import epicRegistry from "./epicRegistry";

// Middleware: Observable
const epicMiddleware = createEpicMiddleware();

let middlewares: any = [epicMiddleware];
if (process.env.NODE_ENV != "production") {
  middlewares = [...middlewares, createLogger()];
}

// Middleware: Redux Persist Config
const persistConfig = {
  // Root?
  key: "root",
  // Storage Method (React Native)
  storage: storage,
  version: 1,
  // Whitelist (Save Specific Reducers)
  whitelist: publicRuntimeConfig.persistStore.whitelist || [],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: publicRuntimeConfig.persistStore.backlist || [],
  debug: process.env.NODE_ENV == "development",
  timeout: null,
};

const initialState = {};

const rootReducer = combine(reducerRegistry.getReducers(), initialState);

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux: Store
const store: any = createStore(
  persistedReducer,
  undefined,
  applyMiddleware(...middlewares)
);
// Middleware: Redux Persist Persister
const persistor = persistStore(store);

store.persistor = persistor;

// Replace the store's reducer whenever a new reducer is registered.
reducerRegistry.setChangeListener((reducers: any) => {
  const combineReducer = combine(reducers, initialState);
  const persistedReducer = persistReducer(persistConfig, combineReducer);
  store.replaceReducer(persistedReducer);
});

const epic$ = new BehaviorSubject({});
const hotReloadEpic = (...args: any[]): any =>
  epic$.pipe(
    filter((epic) => typeof epic === "function"),
    switchMap((epic: any) => epic(...args))
  );

/**
 * @todo: as their document, risk to use this see more at
 * https://redux-observable.js.org/docs/recipes/HotModuleReplacement.html
 */
epicMiddleware.run(hotReloadEpic);

epicRegistry.setChangeListener((epics: any) => {
  const ov = Object.values(epics);
  const rootEpic: any = combineEpics(...ov);
  epic$.next(rootEpic);
});

// Exports
export { store, persistor };
