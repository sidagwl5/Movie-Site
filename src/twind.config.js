import { defineConfig, install } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind";

const config = defineConfig({
  presets: [presetTailwind({})],
});

install(config);

export default config;
