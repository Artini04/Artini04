export function unixToReadable(unixTime: number): string {
	const date = new Date(unixTime * 1000)
	const formatted = date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
	})

	return formatted
}
