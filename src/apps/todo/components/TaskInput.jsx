import { useState } from "react";
import styles from "../styles/todo.module.css";

const TaskInput = ({ onAdd }) => {
  const [taskTitle, setTaskTitle] = useState("");

  const addTask = (e) => {
    e.preventDefault();

    if (onAdd && taskTitle) {
      onAdd({
        id: Date.now(),
        title: taskTitle,
        status: "todo",
      });
    }
    setTaskTitle("");
  };

  const updateTaskTitle = (e) => setTaskTitle(e.target.value);

  return (
    <>
      <form className={styles.container} onSubmit={addTask}>
        <input
          className={styles["task-input"]}
          type="text"
          value={taskTitle}
          onChange={updateTaskTitle}
        />
      </form>
    </>
  );
};
TaskInput.displayName = "TaskInput";

export default TaskInput;
