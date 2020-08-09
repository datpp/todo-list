import { ActionsObservable } from "redux-observable";
import { Action } from "redux";
import {
  ActionTypes,
  TaskCancelFailure,
  TaskCancelSuccess,
  TaskCreateFailure,
  TaskCreateSuccess,
  TaskDeleteFailure,
  TaskDeleteSuccess,
  TaskDoneFailure,
  TaskDoneSuccess,
  TaskLoadFailure,
  TaskLoadSuccess,
  TaskStartFailure,
  TaskStartSuccess,
} from "../actions/TaskAction";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { toPlainObject } from "../../../core/helpers/CoreHelper";
import { of } from "rxjs";
import { TaskService } from "../../services/TaskService";
import { Task } from "../../models/TaskModal";
import { AxiosResponse } from "axios";

const taskService = new TaskService();

export const createEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    filter((action: Action) => action.type === ActionTypes.TASK_CREATE),
    switchMap((action: any) => {
      return taskService.createTask(action.task).pipe(
        map((response: AxiosResponse) => {
          return toPlainObject(new TaskCreateSuccess(new Task(response.data)));
        }),
        catchError((err) => of(toPlainObject(new TaskCreateFailure(err))))
      );
    })
  );

export const deleteEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    filter((action: Action) => action.type === ActionTypes.TASK_DELETE),
    switchMap((action: any) => {
      return taskService.deleteTask(action.task).pipe(
        map((response: AxiosResponse) => {
          return toPlainObject(new TaskDeleteSuccess(new Task(action.task)));
        }),
        catchError((err) => of(toPlainObject(new TaskDeleteFailure(err))))
      );
    })
  );

export const startEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    filter((action: Action) => action.type === ActionTypes.TASK_START),
    switchMap((action: any) => {
      const task = Object.assign({}, action.task, { status: "in-progress" });

      return taskService.updateTask(task.id, { status: task.status }).pipe(
        map((response: AxiosResponse) => {
          return toPlainObject(new TaskStartSuccess(new Task(task)));
        }),
        catchError((err) => of(toPlainObject(new TaskStartFailure(err))))
      );
    })
  );

export const doneEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    filter((action: Action) => action.type === ActionTypes.TASK_DONE),
    switchMap((action: any) => {
      const task = Object.assign({}, action.task, { status: "done" });

      return taskService.updateTask(task.id, { status: task.status }).pipe(
        map((response: AxiosResponse) => {
          return toPlainObject(new TaskDoneSuccess(new Task(task)));
        }),
        catchError((err) => of(toPlainObject(new TaskDoneFailure(err))))
      );
    })
  );

export const cancelEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    filter((action: Action) => action.type === ActionTypes.TASK_CANCEL),
    switchMap((action: any) => {
      const task = Object.assign({}, action.task, { status: "canceled" });

      return taskService.updateTask(task.id, { status: task.status }).pipe(
        map((response: AxiosResponse) => {
          return toPlainObject(new TaskCancelSuccess(new Task(task)));
        }),
        catchError((err) => of(toPlainObject(new TaskCancelFailure(err))))
      );
    })
  );

export const loadEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    filter((action: Action) => action.type === ActionTypes.TASK_LOAD),
    switchMap((action: any) => {
      return taskService.loadTasks().pipe(
        map((response: AxiosResponse) => {
          const tasks =
            (response.data && response.data.map((task) => new Task(task))) ||
            [];
          return toPlainObject(new TaskLoadSuccess(tasks));
        }),
        catchError((err) => of(toPlainObject(new TaskLoadFailure(err))))
      );
    })
  );
