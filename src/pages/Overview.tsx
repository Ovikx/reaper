import { useState, useMemo, useEffect } from "preact/hooks";
import { getBirthYear } from "../service/storageUtils";
import { sessionStore } from "../db/db";
import { getMsLeft } from "../utils";
import { UnitSelector } from "../components/UnitSelector";

export type TimeUnit = "H" | "M" | "S";

const weekMs = 604800000;
const interval = 1000; // ms
const factors: Record<TimeUnit, number> = {
  H: 1000 * 60 * 60,
  M: 1000 * 60,
  S: 1000,
};

const unitToString: Record<TimeUnit, string> = {
  H: "HOURS",
  M: "MINUTES",
  S: "SECONDS",
};

export function OverviewPage() {
  const [allTime, setAllTime] = useState(0);
  const [recentTime, setRecentTime] = useState(0);
  const [msLeft, setMsLeft] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<TimeUnit>("S");

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

  getBirthYear().then((res) => {
    setMsLeft(getMsLeft(res));
  });

  return (
    <div className="flex flex-col items-center">
      <div className="mt-5">
        <UnitSelector
          selectedUnit={selectedUnit}
          setSelectedUnit={setSelectedUnit}
        />
      </div>
      <div className="mt-5 flex flex-col items-center justify-center">
        <h1 className="text-red-600 text-4xl font-black font-sans">
          {Math.floor(msLeft / factors[selectedUnit])}
        </h1>
        <p className="text-gray-300 text-md font-bold font-sans">
          {unitToString[selectedUnit]} LEFT UNTIL DEATH
        </p>
        <hr className="w-full mt-2 border-gray-600"></hr>
        <h1 className="text-red-600 text-3xl font-black font-sans mt-4">
          {Math.ceil(recentTime / factors[selectedUnit])}
        </h1>
        <p className="text-gray-300 text-md font-semibold font-sans">
          WASTED THIS WEEK
        </p>
        <h1 className="text-red-600 text-3xl font-black font-sans mt-4">
          {Math.ceil(allTime / factors[selectedUnit])}
        </h1>
        <p className="text-gray-300 text-md font-semibold font-sans">
          WASTED IN TOTAL
        </p>
      </div>
    </div>
  );
}
