export const $$ = document.querySelectorAll.bind(document)

export function appendAnimation(item: HTMLElement) {
  const duration = Number.parseInt(item.getAttribute("anim-duration") ?? "3000")
  item.style.transformOrigin = "top"
  item.animate([{ rotate: "-1deg" }, { rotate: "1deg" }], {
    fill: "both",
    duration: duration * 1.5,
    iterations: Infinity,
    easing: "ease-in-out",
    direction: "alternate"
  })
}

export function consoleTrace(msg: string, color: string = "white") {
  console.log(msg, `color: ${color}`)
}
