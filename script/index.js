const baseWindChime = document.getElementById("wind-chime-base");
const divWindChime = document.getElementById("wind-chimes");
const divWindChimeChildren = divWindChime.children;

if (window.screen.availWidth > 480) {
	tippy("#used-font", {
		content: "Font used >> Ebihara no kuseji TrueType 🔗",
		placement: "right",
		followCursor: true,
		offset: [0, 20],
		arrow: false,
	});

	tippy("#github-link", {
		content: "Github 🔗",
		placement: "top",
		followCursor: true,
		offset: [0, 20],
		arrow: false,
	});

	tippy("#info", {
		content: "Aspiring WebDev | Studying Japanese",
		placement: "left",
		followCursor: true,
		offset: [0, 20],
		arrow: false,
	});
}

appendAnimation();

function appendAnimation() {
	const cBaseDuration = parseInt(baseWindChime.getAttribute("anim-duration"));
	baseWindChime.style.transformOrigin = "top";
	baseWindChime.animate([{ rotate: "0deg" }, { rotate: "1deg" }], {
		fill: "both",
		duration: cBaseDuration,
		iterations: Infinity,
		easing: "ease-in-out",
		direction: "alternate",
	});

	for (const chime of divWindChimeChildren) {
		const cDuration = parseInt(chime.getAttribute("anim-duration"));
		chime.style.transformOrigin = "top";
		chime.animate([{ rotate: "-1deg" }, { rotate: "1deg" }], {
			fill: "both",
			duration: cDuration,
			iterations: Infinity,
			easing: "ease-in-out",
			direction: "alternate",
		});
	}
}
