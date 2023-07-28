import { Session } from "../types/types";

export class TabCache {
  _cache: Map<string, Session>;

  constructor() {
    this._cache = new Map<string, Session>();
  }
}

export const tabCache = new TabCache();
