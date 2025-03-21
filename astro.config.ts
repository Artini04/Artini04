// @ts-check
import { defineConfig } from "astro/config"

import icon from "astro-icon"

// https://astro.build/config
export default defineConfig({
  site: "https://artini04.github.io",
  base: "/Artini04",

  integrations: [icon()]
})
