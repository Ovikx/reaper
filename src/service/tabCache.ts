import { Session } from "../types/types";
//import { TabCacheKey } from "./types";

export class TabCache {
  cache: Map<number, Session>;

  constructor() {
    this.cache = new Map<number, Session>();
  }
}

export const tabCache = new TabCache();
