import { removeEmpty } from "../helpers/CoreHelper";

export abstract class CoreModal {
  protected constructor(initialData: any) {
    Object.entries(initialData).forEach(([key, value]) => {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        if (this[key] instanceof Date && typeof value === "string") {
          this[key] = new Date(value);
        } else if (this[key] instanceof Boolean) {
          this[key] = !!value;
        } else {
          this[key] = value;
        }
      }
    });
  }

  toJSON() {
    return removeEmpty(this);
  }
}
