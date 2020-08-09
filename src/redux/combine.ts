import { combineReducers, Reducer, ReducersMapObject } from "redux";

export function combine<T>(
  reducers: ReducersMapObject,
  activeState: T
): Reducer<T> {
  const reducerNames: string[] = Object.keys(reducers);
  // debug('REDUCER_NAMES', reducerNames);
  Object.keys(activeState).forEach((item: string) => {
    if (reducerNames.indexOf(item) === -1) {
      // debug('reducers[item]', reducers[item]);
      reducers[item] = (state: any = null): any => state;
      // debug('reducers[item AFTER]', reducers[item]);
    }
  });

  // debug('reducers AFTER', reducers);
  return combineReducers<T>(reducers);
}
