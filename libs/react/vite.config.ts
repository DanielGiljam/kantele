// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

import {join} from "path";

import {defineConfig} from "vite";
import dts from "vite-plugin-dts";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    cacheDir: "../../node_modules/.vite/react",

    plugins: [
        dts({
            tsConfigFilePath: join(__dirname, "tsconfig.lib.json"),
            // Faster builds by skipping tests. Set this to false to enable type checking.
            skipDiagnostics: true,
        }),

        viteTsConfigPaths({
            root: "../../",
        }),
    ],

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [
    //    viteTsConfigPaths({
    //      root: '../../',
    //    }),
    //  ],
    // },

    // Configuration for building your library.
    // See: https://vitejs.dev/guide/build.html#library-mode
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points.
            entry: "src/index.ts",
            fileName: "index",
            // Change this to the formats you want to support.
            // Don't forgot to update your package.json as well.
            formats: ["es", "cjs"],
        },
        rollupOptions: {
            // External packages that should not be bundled into your library.
            external: [],
        },
    },

    test: {
        globals: true,
        cache: {
            dir: "../../node_modules/.vitest",
        },
        environment: "jsdom",
        include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    },
});