import { getSession } from "../storageUtils";

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

      // User whitelists the current website temporarily
      case 1: {
        const session = await getSession(notificationId);
        if (session) {
          const whitelist = await chrome.storage.session.get("whitelist");
          await chrome.storage.session.set({
            whitelist: [...(whitelist["whitelist"] ?? []), session.url],
          });
          console.log(
            (await chrome.storage.session.get("whitelist"))["whitelist"],
          );
        }
      }
    }
  },
);
