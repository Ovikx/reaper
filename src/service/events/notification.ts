import { tabCache } from "../../caches/tabCache";
import { whitelistCache } from "../../caches/whitelistCache";

export const onButtonClicked = chrome.notifications.onButtonClicked.addListener(
  (notificationId, buttonIndex) => {
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
        if (session) whitelistCache.cache.add(session.url);
        tabCache.cache.delete(parseInt(notificationId));
      }
    }
  },
);
