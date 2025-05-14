import { annotate } from "https://unpkg.com/rough-notation?module";

window.addEventListener("DOMContentLoaded", () => {
	function safeAnnotate(selector, options) {
		const el = document.querySelector(selector);
		if (el) {
			const annotation = annotate(el, options);
			annotation.show();
		}
	}

	safeAnnotate(".highlight", {
		type: "highlight",
		color: "#66d7ee",
	});

	safeAnnotate(".underline", {
		type: "underline",
		color: "red",
	});

	safeAnnotate(".box", {
		type: "box",
		color: "#66d7ee",
	});

	safeAnnotate(".bracket", {
		type: "bracket",
	});

	safeAnnotate(".circle", {
		type: "circle",
		color: "red",
	});

	safeAnnotate(".cross", {
		type: "crossed-off",
	});

	safeAnnotate(".strike", {
		type: "strike-through",
	});
});
