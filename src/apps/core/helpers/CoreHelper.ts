export function removeEmpty(obj: any) {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object") {
      newObj[key] = this.removeEmpty(obj[key]); // recurse
    } else if (obj[key] != null) {
      newObj[key] = obj[key]; // copy value
    }
  });

  return newObj;
}

export function toPlainObject(obj: any) {
  return Object.assign({}, obj);
}
