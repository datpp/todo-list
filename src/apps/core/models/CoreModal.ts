import { removeEmpty } from "../helpers/CoreHelper";

export abstract class CoreModal {
  toJSON() {
    return removeEmpty(this);
  }
}
