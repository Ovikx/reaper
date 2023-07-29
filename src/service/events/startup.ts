import { createStores } from "agile-store";
import { sessionStore } from "../../db/db";
import defaultBlacklist from "../defaultBlacklist.json";

export const onStartup = chrome.runtime.onStartup.addListener(() => {
  createStores("am", 1, [sessionStore]);
  chrome.storage.session.set({ whitelist: [] });
});

export const onInstalled = chrome.runtime.onInstalled.addListener(() => {
  createStores("am", 1, [sessionStore]);
  chrome.storage.local.set({ blacklist: defaultBlacklist.blacklist });
  chrome.storage.session.set({ whitelist: [] });
});
