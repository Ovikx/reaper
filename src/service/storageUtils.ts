import { Session } from "../types/types";

/**
 * Gets a session associated with a Chrome tab from Chrome session storage
 * @param tabId Tab ID used to store the session
 * @returns Promise that resovles to either a Session or undefined, if nothing was found
 */
export async function getSession(tabId: string): Promise<Session | undefined> {
  return (await chrome.storage.session.get(tabId))[tabId];
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
  await chrome.storage.session.set({ [tabId]: session });
}

/**
 * Gets the temporary website whitelist from Chrome session storage
 */
export async function getTempWhitelist(): Promise<string | undefined> {
  return (await chrome.storage.session.get("whitelist"))["whitelist"];
}

/**
 * Adds a URL to the temporary whitelist
 * @param url URL to add the the temporary whitelist
 */
export async function addToTempWhitelist(url: string) {
  const whitelist = await getTempWhitelist();
  await chrome.storage.session.set({
    whitelist: [...(whitelist ?? []), url],
  });
}
