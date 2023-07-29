class WhitelistCache {
  cache: Set<string>;

  constructor() {
    this.cache = new Set();
  }
}

/** Stores website URLs that were exempted by notification button */
export const whitelistCache = new WhitelistCache();
