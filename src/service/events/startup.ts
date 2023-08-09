import { createStores } from "agile-store";
import { sessionStore } from "../../db/db";
import defaultBlacklist from "../defaultBlacklist.json";
import { defaultBirthYear } from "../../constants";
import { LocalSettings } from "../types";
import browser from "webextension-polyfill";

export const onStartup = browser.runtime.onStartup.addListener(() => {
  createStores("am", 1, [sessionStore]);
  browser.storage.session.set({ whitelist: [] });
});

export const onInstalled = browser.runtime.onInstalled.addListener(() => {
  createStores("am", 1, [sessionStore]);
  browser.storage.session.set({ whitelist: [] });

  // Local settings
  const initialSettings: LocalSettings = {
    blacklist: defaultBlacklist.blacklist,
    birthYear: defaultBirthYear(),
    timeUnit: "M",
  };

  browser.storage.local
    .set(initialSettings)
    .then(() => console.log("worked"))
    .catch((err) => console.log(`no work: ${err}`));
});
