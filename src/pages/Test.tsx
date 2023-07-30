import { sessionStore } from "../db/db";
import { useState } from "preact/hooks";
import { Session } from "../types/types";

export function TestPage() {
  const [activeRec, setActiveRec] = useState<Session>();
  const onSubmitClick = () => {
    sessionStore
      .put({
        id: "test",
        timeStarted: Math.random(),
        url: "test.com",
      })
      .catch((err) => console.log(err));
  };

  const onReadClick = () => {
    sessionStore
      .getOne("id", "test")
      .then((res) => res && setActiveRec(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-white p-10 mx-auto">Hello world!</h1>
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
      {activeRec && <h1 className="text-white p-5">{activeRec.timeStarted}</h1>}
    </div>
  );
}
