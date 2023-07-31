import { render } from "preact";
import { createStores } from "agile-store";
import { sessionStore } from "./db/db";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { TestPage } from "./pages/Test";
import { OverviewPage } from "./pages/Overview";

const router = createMemoryRouter([
  {
    path: "/",
    element: <OverviewPage />,
  },
  {
    path: "/test",
    element: <TestPage />,
  },
]);

createStores("am", 1, [sessionStore]).then(() => {
  render(
    <div className="bg-gray-900 w-[300px] h-[350px]">
      <RouterProvider router={router} />
    </div>,
    document.getElementById("app")!,
  );
});
