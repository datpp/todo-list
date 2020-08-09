import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import styles from "../styles/todo.module.css";

const icons = {
  todo: "assignment",
  "in-progress": "autorenew",
  done: "assignment_turned_in",
  deleted: "delete",
  canceled: "cancel",
};

const colors = {
  todo: "grey",
  "in-progress": "blue",
  done: "green",
  deleted: "red",
  canceled: "black",
};

const TaskListItem = ({ task, onAction }) => {
  const makeAction = (e, action) => {
    if (onAction && task) {
      onAction(action, task);
    }
  };

  return (
    <>
      <li className={styles["task-list__item"]}>
        <Icon
          style={{ color: colors[task.status], margin: "auto 4px auto 0px" }}
        >
          {icons[task.status]}
        </Icon>
        <p className={styles.title}>{task.title}</p>
        <div className={styles["btn-group"]}>
          {task.status === "todo" && (
            <>
              <Button
                type="button"
                color="primary"
                onClick={(e) => makeAction(e, "start")}
              >
                Start
              </Button>
              <Button type="button" onClick={(e) => makeAction(e, "delete")}>
                Delete
              </Button>
            </>
          )}
          {task.status === "in-progress" && (
            <>
              <Button
                type="button"
                color="secondary"
                onClick={(e) => makeAction(e, "done")}
              >
                Done
              </Button>
              <Button type="button" onClick={(e) => makeAction(e, "cancel")}>
                Cancel
              </Button>
            </>
          )}

          {(task.status === "canceled" || task.status === "done") && (
            <>
              <Button type="button" onClick={(e) => makeAction(e, "delete")}>
                Delete
              </Button>
            </>
          )}
        </div>
      </li>
    </>
  );
};

TaskListItem.displayName = "TaskListItem";

export default TaskListItem;
