// @todo: implement this

import { Action } from "redux";

export enum ActionTypes {
  INITIAL = "[Todo] Intial",
}

export class TodoInitial implements Action {
  readonly type = ActionTypes.INITIAL;

  constructor() {
    /* do nothing */
  }
}

export type TodoAction = TodoInitial;
