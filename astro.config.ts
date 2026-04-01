// @ts-check
import { defineConfig } from "astro/config"
import { fileURLToPath } from "url"
import path from "path"

import icon from "astro-icon"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
	site: "https://artini04.github.io",
	base: "/Artini04",
	vite: {
		resolve: {
			alias: {
				"@components": path.resolve(__dirname, "src/components"),
				"@layouts": path.resolve(__dirname, "src/layouts"),
				"@styles": path.resolve(__dirname, "src/styles"),
				"@data": path.resolve(__dirname, "src/data"),
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					importers: [
						{
							findFileUrl(url) {
								const aliases = {
									"@components": path.resolve(
										__dirname,
										"src/components",
									),
									"@layouts": path.resolve(
										__dirname,
										"src/layouts",
									),
									"@styles": path.resolve(
										__dirname,
										"src/styles",
									),
									"@data": path.resolve(
										__dirname,
										"src/data",
									),
								}
								for (const [alias, target] of Object.entries(
									aliases,
								)) {
									if (
										url.startsWith(alias + "/")
										|| url === alias
									) {
										return new URL(
											"file://"
												+ url.replace(alias, target),
										)
									}
								}
								return null
							},
						},
					],
				},
			},
		},
	},

	integrations: [icon()],
})
