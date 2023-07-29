type CacheKeys = ["whitelist", "tabs"][number];

class SessionCache {
  constructor() {}
  async get<T extends CacheKeys = CacheKeys>(keys: T | T[]) {
    return await chrome.storage.session.get(keys);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async set(items: { [key: string]: any }) {
    return await chrome.storage.session.set(items);
  }

  async remove(keys: string | string[]) {
    return await chrome.storage.session.remove(keys);
  }
}

export const tempCache = new SessionCache();
