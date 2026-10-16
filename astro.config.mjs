// @ts-check
import { defineConfig, fontProviders } from 'astro/config'
import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
	site: 'https://artini04.github.io',
	base: '/Artini04',
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Ebihara No Kuseji',
			cssVariable: '--font-ebihara',
			styles: ['normal'],
			weights: [600],
			fallbacks: ['sans-serif'],
			options: { variants: [{ src: ['./src/assets/fonts/EbiharaNoKuseji.ttf'] }] },
		},
		{
			provider: fontProviders.bunny(),
			name: 'Inconsolata',
			cssVariable: '--font-inconsolata',
			fallbacks: ['monospace'],
		},
		{
			provider: fontProviders.bunny(),
			name: 'M PLUS 2',
			cssVariable: '--font-mplus',
			fallbacks: ['sans-serif'],
		},
	],

	integrations: [icon()],
})
