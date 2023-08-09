import { Session } from "../types/types";
import { LocalSettings } from "./types";
import browser from "webextension-polyfill";

/**
 * Gets a session associated with a Chrome tab from Chrome session storage
 * @param tabId Tab ID used to store the session
 * @returns Promise that resovles to either a Session or undefined, if nothing was found
 */
export async function getSession(tabId: string): Promise<Session | undefined> {
  return (await browser.storage.session.get(tabId))[tabId];
}

/**
 * Stores a session in Chrome session storage
 * @param tabId Tab ID
 * @param session Session object
 */
export async function setSession(
  tabId: string,
  session: Session,
): Promise<void> {
  await browser.storage.session.set({ [tabId]: session });
}

/**
 * Gets the temporary website whitelist from Chrome session storage
 */
export async function getTempWhitelist(): Promise<string | undefined> {
  return (await browser.storage.session.get("whitelist"))["whitelist"];
}

/**
 * Adds a URL to the temporary whitelist
 * @param url URL to add the the temporary whitelist
 */
export async function addToTempWhitelist(url: string) {
  const whitelist = await getTempWhitelist();
  await browser.storage.session.set({
    whitelist: [...(whitelist ?? []), url],
  });
}

export async function getBirthYear(): Promise<number> {
  return (await browser.storage.local.get("birthYear"))["birthYear"];
}

/**
 * Changes a setting's value
 * @param setting Setting name
 * @param value New value of the setting
 * @returns Void
 */
export async function setLocalSetting<T extends keyof LocalSettings>(
  setting: T,
  value: LocalSettings[T],
): Promise<void> {
  return await browser.storage.local.set({ [setting]: value });
}

/**
 * Gets a setting from Chrome's local storage
 * @param setting Name of the setting to retrieve
 * @returns Promise that resolves to the retrieved setting
 */
export async function getLocalSetting<T extends keyof LocalSettings>(
  setting: T,
): Promise<LocalSettings[T]> {
  console.log(await browser.storage.local.get(setting));
  return (await browser.storage.local.get(setting))[setting];
}
