import { render } from "preact";
import { App } from "./app";
import { createStores } from "agile-store";
import { sessionStore } from "./db/db";
import "./index.css";

createStores("am", 1, [sessionStore]).then(() => {
  render(<App />, document.getElementById("app")!);
});
