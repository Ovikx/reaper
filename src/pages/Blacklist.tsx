import { HomeButton } from "../components/HomeButton";
import { useState, useEffect } from "preact/hooks";
import { getLocalSetting, setLocalSetting } from "../service/storageUtils";
import React from "preact/compat";
import { BlacklistItem } from "../components/BlacklistItem";

/**
 * Checks if a URL is good to add to the DB (it does not have to include `".com"`)
 * @param url URL to check
 * @param existingUrls URLs that have already been added
 * @returns Whether or not this URL is good to add to the DB
 */
function isValidURL(url: string, existingUrls: string[]): boolean {
  return url.length > 0 && !existingUrls.includes(url);
}

export function BlacklistPage() {
  const [urls, setUrls] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState("");

  useEffect(() => {
    fetchBlacklist();
  }, []);

  const fetchBlacklist = () =>
    getLocalSetting("blacklist").then((res) => setUrls(res));

  const onInputChange = (target: HTMLInputElement) => {
    setUrlInput(target.value);
  };

  const onInputEnter = (target: KeyboardEvent) => {
    if (target.key == "Enter") onSubmit();
  };

  const onSubmit = () => {
    if (isValidURL(urlInput, urls))
      setLocalSetting("blacklist", [urlInput, ...urls]).then(() => {
        fetchBlacklist();
        setUrlInput("");
      });
  };

  const elems: React.JSX.Element[] = [];

  for (const item of urls) {
    elems.push(<BlacklistItem url={item} refreshList={fetchBlacklist} />);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="absolute top-4 right-4">
        <HomeButton />
      </div>
      <h1 className="ml-10 text-gray-400 text-lg font-bold mt-5">Blacklist</h1>
      <hr className="w-5/6 mx-auto border-gray-700 my-4" />
      <div className="w-4/5 mx-auto flex flex-row items-center justify-between">
        <input
          placeholder="e.g. 'youtube.com'"
          className={`${
            isValidURL(urlInput, urls) ? "border-green-800" : "border-red-800"
          } bg-gray-900 border-2 w-9/12 h-8 text-white mt-3 pl-2 rounded-lg appearance-none text-xs focus:outline-none`}
          onChange={(event) => onInputChange(event.target as HTMLInputElement)}
          onKeyPress={(event) => onInputEnter(event as KeyboardEvent)}
          value={urlInput}
        />
        <button
          className="mt-3 px-2 border-2 border-gray-900 fill-gray-100"
          onClick={onSubmit}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="28"
            viewBox="0 -960 960 960"
            width="28"
          >
            <path d="M453-280h60v-166h167v-60H513v-174h-60v174H280v60h173v166Zm27.266 200q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Zm.234-60Q622-140 721-239.5t99-241Q820-622 721.188-721 622.375-820 480-820q-141 0-240.5 98.812Q140-622.375 140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z" />
          </svg>
        </button>
      </div>
      <div className=" w-4/5 mx-auto mb-5 mt-5 h-full overflow-auto appearance-none scroll-smooth pr-1">
        {elems}
      </div>
    </div>
  );
}
