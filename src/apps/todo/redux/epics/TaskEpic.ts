import { ActionsObservable } from "redux-observable";
import { Action } from "redux";
import {
  ActionTypes,
  TaskCancelSuccess,
  TaskCreateSuccess,
  TaskDeleteSuccess,
  TaskDoneSuccess,
  TaskStartSuccess,
} from "../actions/TaskAction";
import { filter, map, switchMap } from "rxjs/operators";
import { toPlainObject } from "../../../core/helpers/CoreHelper";
import { of } from "rxjs";

export const createEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    filter((action: Action) => action.type === ActionTypes.TASK_CREATE),
    switchMap((action: any) =>
      of(toPlainObject(new TaskCreateSuccess(action.task)))
    )
  );

export const deleteEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    filter((action: Action) => action.type === ActionTypes.TASK_DELETE),
    switchMap((action: any) =>
      of(toPlainObject(new TaskDeleteSuccess(action.task)))
    )
  );

export const startEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    filter((action: Action) => action.type === ActionTypes.TASK_START),
    switchMap((action: any) => {
      const task = Object.assign({}, action.task, { status: "in-progress" });
      return of(toPlainObject(new TaskStartSuccess(task)));
    })
  );

export const doneEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    filter((action: Action) => action.type === ActionTypes.TASK_DONE),
    switchMap((action: any) => {
      const task = Object.assign({}, action.task, { status: "done" });
      return of(toPlainObject(new TaskDoneSuccess(task)));
    })
  );

export const cancelEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    filter((action: Action) => action.type === ActionTypes.TASK_CANCEL),
    switchMap((action: any) => {
      const task = Object.assign({}, action.task, { status: "canceled" });
      return of(toPlainObject(new TaskCancelSuccess(task)));
    })
  );
