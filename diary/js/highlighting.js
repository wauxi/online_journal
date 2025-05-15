function safeAnnotate(selector, options) {
    document.querySelectorAll(selector).forEach(el => {
        const annotation = RoughNotation.annotate(el, options);
        annotation.show();
    });
}

function applyAnnotations() {
    // Удаляем старые аннотации перед применением новых
    document.querySelectorAll(".highlight, .underline, .box, .bracket, .circle, .cross, .strike").forEach(el => {
        el.replaceWith(el.cloneNode(true)); // Очищает старые анимации
    });

    // Применяем новые аннотации
    safeAnnotate(".highlight", { type: "highlight", color: "#66d7ee" });
    safeAnnotate(".underline", { type: "underline", color: "red" });
    safeAnnotate(".box", { type: "box", color: "#66d7ee" });
    safeAnnotate(".bracket", { type: "bracket" });
    safeAnnotate(".circle", { type: "circle", color: "red" });
    safeAnnotate(".cross", { type: "crossed-off" });
    safeAnnotate(".strike", { type: "strike-through" });
}
