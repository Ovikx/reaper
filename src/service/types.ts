import { TimeUnit } from "../pages/Overview";

export interface SiteBlacklist {
  blacklist: string[];
}

/** Key to use in the tab cache */
export type TabCacheKey = `${number}:${string}`;

export interface LocalSettings {
  blacklist: string[];
  birthYear: number;
  timeUnit: TimeUnit;
}
