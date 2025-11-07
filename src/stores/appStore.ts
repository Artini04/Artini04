import { atom } from "nanostores"

export const isDarkMode = atom(false)

isDarkMode.subscribe((data) => {
	document.documentElement.setAttribute("data-dark-mode", data.toString())
})
