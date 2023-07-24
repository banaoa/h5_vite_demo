import { defineConfig, loadEnv } from "vite";
import vue from '@vitejs/plugin-vue'
import { resolve, join } from "path";
import { readdirSync } from "fs";

const project_pages = {};
const entryPath = resolve(__dirname, "./src/pages");
const entrys = readdirSync(entryPath).reduce((obj, dirname) => {
  obj[dirname] = join(entryPath, dirname);
  return obj;
}, {});
Object.keys(entrys).forEach(pageName => {
  project_pages[pageName] = resolve(__dirname, `src/pages/${pageName}/index.html`);
});
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let pages = {};
  const env = loadEnv(mode, process.cwd());
  const isDev = mode === "development";
  console.log(mode);
  if (isDev) {
    pages = { ...project_pages };
  } else {
    if (env.VITE_APP_MODEL) {
      pages[env.VITE_APP_MODEL] = project_pages[env.VITE_APP_MODEL];
    } else {
      pages = { ...project_pages };
    }
  }
  return {
    plugins: [vue()],
    build: {
      rollupOptions: {
        input: pages,
        output: { dir: "./dist" }
      }
    },
    resolve: {
      extensions: [".js", ".ts", ".vue", ".json"],
      alias: {
        "@": resolve(__dirname, "src"),
        "@page1": resolve(__dirname, "src/pages/page1"),
        "@page2": resolve(__dirname, "src/pages/page2"),
      },
    },
  }
})
