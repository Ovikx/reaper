import { Store } from "agile-store";
import { Session } from "../types/types";

export const sessionStore = new Store<Session>({
  keyPath: "id",
  name: "sessions",
  indices: ["timeEnded", "timeStarted", "url"],
});

export const dbConfig = {
  dbName: "am",
  version: 1,
};
