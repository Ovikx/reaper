export interface Session {
  id: string;
  url: string;
  timeStarted: number;
  timeEnded?: number;
}

export interface SiteBlacklist {
  blacklist: string[];
}
