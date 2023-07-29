import { Session } from "../types/types";

export async function getSession(tabId: string): Promise<Session | undefined> {
  return (await chrome.storage.session.get(tabId))[tabId];
}
