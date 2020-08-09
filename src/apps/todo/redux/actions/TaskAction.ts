import { Task } from "../../models/TaskModal";
import { Action } from "redux";

export enum ActionTypes {
  TASK_LOAD = "[Task] Load",
  TASK_LOAD_SUCCESS = "[Task] Load Success",
  TASK_LOAD_FAILURE = "[Task] Load Failure",

  TASK_CREATE = "[Task] Create",
  TASK_CREATE_SUCCESS = "[Task] Create Success",
  TASK_CREATE_FAILURE = "[Task] Create Failure",

  TASK_START = "[Task] Start",
  TASK_START_SUCCESS = "[Task] Start Success",
  TASK_START_FAILURE = "[Task] Start Failure",

  TASK_DELETE = "[Task] Delete",
  TASK_DELETE_SUCCESS = "[Task] Delete Success",
  TASK_DELETE_FAILURE = "[Task] Delete Failure",

  TASK_CANCEL = "[Task] Cancel",
  TASK_CANCEL_SUCCESS = "[Task] Cancel Success",
  TASK_CANCEL_FAILURE = "[Task] Cancel  Failure",

  TASK_DONE = "[Task] Done",
  TASK_DONE_SUCCESS = "[Task] Done Success",
  TASK_DONE_FAILURE = "[Task] Done Failure",
}

export class TaskLoad implements Action {
  readonly type = ActionTypes.TASK_LOAD;

  constructor(public ids?: number[]) {
    /* do nothing */
  }
}

export class TaskLoadSuccess implements Action {
  readonly type = ActionTypes.TASK_LOAD_SUCCESS;

  constructor(public tasks: Task[]) {
    /* do nothing */
  }
}

export class TaskLoadFailure implements Action {
  readonly type = ActionTypes.TASK_LOAD_FAILURE;

  constructor(public payload: any) {
    /* do nothing */
  }
}

// -------
export class TaskCreate implements Action {
  readonly type = ActionTypes.TASK_CREATE;

  constructor(public task: Task) {
    /* do nothing */
  }
}

export class TaskCreateSuccess implements Action {
  readonly type = ActionTypes.TASK_CREATE_SUCCESS;

  constructor(public task: Task) {
    /* do nothing */
  }
}

export class TaskCreateFailure implements Action {
  readonly type = ActionTypes.TASK_CREATE_FAILURE;

  constructor(public payload: any) {
    /* do nothing */
  }
}

// -------
export class TaskStart implements Action {
  readonly type = ActionTypes.TASK_START;

  constructor(public task: Task) {
    /* do nothing */
  }
}

export class TaskStartSuccess implements Action {
  readonly type = ActionTypes.TASK_START_SUCCESS;

  constructor(public task: Task) {
    /* do nothing */
  }
}

export class TaskStartFailure implements Action {
  readonly type = ActionTypes.TASK_START_FAILURE;

  constructor(public payload: any) {
    /* do nothing */
  }
}

// -------
export class TaskDelete implements Action {
  readonly type = ActionTypes.TASK_DELETE;

  constructor(public task: Task) {
    /* do nothing */
  }
}

export class TaskDeleteSuccess implements Action {
  readonly type = ActionTypes.TASK_DELETE_SUCCESS;

  constructor(public task: Task) {
    /* do nothing */
  }
}

export class TaskDeleteFailure implements Action {
  readonly type = ActionTypes.TASK_DELETE_FAILURE;

  constructor(public payload: any) {
    /* do nothing */
  }
}

// -------
export class TaskCancel implements Action {
  readonly type = ActionTypes.TASK_CANCEL;

  constructor(public task: Task) {
    /* do nothing */
  }
}

export class TaskCancelSuccess implements Action {
  readonly type = ActionTypes.TASK_CANCEL_SUCCESS;

  constructor(public task: Task) {
    /* do nothing */
  }
}

export class TaskCancelFailure implements Action {
  readonly type = ActionTypes.TASK_CANCEL_FAILURE;

  constructor(public payload: any) {
    /* do nothing */
  }
}

// -------
export class TaskDone implements Action {
  readonly type = ActionTypes.TASK_DONE;

  constructor(public task: Task) {
    /* do nothing */
  }
}

export class TaskDoneSuccess implements Action {
  readonly type = ActionTypes.TASK_DONE_SUCCESS;

  constructor(public task: Task) {
    /* do nothing */
  }
}

export class TaskDoneFailure implements Action {
  readonly type = ActionTypes.TASK_DONE_FAILURE;

  constructor(public payload: any) {
    /* do nothing */
  }
}

export type TaskAction =
  | TaskLoad
  | TaskLoadSuccess
  | TaskLoadFailure
  | TaskCreate
  | TaskCreateSuccess
  | TaskCreateFailure
  | TaskStart
  | TaskStartSuccess
  | TaskStartFailure
  | TaskCancel
  | TaskCancelSuccess
  | TaskCancelFailure
  | TaskDone
  | TaskDoneSuccess
  | TaskDoneFailure
  | TaskDelete
  | TaskDeleteSuccess
  | TaskDeleteFailure;
