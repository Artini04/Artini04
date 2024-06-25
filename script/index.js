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
