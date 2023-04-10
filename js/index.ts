'use strict'

githubFetch()

interface Repo {
	allow_forking: boolean
	archive_url: string
	archived: boolean
	assignees_url: string
	blobs_url: string
	branches_url: string
	clone_url: string
	collaborators_url: string
	comments_url: string
	commits_url: string
	compare_url: string
	contents_url: string
	contributors_url: string
	created_at: Date
	default_branch: string
	deployments_url: string
	description: string
	disabled: boolean
	downloads_url: string
	events_url: string
	fork: boolean
	forks: number
	forks_count: number
	forks_url: string
	full_name: string
	git_commits_url: string
	git_refs_url: string
	git_tags_url: string
	git_url: string
	has_discussions: boolean
	has_downloads: boolean
	has_issues: boolean
	has_pages: boolean
	has_projects: boolean
	has_wiki: boolean
	homepage: string
	hooks_url: string
	html_url: string
	id: number
	is_template: boolean
	issue_comment_url: string
	issue_events_url: string
	issues_url: string
	keys_url: string
	labels_url: string
	language: null | string
	languages_url: string
	license: License | null
	merges_url: string
	milestones_url: string
	mirror_url: null
	name: string
	node_id: string
	notifications_url: string
	open_issues: number
	open_issues_count: number
	owner: Owner
	private: boolean
	pulls_url: string
	pushed_at: Date
	releases_url: string
	size: number
	ssh_url: string
	stargazers_count: number
	stargazers_url: string
	statuses_url: string
	subscribers_url: string
	subscription_url: string
	svn_url: string
	tags_url: string
	teams_url: string
	topics: string[]
	trees_url: string
	updated_at: Date
	url: string
	visibility: string
	watchers: number
	watchers_count: number
	web_commit_signoff_required: boolean
}

interface License {
	key: string
	name: string
	node_id: string
	spdx_id: string
	url: string
}

interface Owner {
	avatar_url: string
	events_url: string
	followers_url: string
	following_url: string
	gists_url: string
	gravatar_id: string
	html_url: string
	id: number
	login: string
	node_id: string
	organizations_url: string
	received_events_url: string
	repos_url: string
	site_admin: boolean
	starred_url: string
	subscriptions_url: string
	type: string
	url: string
}

interface PARAM_HTML {
	html_tag: string
	html_class?: string
}

const repo_list: Repo[] = []
let user_json = {}
const REPO_GRID = document.getElementById('repos-grid') as HTMLDivElement

async function githubFetch() {
	const API_URL = 'https://api.github.com/users/artini04/repos'
	const response = await fetch(API_URL)
		.then((r) => r.json())
		.catch((e) => console.log(e))
	repo_list.push(...response)

	buildRepoGrid()
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

	// SVN-URL
	const CONT_HTML_URL = createComponentLink(obj.html_url, 'repo-root__link')
	CONT_ROOT.appendChild(CONT_HTML_URL)

	REPO_GRID.appendChild(CONT_ROOT)
}

function createComponent(obj_prop: string | number, { html_tag, html_class }: PARAM_HTML) {
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
