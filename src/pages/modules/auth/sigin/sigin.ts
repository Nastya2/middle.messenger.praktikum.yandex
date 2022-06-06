import Button from "../../shared/components/button/button";
import { checkValidity } from "../../shared/validation-functions";
import { render } from "../../utils/renderDom";
import { regular_name, regular_login } from "../../shared/regular_expressions";

const form = document.querySelector('.auth-form') as HTMLFormElement;
const error_first_name = form.querySelector('.error-first-name');
const error_second_name = form.querySelector('.error-second-name');
const error_login = form.querySelector('.error-login');
const first_name = form.elements.namedItem("first_name") as HTMLInputElement;
const second_name = form.elements.namedItem("second_name") as HTMLInputElement;
const login = form.elements.namedItem("login") as HTMLInputElement;

addPattern();

const button = new Button({
    text: 'Зарегистрироваться',
    clases: 'btn btn_sigin-top-bottom',
    event: {
        click: function() {
            getDataForm();
        }
    }
});

render(".btn-action", button);


addEvent();

function addEvent(): void {
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

    login.addEventListener("focus", () => {
        if (error_login) {
            error_login.classList.add("none");
        }
    });
    
    login.addEventListener("blur", () => {
        checkValidity(login, error_login, {min: 3, max: 20, patternMismatch: "Некорректный логин, пример, login2022-5_5"});
    });
    
}

function addPattern(): void {
    if (first_name) {
        first_name.setAttribute("pattern", regular_name);
    }
    
    if (second_name) {
        second_name.setAttribute("pattern", regular_name);
    }
    
    if (login) {
        login.setAttribute("pattern", regular_login);
    }
}

function getDataForm() {
    const data = {
        login: login.value,
        password: (form.elements.namedItem("password") as HTMLInputElement).value,
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
        first_name: first_name.value,
        second_name: second_name.value,
        phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
        password_repeat: (form.elements.namedItem("password_repeat") as HTMLInputElement).value,
    };
    console.log(data);
    checkValidity(first_name, error_first_name, {patternMismatch: "Некорректное имя, пример, Иван или Ivan."});
    checkValidity(second_name, error_second_name, {patternMismatch: "Некорректная фамилия, пример, Иванов или Ivanov."});
    checkValidity(login, error_login, {min: 3, max: 20, patternMismatch: "Некорректный логин, пример, login2022-5_5"});
}