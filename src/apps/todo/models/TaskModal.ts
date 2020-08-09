import { CoreModal } from "../../core/models/CoreModal";

export interface TaskAPIResponse {
  id: number;
  title: string;
  status: string;
}

export class Task extends CoreModal {
  id: number;
  title: string;
  status: string;

  constructor(data: Partial<Task>) {
    super();
    Object.assign(this, data);
  }
}
