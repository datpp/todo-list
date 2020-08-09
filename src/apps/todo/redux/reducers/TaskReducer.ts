// Initial State
import {
  ActionTypes as TaskActionTypes,
  TaskAction,
} from "../actions/TaskAction";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { Task } from "../../models/TaskModal";

const taskAdapter = createEntityAdapter<Task>({
  selectId: (task) => task.id,
  sortComparer: false,
});

const initialState = taskAdapter.getInitialState({
  loaded: false,
  loading: false,
});

// Reducers (Modifies The State And Returns A New State)
const taskReducer = (state = initialState, action: TaskAction) => {
  switch (action.type) {
    case TaskActionTypes.TASK_LOAD:
      return {
        ...state,
        loading: true,
      };
    case TaskActionTypes.TASK_LOAD_SUCCESS:
      return {
        ...taskAdapter.addMany(taskAdapter.removeAll(state), action.tasks),
        loading: false,
      };
    case TaskActionTypes.TASK_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case TaskActionTypes.TASK_CREATE_SUCCESS:
      return {
        ...taskAdapter.addOne(state, action.task),
      };
    case TaskActionTypes.TASK_DELETE_SUCCESS:
      return {
        ...taskAdapter.removeOne(state, action.task.id),
      };
    case TaskActionTypes.TASK_START_SUCCESS:
    case TaskActionTypes.TASK_DONE_SUCCESS:
    case TaskActionTypes.TASK_CANCEL_SUCCESS:
      return {
        ...taskAdapter.updateOne(state, {
          id: action.task.id,
          changes: action.task,
        }),
      };
    default: {
      return state;
    }
  }
};

// Exports
export default taskReducer;

export const getTaskEntities = (state) => state.task.entities;
