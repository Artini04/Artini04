import type { Repo, Param_HTML, ItemWithExpiry } from './types'

/**
 * githubFetch() : fetch Github API
 * buildRepoGrid() : build repository list UI
 */

const REPO_GRID = document.getElementById('repos-grid') as HTMLDivElement
const repo_list: Repo[] = []

checkCache()

async function checkCache() {
	const added_time = 21600 * 500 // 3hrs
	const local_data = getWithExpiry('github-data')

	if (local_data) {
		repo_list.push(...local_data)
		buildRepoGrid()
	} else {
		setWithExpiry('github-data', await githubFetch(), added_time)
		checkCache()
	}

	function setWithExpiry(key: string, value: any, ttl: number) {
		const now = new Date()

		const item: ItemWithExpiry = {
			value: value,
			expiry: now.getTime() + ttl,
		}

		localStorage.setItem(key, JSON.stringify(item))
	}

	function getWithExpiry(key: string) {
		const local_data = localStorage.getItem(key)

		if (!local_data) {
			return null
		}

		const item: ItemWithExpiry = JSON.parse(local_data)
		const now = new Date()

		// console.log(`NOW: ${now.toLocaleTimeString()}\nLOCAL: ${new Date(item.expiry).toLocaleTimeString()}\n${now.getTime() > item.expiry}`)
		if (now.getTime() > item.expiry) {
			localStorage.removeItem(key)
			return null
		}

		return item.value
	}
}

async function githubFetch() {
	const API_URL = 'https://api.github.com/users/artini04/repos'
	const response = await fetch(API_URL)
		.then((r) => r.json())
		.catch((e) => console.log(e))
	return response
}

function buildRepoGrid() {
	for (const key in repo_list) {
		const repo = repo_list[key]

		// Skip Github Account Repo
		if (repo.name.includes('Artini04')) {
			continue
		}
		createGridItem(repo)
	}
}

async function createGridItem(obj: Repo) {
	// Root
	const CONT_ROOT = document.createElement('div')
	CONT_ROOT.classList.add('repo-root')

	const CONT_INFO = createComponent('', { html_tag: 'div', html_class: 'repo-info' })
	CONT_ROOT.appendChild(CONT_INFO)

	// Name
	const CONT_NAME = createComponent(obj.name, { html_tag: 'span', html_class: 'repo-info__name' })
	CONT_INFO.appendChild(CONT_NAME)

	// ID
	const CONT_ID = createComponent(obj.id, { html_tag: 'span', html_class: 'repo-info__id' })
	CONT_INFO.appendChild(CONT_ID)

	// Description
	if (obj.description.length != 0 || !!obj.description) {
		const CONT_DESC = createComponent(obj.description, { html_tag: 'span', html_class: 'repo-info__desc' })
		CONT_INFO.appendChild(CONT_DESC)
	}

	// GIT-TOPICS
	if (obj.topics.length != 0) {
		const CONT_TOPICS = createComponent('', { html_tag: 'div', html_class: 'repo-topics' })
		CONT_ROOT.appendChild(CONT_TOPICS)

		for (const key in obj.topics) {
			const topic = obj.topics[key]
			const CONT_TOPIC = createComponent(topic, { html_tag: 'span', html_class: 'repo-topics__topic' })
			CONT_TOPICS.appendChild(CONT_TOPIC)
		}
	}

	const CONT_LANGS = createComponent('', { html_tag: 'div', html_class: 'repo-langs' })
	CONT_ROOT.appendChild(CONT_LANGS)

	const lang_list = await getLangs(obj.languages_url)
	const lang_list_property = Object.getOwnPropertyNames(lang_list)

	for (const key in lang_list_property) {
		const language = lang_list_property[key]
		const CONT_LANG = createComponent(language, { html_tag: 'span', html_class: 'repo-langs__lang' })
		CONT_LANGS.appendChild(CONT_LANG)
	}

	// HTML-URL
	const CONT_HTML_URL = createComponentLink(obj.html_url, 'repo-root__link')
	CONT_ROOT.appendChild(CONT_HTML_URL)

	REPO_GRID.appendChild(CONT_ROOT)
}

function createComponent(obj_prop: string | number, { html_tag, html_class }: Param_HTML) {
	const CONT_COMP = document.createElement(html_tag)
	if (!!html_class) CONT_COMP.classList.add(html_class)
	CONT_COMP.innerHTML = obj_prop.toString()
	return CONT_COMP
}

function createComponentLink(obj_prop: string, html_class: string) {
	const LINK = document.createElement('a') as HTMLAnchorElement
	if (!!html_class) LINK.classList.add(html_class)
	LINK.target = '_blank'
	LINK.href = obj_prop.toString()
	return LINK
}

async function getLangs(lang_url: string) {
	const response = await fetch(lang_url)
		.then((r) => r.json())
		.catch((e) => console.log(e))

	return response
}
