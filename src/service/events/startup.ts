import { createStores } from "agile-store";
import { sessionStore } from "../../db/db";
import defaultBlacklist from "../defaultBlacklist.json";
import { tempCache } from "../../caches/SessionCache";

export const onStartup = chrome.runtime.onStartup.addListener(() => {
  createStores("am", 1, [sessionStore]);
  tempCache.set({ whitelist: [] });
});

export const onInstalled = chrome.runtime.onInstalled.addListener(() => {
  createStores("am", 1, [sessionStore]);
  chrome.storage.local.set({ blacklist: defaultBlacklist.blacklist });
  tempCache.set({ whitelist: [] });
});
