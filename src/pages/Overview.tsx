/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useMemo, useEffect } from "preact/hooks";
import { AVG_LIFESPAN, defaultBirthYear } from "../constants";
import { getBirthYear } from "../service/storageUtils";
import { sessionStore } from "../db/db";
import { Link } from "react-router-dom";
import { getMsLeft } from "../utils";

const weekMs = 604800000;
const interval = 1000; // ms

export function OverviewPage() {
  const [birthYear, setBirthYear] = useState(defaultBirthYear());
  const [allTime, setAllTime] = useState(0);
  const [recentTime, setRecentTime] = useState(0);
  const [msLeft, setMsLeft] = useState(0);
  useMemo(() => {
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
  }, []);

  useEffect(() => {
    if (!msLeft) return;
    const intervalId = setInterval(() => {
      setMsLeft(msLeft - interval);
    }, interval);

    return () => clearInterval(intervalId);
  }, [msLeft]);

  const secondsLeft = Math.floor(msLeft / 1000);

  getBirthYear().then((res) => {
    setBirthYear(res);
    setMsLeft(getMsLeft(res));
  });

  return (
    <div className="flex flex-col items-center">
      <Link to="/test">
        <p className="text-white text-2xl font-medium">GO TO TEST PAGE</p>
      </Link>
      <div className="mt-5 flex flex-col items-center justify-center">
        <h1 className="text-red-600 text-4xl font-black font-sans">
          {secondsLeft}
        </h1>
        <p className="text-gray-300 text-xl font-bold font-sans">
          seconds left until death...
        </p>
      </div>
    </div>
  );
}
