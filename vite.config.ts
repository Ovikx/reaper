import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import webExtension from "@samrum/vite-plugin-web-extension";
import manifest from "./public/manifest.json";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const browser = process.env.TARGET_BROWSER;
  if (browser === undefined) {
      throw new Error("TARGET_BROWSER is not defined");
  }
  if (browser !== "chrome" && browser !== "firefox") {
      throw new Error(`TARGET_BROWSER is not supported: ${browser}`);
  }
  if (browser === "firefox") {
    manifest.background["scripts"] = ["src/service/mainWorker.ts"]
  } else {
    manifest.background["service_worker"] = "src/service/mainWorker.ts"
  }

  return {
    plugins: [
      preact(),
      webExtension({
        manifest: manifest,
      }),
    ],
    build: {
      outDir: './dist/' + browser,
      rollupOptions: {
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: "[name].[ext]",
        },
      },
    },
  };
});
