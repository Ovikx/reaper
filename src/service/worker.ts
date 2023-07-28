import { sessionStore } from "../db/db";
import { createStores } from "agile-store";
import defaultBlacklist from "./defaultBlacklist.json";
import { SiteBlacklist } from "../types/types";
import { elementContained } from "./helpers";

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log(tabId, changeInfo, tab.url);
  const blacklist = (
    (await chrome.storage.local.get("blacklist")) as SiteBlacklist
  ).blacklist;
  if (
    changeInfo.status == "complete" &&
    tab.id &&
    elementContained(blacklist, tab.url!)
  ) {
    console.log("UNPRODUCTIVE WEBSITE!!");
  }
});

chrome.runtime.onStartup.addListener(() => {
  createStores("am", 1, [sessionStore]);
});

chrome.runtime.onInstalled.addListener(() => {
  createStores("am", 1, [sessionStore]);
  chrome.storage.local.set({ blacklist: defaultBlacklist.blacklist });
});
