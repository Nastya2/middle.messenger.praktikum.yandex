import Button from "../shared/components/button/button";
import { render } from "../utils/renderDom";
import { checkValidity } from "../shared/validation-functions";
import { regular_name } from "../shared/regular_expressions";


const form = document.querySelector('.info') as HTMLFormElement;
const error_first_name = form.querySelector('.error-first-name');
const error_second_name = form.querySelector('.error-second-name');
const first_name = form.elements.namedItem("first_name") as HTMLInputElement;
const second_name = form.elements.namedItem("second_name") as HTMLInputElement;

if (first_name) {
    first_name.setAttribute("pattern", regular_name);
}

if (second_name) {
    second_name.setAttribute("pattern", regular_name);
}

function getDataForm() {
    const data = {
        login: (form.elements.namedItem("login") as HTMLInputElement).value,
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
        first_name: first_name.value,
        second_name: second_name.value,
        phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
        display_name: (form.elements.namedItem("display_name") as HTMLInputElement).value,
        oldPassword: (form.elements.namedItem("oldPassword") as HTMLInputElement).value,
        newPassword: (form.elements.namedItem("newPassword") as HTMLInputElement).value,
        newPasswordRepeat: (form.elements.namedItem("newPasswordRepeat") as HTMLInputElement).value,
    };
    console.log(data);
    checkValidity(first_name, error_first_name, {patternMismatch: "Некорректное имя, пример, Иван или Ivan."});
    checkValidity(second_name, error_second_name, {patternMismatch: "Некорректная фамилия, пример, Иванов или Ivanov."});
}

first_name.addEventListener("focus", () => {
    if (error_first_name) {
        error_first_name.classList.add("none")
    }
});

first_name.addEventListener("blur", () => {
    checkValidity(first_name, error_first_name, {patternMismatch: "Некорректное имя, пример, Иван или Ivan."});
});

second_name.addEventListener("focus", () => {
    if (error_second_name) {
        error_second_name.classList.add("none");
    }
});

second_name.addEventListener("blur", () => {
    checkValidity(second_name, error_second_name, {patternMismatch: "Некорректная фамилия, пример, Иванов или Ivanov."});
});

const button = new Button({
    text: 'Сохранить',
    clases: 'btn btn_width280',
    event: {
        click: function() {
            getDataForm();
        }
    }
});
render(".btn-action", button);
