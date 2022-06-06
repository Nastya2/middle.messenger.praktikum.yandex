export function checkValidity(check_elem, error_elem, error_text) {
    console.log(check_elem.validity);
    if (error_elem) {
        if (check_elem.validity.patternMismatch) {
            error_elem.classList.remove("none");
            error_elem.textContent = error_text.patternMismatch || "Некорректное поле.";
        }
        else if (check_elem.validity.valueMissing) {
            error_elem.classList.remove("none");
            error_elem.textContent = "Пожалуйста, заполните поле.";
        }
        else if (check_elem.validity.tooLong) {
            error_elem.classList.remove("none");
            if (error_text.max) {
                error_elem.textContent = `Максимальное число символов ${error_text.max}`;
            }
            else {
                error_elem.textContent = `Превышено максимальное число символов`;
            }
        }
        else if (check_elem.validity.tooShort) {
            error_elem.classList.remove("none");
            if (error_text.min) {
                error_elem.textContent = `Минимальное число символов ${error_text.min}`;
            }
            else {
                error_elem.textContent = `Слово слишком короткое`;
            }
        }
        else {
            error_elem.classList.add("none");
        }
    }
}
//# sourceMappingURL=validation-functions.js.map