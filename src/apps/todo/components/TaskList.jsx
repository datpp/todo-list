import styles from "../styles/todo.module.css";

const TaskList = ({ children }) => {
  return (
    <>
      <ul className={styles["task-list"]}>{children}</ul>
    </>
  );
};

TaskList.displayName = "TaskList";

export default TaskList;
