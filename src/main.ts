import { fetchTimeout } from './module/fetch'
import { createComponent, createComponentLink } from './module/helper'
import type { RepoData } from './module/type/types'

import './style/reset.scss'
import './style/root.scss'
import './style/main.scss'

const REPOS_GRID = document.getElementById('repos-grid') as HTMLDivElement

startUp()

async function startUp() {
	const REPO_LIST: RepoData[] = await fetchTimeout()

	if (REPO_LIST) {
		buildRepoGrid(REPO_LIST)
	} else {
		startUp()
	}
}

function buildRepoGrid(repositories_list: RepoData[]) {
	for (const key in repositories_list) {
		if (repositories_list[key].name.includes('Artini04')) {
			continue
		}
		createGridItem(repositories_list[key])
	}
}

async function createGridItem(value: RepoData) {
	const ROOT = createComponent('', { html_tag: 'div', html_class: 'repo-root' })
	const INFO = createComponent('', { html_tag: 'div', html_class: 'repo-info' })
	ROOT.appendChild(INFO)
	const NAME = createComponent(value.name, { html_tag: 'span', html_class: 'repo-info__name' })
	INFO.appendChild(NAME)
	const ID = createComponent(value.id, { html_tag: 'span', html_class: 'repo-info__id' })
	INFO.appendChild(ID)

	if (value.desc && value.desc.length != 0) {
		const DESC = createComponent(value.desc, { html_tag: 'span', html_class: 'repo-info__desc' })
		INFO.appendChild(DESC)
	}

	if (value.topics && value.topics.length != 0) {
		const TOPICS = createComponent('', { html_tag: 'div', html_class: 'repo-topics' })
		ROOT.appendChild(TOPICS)

		for (const key in value.topics) {
			const top_value = value.topics[key]
			const TOPIC = createComponent(top_value, { html_tag: 'div', html_class: 'repo-topics__topic' })
			TOPICS.appendChild(TOPIC)
		}
	}

	if (value.languages && value.languages.length != 0) {
		const LANGS = createComponent('', { html_tag: 'div', html_class: 'repo-langs' })
		ROOT.appendChild(LANGS)

		for (const key in value.languages) {
			const lang_value = value.languages[key]
			const LANG = createComponent(lang_value, { html_tag: 'div', html_class: 'repo-langs__lang' })
			LANGS.appendChild(LANG)
		}
	}

	const URL = createComponentLink(value.url, 'repo-root__link')
	ROOT.appendChild(URL)

	REPOS_GRID.appendChild(ROOT)
}
