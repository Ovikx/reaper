export const onButtonClicked = chrome.notifications.onButtonClicked.addListener(
  (notificationId, buttonIndex) => {
    switch (buttonIndex) {
      case 0: {
        chrome.tabs
          .remove(parseInt(notificationId))
          .catch(() =>
            console.log(
              "Attempted to delete tab that was already deleted externally",
            ),
          );
      }
    }
  },
);
