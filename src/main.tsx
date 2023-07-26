import { render } from "preact";
import { App } from "./app";
import { createStores } from "agile-store";
import { sessionStore } from "./db/db";

createStores("am", 1, [sessionStore]).then(() => {
  render(<App />, document.getElementById("app")!);
});
