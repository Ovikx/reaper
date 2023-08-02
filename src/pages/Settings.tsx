import { useState, useEffect } from "preact/hooks";
import { getLocalSetting, setLocalSetting } from "../service/storageUtils";
import { HomeButton } from "../components/HomeButton";
import { useNavigate } from "react-router-dom";

/**
 * Checks if the provided number is a valid year
 * @param year Year to check
 * @returns Whether or not the year is valid
 */
function isValidYear(year: number): boolean {
  return year.toString().length == 4;
}

export function SettingsPage() {
  const [yearInput, setYearInput] = useState(0);
  const navigate = useNavigate();
  console.log(yearInput);

  const onYearChange = (target: HTMLInputElement) => {
    const input = parseInt(target.value);
    setYearInput(input);
    if (isValidYear(input)) {
      setLocalSetting("birthYear", input);
    }
  };

  useEffect(() => {
    getLocalSetting("birthYear").then((value) => setYearInput(value));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="absolute top-4 right-4">
        <HomeButton />
      </div>
      <h1 className="ml-10 text-gray-400 text-lg font-bold mt-5">Settings</h1>
      <hr className="w-5/6 mx-auto border-gray-700 my-4" />
      <div className="ml-10">
        <h1 className="text-gray-100 text-lg font-bold">Birth year</h1>
        <p className="text-gray-400 text-xs mt-1 font-sans w-4/5">
          {"Don't worry, none of your data leaves your device"}
        </p>
        <input
          type="number"
          value={yearInput}
          onChange={(e) => onYearChange(e.target as HTMLInputElement)}
          max={4}
          min={4}
          className={`${
            isValidYear(yearInput) ? "border-green-800" : "border-red-800"
          } bg-gray-900 border-2 w-16 h-8 text-white mt-3 pl-2 rounded-lg appearance-none focus:outline-none`}
        ></input>
      </div>
      <hr className="w-5/6 mx-auto border-gray-700 my-4" />
      <div className="ml-10">
        <h1 className="text-gray-100 text-lg font-bold">Blacklist</h1>
        <p className="text-gray-400 text-xs mt-1 font-sans w-4/5">
          Change which websites this extension considers bad
        </p>
        <button
          className="border-gray-400 border-2 h-8 px-2 rounded-lg text-white mt-3 text-sm hover:border-gray-500 hover:text-gray-500"
          onClick={() => navigate("/blacklist")}
        >
          Edit blacklist
        </button>
      </div>
    </div>
  );
}
