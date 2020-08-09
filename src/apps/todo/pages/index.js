import Head from "next/head";
import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import TaskListItem from "../components/TaskListItem";
import TaskInput from "../components/TaskInput";
import reducerRegistry from "../../../redux/reducerRegistry";
import todoReducer from "../redux/reducers/TodoReducer";
import taskReducer from "../redux/reducers/TaskReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  TaskCancel,
  TaskCreate,
  TaskDelete,
  TaskDone,
  TaskLoad,
  TaskStart,
} from "../redux/actions/TaskAction";
import { toPlainObject } from "../../core/helpers/CoreHelper";
import epicRegistry from "../../../redux/epicRegistry";
import {
  cancelEpic,
  createEpic,
  deleteEpic,
  doneEpic,
  loadEpic,
  startEpic,
} from "../redux/epics/TaskEpic";
import { getTodoTasks } from "../redux/selectors/TodoSelector";
import { Task } from "../models/TaskModal";

// @todo: have a bug with persit store so temporary register reducer inside component register
// reducerRegistry.register('todo', todoReducer);
// reducerRegistry.register('task', taskReducer);

epicRegistry.register(
  createEpic,
  startEpic,
  deleteEpic,
  doneEpic,
  cancelEpic,
  loadEpic
);

const TodoPage = () => {
  const dispatch = useDispatch();
  const taskList = useSelector(getTodoTasks);
  const isLoading = useSelector((state) => state.task.loading || false);

  useEffect(() => {
    dispatch(toPlainObject(new TaskLoad()));
  }, []);

  const onAdd = (task) => {
    dispatch(toPlainObject(new TaskCreate(task)));
  };

  const onAction = (action, task) => {
    switch (action) {
      case "start":
        dispatch(toPlainObject(new TaskStart(task)));
        break;
      case "cancel":
        dispatch(toPlainObject(new TaskCancel(task)));
        break;
      case "done":
        dispatch(toPlainObject(new TaskDone(task)));
        break;
      case "delete":
        dispatch(toPlainObject(new TaskDelete(task)));
        break;
      default:
        throw Error('Action "' + action + '" not found');
    }
  };

  return (
    <div>
      <Head>
        <title>Todo Task Web App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Roboto+Mono:400,500|Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <main style={{ maxWidth: "966px", margin: "auto" }}>
        <TaskInput onAdd={onAdd} />
        {isLoading ? (
          <>
            <p>Loading</p>
          </>
        ) : (
          <>
            <TaskList>
              {taskList.length > 0 ? (
                taskList.map((task) => {
                  return (
                    <TaskListItem
                      key={task.id}
                      task={task}
                      onAction={onAction}
                    />
                  );
                })
              ) : (
                <>
                  <p>
                    <center>Empty Task List!</center>
                  </p>
                </>
              )}
            </TaskList>
          </>
        )}
      </main>
    </div>
  );
};

export default TodoPage;
