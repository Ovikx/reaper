import { Store } from "agile-store";
import { Session } from "../types/types";

export const sessionStore = new Store<Session>({
  keyPath: "id",
  name: "sessions",
  indices: ["timeSpent", "timeStarted", "websiteURL"],
});
