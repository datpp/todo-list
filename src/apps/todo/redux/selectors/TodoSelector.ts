import { createSelector } from "reselect";
import { getTodoTaskIds } from "../reducers/TodoReducer";
import { getTaskEntities } from "../reducers/TaskReducer";

export const getTodoTasks = createSelector(
  getTodoTaskIds,
  getTaskEntities,
  (todoTaskIds: number[], tasks: any) => {
    const _tasks = (todoTaskIds && todoTaskIds.map((id) => tasks[id])) || [];
    return _tasks.filter((item) => item != undefined);
  }
);
