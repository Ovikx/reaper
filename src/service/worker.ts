import { sessionStore } from "../db/db";
import { createStores } from "agile-store";
import defaultBlacklist from "./defaultBlacklist.json";
import { SiteBlacklist } from "./types";
import { elementContained } from "./helpers";
import { tabCache } from "./tabCache";

// Tab event listeners
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Load the user-defined blacklist
  const blacklist = (
    (await chrome.storage.local.get("blacklist")) as SiteBlacklist
  ).blacklist;

  if (changeInfo.status == "complete" && tab.id) {
    // Get the matched blacklist website for storage purposes
    const matched = elementContained(blacklist, tab.url!);

    if (matched) {
      // Only start a session and fire notif if this tab was originally clean
      for (const entry of tabCache.cache.entries()) {
        console.log(entry);
      }
      if (!tabCache.cache.has(tab.id)) {
        console.log("UNPRODUCTIVE WEBSITE!!");
        tabCache.cache.set(tab.id, {
          id: `${matched}:${Date.now()}`,
          timeStarted: Date.now(),
          url: matched,
          timeEnded: undefined,
        });

        chrome.notifications.create(tabId.toString(), {
          buttons: [
            { title: "Alright, get me out of here" },
            {
              title: "I swear on my life this is productive!",
            },
          ],
          iconUrl: "skull256.png",
          message: "You don't have much time left!",
          title: "ALERT",
          type: "progress",
          progress: 90,
          priority: 2,
          requireInteraction: true,
          silent: false,
        });
      }
    }
  }
});

//

// Startup
chrome.runtime.onStartup.addListener(() => {
  createStores("am", 1, [sessionStore]);
});

chrome.runtime.onInstalled.addListener(() => {
  createStores("am", 1, [sessionStore]);
  chrome.storage.local.set({ blacklist: defaultBlacklist.blacklist });
});
