import type { ItemWithExpiry } from '../type/types'

function setWithExpiry(key: string, value: any, ttl: number): void {
	const now = new Date()

	const item: ItemWithExpiry = {
		value: value,
		expiry: now.getTime() + ttl,
	}

	localStorage.setItem(key, JSON.stringify(item))
	return
}

function getWithExpiry(key: string): ItemWithExpiry | null {
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

export { setWithExpiry, getWithExpiry }
