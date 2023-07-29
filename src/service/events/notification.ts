import { tempCache } from "../../caches/SessionCache";
import { tabCache } from "../../caches/tabCache";

export const onButtonClicked = chrome.notifications.onButtonClicked.addListener(
  async (notificationId, buttonIndex) => {
    switch (buttonIndex) {
      // User complies to close tab
      case 0: {
        chrome.tabs
          .remove(parseInt(notificationId))
          .catch(() =>
            console.log(
              "Attempted to delete tab that was already deleted externally",
            ),
          );
        break;
      }

      // User exempts the current website
      case 1: {
        const session = tabCache.cache.get(parseInt(notificationId));
        // if (session) whitelistCache.cache.add(session.url);
        // tabCache.cache.delete(parseInt(notificationId));
        if (session) {
          const whitelist = await tempCache.get("whitelist");
          console.log(whitelist);
          await tempCache.set({
            whitelist: [...(whitelist["whitelist"] ?? []), session.url],
          });
          console.log((await tempCache.get("whitelist"))["whitelist"]);
        }
      }
    }
  },
);
