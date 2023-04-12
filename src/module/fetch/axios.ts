import axios from 'axios'
import { setWithExpiry, getWithExpiry } from '../helper'
import type { Repo, RepoData } from '../type/types'

async function axiosFetchGithub() {
	const option = {
		method: 'GET',
		url: 'https://api.github.com/users/artini04/repos',
	}

	const [data, error] = await axios
		.request(option)
		.then((r) => [r.data, null])
		.catch((e) => [null, e])

	return { data, error }
}

async function axiosFetchGithubLang(lang_url: string) {
	const option = {
		method: 'GET',
		url: lang_url,
	}
	const [data, error] = await axios
		.request(option)
		.then((r) => [Object.getOwnPropertyNames(r.data), null])
		.catch((e) => [null, e])

	return { data, error }
}

async function fetchTimeout(): Promise<any> {
	// Check whether data is available in localStorage
	const added_time = 21600 * 500,
		local_data = getWithExpiry('github-data')

	if (local_data) {
		// console.log(localStorage.getItem('github-data') !== null)
		// console.table(local_data)
		return local_data
	} else {
		const { data: repo_data } = (await axiosFetchGithub()) as { data: Repo }
		const repo_data_fixed: RepoData[] = []

		for (const key in repo_data) {
			const value: Repo = repo_data[key],
				{ data: languages } = await axiosFetchGithubLang(value.languages_url)

			const fixed_value: RepoData = {
				id: value.id,
				name: value.name,
				desc: value.description,
				topics: value.topics,
				languages: languages,
				url: value.html_url,
			}

			repo_data_fixed.push(fixed_value)
		}

		setWithExpiry('github-data', repo_data_fixed, added_time)
		fetchTimeout()
	}
}

export { axiosFetchGithub, axiosFetchGithubLang, fetchTimeout }
