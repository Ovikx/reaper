import {
  addToTempWhitelist,
  getSession,
  getTempWhitelist,
} from "../storageUtils";
import browser from "webextension-polyfill";

export const onButtonClicked = browser.notifications.onButtonClicked.addListener(
  async (notificationId, buttonIndex) => {
    switch (buttonIndex) {
      // User complies to close tab
      case 0: {
        browser.tabs
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
          await addToTempWhitelist(session.url);
          console.log(await getTempWhitelist());
        }
      }
    }
  },
);
