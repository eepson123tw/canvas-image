import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
  build: {
    cssCodeSplit: true,
    target: "esnext",
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(dirname(fileURLToPath(import.meta.url)), "src/index.ts"),
      name: "canvas-image",
      // the proper extensions will be added
      fileName: (fileName) => `canvas-image.${fileName}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        exports: "named",
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
