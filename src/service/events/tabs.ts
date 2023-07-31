import { SiteBlacklist } from "../types";
import { elementContained } from "../helpers";
import { dbConfig, sessionStore } from "../../db/db";
import { getSession, getTempWhitelist, setSession } from "../storageUtils";
import { useStore } from "agile-store";

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
      //const currentSession = tabCache.cache.get(tab.id);
      const currentSession = await getSession(tab.id.toString());

      // If the tab is already in the cache, there's a possibility we can end the session
      // Only end the session if the user goes to a different site
      if (currentSession && currentSession.url != matched) {
        chrome.storage.session.remove(tab.id.toString());
        // TODO: only add to store if site isn't in the whitelist
        (await useStore(sessionStore, dbConfig))
          .add({
            ...currentSession,
            timeEnded: Date.now(),
          })
          .then(() =>
            console.log(`Added ${currentSession.id} to store on tab update`),
          );

        // Clear active notification if new URL is clean
        if (matched == undefined) {
          chrome.notifications.clear(tab.id.toString());
        }
      }

      if (
        matched &&
        currentSession?.url != matched &&
        !((await getTempWhitelist()) ?? [""]).includes(matched)
      ) {
        console.log("UNPRODUCTIVE WEBSITE!!");

        // Add the session to the tab cache
        setSession(tab.id.toString(), {
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

export const onRemoved = chrome.tabs.onRemoved.addListener(async (tabId) => {
  const session = await getSession(tabId.toString());
  if (session) {
    // TODO: check that session url isn't in the whitelist before adding to store
    (await useStore(sessionStore, dbConfig))
      .add({ ...session, timeEnded: Date.now() })
      .then(() => console.log(`Added ${session.id} to store on tab remove`));
    chrome.storage.session.remove(tabId.toString());
    chrome.notifications.clear(tabId.toString());
  }
});
