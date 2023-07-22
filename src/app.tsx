import "./index.css";
import { sessionStore } from "./db/db";
import { useState } from "preact/hooks";
import { Session } from "./types/types";

export function App() {
  const [activeRec, setActiveRec] = useState<Session>();
  const onSubmitClick = () => {
    sessionStore
      .put({
        id: "test",
        timeSpent: Math.random(),
        timeStarted: Math.random(),
        websiteURL: "test.com",
      })
      .catch((err) => console.log(err));
  };

  const onReadClick = () => {
    sessionStore
      .getByKey("test")
      .then((res) => res && setActiveRec(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-gray-900 min-h-screen items-center flex flex-col">
      <h1 className="text-white p-10">Hello world!</h1>
      <button
        onClick={onSubmitClick}
        className="text-white border-2 border-white p-2"
      >
        ADD A RANDOM ONE
      </button>
      <button
        className="text-white p-2 mt-3 border-white border-2"
        onClick={onReadClick}
      >
        READ THE LATEST
      </button>
      {activeRec && <h1 className="text-white p-5">{activeRec.timeSpent}</h1>}
    </div>
  );
}
