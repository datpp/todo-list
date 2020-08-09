import { Epic } from "redux-observable";

class EpicRegistry {
  private _emitChange: any;
  private _epics: any;

  constructor() {
    this._emitChange = null;
    this._epics = {};
  }

  getEpics() {
    return this._epics;
  }

  register(...epics: Epic[]) {
    this._epics = { ...this._epics, ...epics };

    if (this._emitChange) {
      this._emitChange(this.getEpics());
    }
  }

  setChangeListener(listener: any) {
    this._emitChange = listener;
  }
}

const epicRegistry: EpicRegistry = new EpicRegistry();

export default epicRegistry;
