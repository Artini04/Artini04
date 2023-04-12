import type { Param_HTML } from '../type/types'

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

export { createComponent, createComponentLink }
