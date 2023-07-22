import { render } from "preact";
import { App } from "./app.tsx";
import { createStores } from "agile-store";
import { sessionStore } from "./db/db.ts";

createStores("am", 1, [sessionStore]).then(() => {
  render(<App />, document.getElementById("app")!);
});
