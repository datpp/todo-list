import { BaseService } from "../../core/services/BaseService";

class TaskService extends BaseService {
  constructor() {
    super("/task");
  }
}
