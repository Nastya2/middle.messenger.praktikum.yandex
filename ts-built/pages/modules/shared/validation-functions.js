export function checkValidity(check_elem, error_elem, error_text) {
    if (error_elem) {
        if (check_elem.validity.patternMismatch) {
            error_elem.classList.remove("none");
            error_elem.textContent = error_text.patternMismatch || "Некорректное поле.";
        }
        else if (check_elem.validity.valueMissing) {
            error_elem.classList.remove("none");
            error_elem.textContent = "Пожалуйста, заполните поле.";
        }
        else {
            error_elem.classList.add("none");
        }
    }
}
//# sourceMappingURL=validation-functions.js.map