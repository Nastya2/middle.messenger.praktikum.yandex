interface ErrorValidity {
    patternMismatch?: string;
    max?: number;
    min?: number;
}

export function checkValidityElement(check_elem: HTMLInputElement, error_text: ErrorValidity): string {
    if (check_elem) {
        if(check_elem.validity.patternMismatch) {
           return error_text.patternMismatch || "Некорректное поле.";
        } else if(check_elem.validity.valueMissing) {
            return "Пожалуйста, заполните поле.";
        } else if(check_elem.validity.tooLong) {
            if (error_text.max) {
                return `Максимальное число символов ${error_text.max}`;
            } else {
                return `Превышено максимальное число символов`;
            }
        }
        else if(check_elem.validity.tooShort) {
            if (error_text.min) {
                return `Минимальное число символов ${error_text.min}`;
            } else {
                return`Слово слишком короткое`;
            }
        }
    }

    return "";
}

export function checkValidityForm(obj: {[key:string]: boolean}): boolean {
    return !Object.values(obj).includes(true);
}