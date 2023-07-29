import { SiteBlacklist } from "../types";
import { elementContained } from "../helpers";
import { tabCache } from "../../caches/tabCache";
import { sessionStore } from "../../db/db";
import { tempCache } from "../../caches/SessionCache";

// Tab event listeners
export const onUpdated = chrome.tabs.onUpdated.addListener(
  async (tabId, changeInfo, tab) => {
    // Load the user-defined blacklist
    const blacklist = (
      (await chrome.storage.local.get("blacklist")) as SiteBlacklist
    ).blacklist;

    if (changeInfo.status == "complete" && tab.id) {
      // Get the matched blacklist website for storage purposes
      const matched = elementContained(blacklist, tab.url!);
      const currentSession = tabCache.cache.get(tab.id);

      // If the tab is already in the cache, there's a possibility we can end the session
      if (currentSession) {
        // Only end the session if the user goes to a different site
        if (currentSession.url != matched) {
          tabCache.cache.delete(tab.id);
          sessionStore.add({
            ...currentSession,
            timeEnded: Date.now(),
          });
        }
      }

      console.log(currentSession?.url, matched);
      if (
        matched &&
        currentSession?.url != matched &&
        !(await tempCache.get("whitelist"))["whitelist"].includes(matched)
      ) {
        console.log("UNPRODUCTIVE WEBSITE!!");

        // Add the session to the tab cache
        tabCache.cache.set(tab.id, {
          id: `${matched}:${Date.now()}`,
          timeStarted: Date.now(),
          url: matched,
          timeEnded: undefined,
        });

        // Fire notif
        const options: chrome.notifications.NotificationOptions<true> = {
          buttons: [
            { title: "Alright, get me out of here" },
            {
              title: "I swear on my life this is productive!",
            },
          ],
          iconUrl: "skull256.png",
          message: `You don't have much time left!`,
          title: "ALERT",
          type: "progress",
          progress: 90,
          priority: 2,
          requireInteraction: true,
          silent: false,
        };

        chrome.notifications.create(tabId.toString(), options);
      }
    }
  },
);

export const onRemoved = chrome.tabs.onRemoved.addListener((tabId) => {
  const session = tabCache.cache.get(tabId);
  if (session) {
    sessionStore.add({ ...session, timeEnded: Date.now() });
    tabCache.cache.delete(tabId);
  }
});
