import { Reducer } from "redux";
import todoReducer from "../apps/todo/redux/reducers/TodoReducer";
import taskReducer from "../apps/todo/redux/reducers/TaskReducer";

const DEFAULT_REDUCER = (state: any) => state || null;

class ReducerRegistry {
  private _emitChange: any;
  private _reducers: any;

  constructor() {
    this._emitChange = null;
    this._reducers = {
      todo: todoReducer,
      task: taskReducer,
    };
  }

  getReducers() {
    // default reducer so redux don't complain
    // if no reducers have been registered on startup
    if (!Object.keys(this._reducers).length) {
      return { __: DEFAULT_REDUCER };
    }

    return { ...this._reducers };
  }

  register(name: string, reducer: Reducer) {
    if (this._reducers.name && this._reducers.name !== reducer) {
      throw new Error(`${name} has already been registered`);
    }

    this._reducers = { ...this._reducers, [name]: reducer };

    if (this._emitChange) {
      this._emitChange(this.getReducers());
    }
  }

  setChangeListener(listener: any) {
    this._emitChange = listener;
  }
}

const reducerRegistry: ReducerRegistry = new ReducerRegistry();
export default reducerRegistry;
