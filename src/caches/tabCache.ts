import { Session } from "../types/types";

class TabCache {
  cache: Map<number, Session>;

  constructor() {
    this.cache = new Map<number, Session>();
  }
}

/** Maps tab ID to Session object */
export const tabCache = new TabCache();
