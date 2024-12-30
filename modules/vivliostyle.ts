import type { VivliostyleConfigSchema } from "@vivliostyle/cli";
import { build } from "@vivliostyle/cli";
import { loadConfig } from "c12";
import { readdir, writeFile } from "node:fs/promises";
import {
  createResolver,
  defineNuxtModule
} from "nuxt/kit";
import { DynamicPublicDirectory } from "vite-multiple-assets";

// Module options TypeScript interface definition
export interface ModuleOptions {
  contentDir: string;
}

export type BookConfig = Partial<
  {
    props: Record<string, unknown>;
  } & VivliostyleConfigSchema
>;

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-vivliostyle",
    configKey: "vivliostyle",
  },
  defaults: {
    contentDir: "content",
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    if (!nuxt.options.vite.plugins) nuxt.options.vite.plugins = [];

    nuxt.options.vite.plugins.push(
      DynamicPublicDirectory([
        {
          input: resolver.resolve("../viewer/**"),
          output: "/_viewer",
        },
      ]),
    );

    nuxt.hook("nitro:build:public-assets", async () => {
      const { resolve: resolveRoot } = createResolver(nuxt.options.rootDir);
      const { resolve: resolveTemp } = createResolver(nuxt.options.buildDir);
      const configPath = resolveTemp("vivliostyle.config.json");

      const config = [];

      for (const book of await readdir(resolveRoot(options.contentDir))) {
        const bookRoot = resolveRoot(options.contentDir, book);
        const manuscripts = await readdir(bookRoot);
        const entry = manuscripts
          .filter((file) => file.endsWith(".md"))
          .map((file) => file.replace(".md", ".html"));
        const bookConfig = await loadConfig<BookConfig>({
          cwd: bookRoot,
          defaultConfig: {
            entry,
            entryContext: resolveRoot("dist/raw", book),
            output: resolveRoot(`dist/${book}.pdf`),
            props: {},
          },
        });
        config.push(bookConfig.config);
      }
      await writeFile(configPath, JSON.stringify(config), "utf-8");

      await build({ configPath });
    });
  },
});
