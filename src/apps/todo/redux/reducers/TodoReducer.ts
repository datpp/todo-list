// Initial State
import {
  ActionTypes as TodoActionTypes,
  TodoAction,
} from "../actions/TodoAction";
import {
  ActionTypes as TaskActionTypes,
  TaskAction,
} from "../actions/TaskAction";

const initialState = {
  taskIds: [],
  loading: false,
};

// Reducers (Modifies The State And Returns A New State)
const todoReducer = (state = initialState, action: TodoAction | TaskAction) => {
  switch (action.type) {
    case TaskActionTypes.TASK_LOAD:
      return {
        ...state,
        loading: true,
      };
    case TaskActionTypes.TASK_LOAD_SUCCESS:
      return {
        ...state,
        taskIds: action.tasks.map((task) => task.id),
        loading: false,
      };
    case TaskActionTypes.TASK_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case TaskActionTypes.TASK_CREATE_SUCCESS:
      return {
        ...state,
        taskIds: [action.task.id, ...state.taskIds],
      };
    case TaskActionTypes.TASK_DELETE_SUCCESS:
      return {
        ...state,
        taskIds: state.taskIds.filter((taskId) => taskId != action.task.id),
      };
    default: {
      return state;
    }
  }
};

// Exports
export default todoReducer;

export const getTodoTaskIds = (state) => state.todo.taskIds;
