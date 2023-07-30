/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "preact/hooks";
import { defaultBirthYear } from "../constants";
import { getBirthYear } from "../service/storageUtils";
import { sessionStore } from "../db/db";

const weekMs = 604800000;

export function OverviewPage() {
  const [birthYear, setBirthYear] = useState(defaultBirthYear());
  const [allTime, setAllTime] = useState(0);
  const [recentTime, setRecentTime] = useState(0);

  getBirthYear().then((res) => setBirthYear(res));
  sessionStore.getMany("timeEnded", { upper: Date.now() }).then((res) => {
    let totalAll = 0;
    let totalRecent = 0;
    for (const session of res) {
      if (session.timeEnded) {
        const sessionLength = session.timeEnded - session.timeStarted;
        if (session.timeStarted > Date.now() - weekMs) {
          totalRecent += sessionLength;
        }
        totalAll += sessionLength;
      }
    }

    setAllTime(totalAll);
    setRecentTime(totalRecent);
  });
  return (
    <>
      <div></div>
    </>
  );
}
