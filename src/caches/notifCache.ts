class NotificationCache {
  cache: Map<number, number>;
  constructor() {
    this.cache = new Map();
  }
}

/** Maps notification ID to tab ID */
export const notifCache = new NotificationCache();
