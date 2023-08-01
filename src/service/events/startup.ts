import { createStores } from "agile-store";
import { sessionStore } from "../../db/db";
import defaultBlacklist from "../defaultBlacklist.json";
import { defaultBirthYear } from "../../constants";
import { LocalSettings } from "../types";

export const onStartup = chrome.runtime.onStartup.addListener(() => {
  createStores("am", 1, [sessionStore]);
  chrome.storage.session.set({ whitelist: [] });
});

export const onInstalled = chrome.runtime.onInstalled.addListener(() => {
  createStores("am", 1, [sessionStore]);
  chrome.storage.session.set({ whitelist: [] });

  // Local settings
  const initialSettings: LocalSettings = {
    blacklist: defaultBlacklist.blacklist,
    birthYear: defaultBirthYear(),
    timeUnit: "M",
  };

  chrome.storage.local
    .set(initialSettings)
    .then(() => console.log("worked"))
    .catch((err) => console.log(`no work: ${err}`));
});
