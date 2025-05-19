
// Создаем глобальный массив для хранения всех аннотаций
let activeAnnotations = [];

function safeAnnotate(selector, options) {
    document.querySelectorAll(selector).forEach(el => {
        const annotation = RoughNotation.annotate(el, options);
        activeAnnotations.push(annotation);
        annotation.show();
    });
}

function applyAnnotations() {
    // Сначала очищаем все активные аннотации
    activeAnnotations.forEach(annotation => {
        if (annotation && typeof annotation.hide === 'function') {
            annotation.hide();
        }
    });
    // Очищаем массив аннотаций
    activeAnnotations = [];
    
    // Применяем новые аннотации
    safeAnnotate(".highlight", { type: "highlight", color: "red" });
    safeAnnotate(".underline", { type: "underline", color: "black" });
    safeAnnotate(".box", { type: "box", color: "red" });
    safeAnnotate(".bracket", { type: "bracket" });
    safeAnnotate(".circle", { type: "circle", color: "black" });
    safeAnnotate(".cross", { type: "crossed-off" });
    safeAnnotate(".strike", { type: "strike-through" });
    safeAnnotate(".none", { type: "highlight", color: "black" });
}
