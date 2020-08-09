import { BaseService } from "../../core/services/BaseService";
import { Task } from "../models/TaskModal";

export class TaskService extends BaseService {
  constructor() {
    super("/tasks");
  }

  createTask(task: Task) {
    return this.httpClient.post("", { title: task.title, status: task.status });
  }

  updateTask(id: number, change: any) {
    return this.httpClient.patch("/" + id, change);
  }

  deleteTask(task: Task) {
    return this.httpClient.delete("/" + task.id);
  }

  loadTasks() {
    return this.httpClient.get("");
  }
}
