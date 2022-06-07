import Button from "../../shared/components/button/button";
import { checkValidity } from "../../shared/validation-functions";
import { render } from "../../utils/renderDom";
import { regular_login, regular_password } from "../../shared/regular_expressions";
const form = document.querySelector('.auth-form');
const login = form.elements.namedItem("login");
const password = form.elements.namedItem("password");
const error_login = form.querySelector('.error-login');
const error_password = form.querySelector('.error-password');
addPattern();
const button = new Button({
    text: 'Вход',
    clases: 'btn btn_sigin-top-bottom',
    event: {
        click: function () {
            getDataForm();
        }
    }
});
render(".btn-action", button);
addEvent();
function getDataForm() {
    const data = {
        login: login.value,
        password: password.value
    };
    checkValidity(login, error_login, { min: 3, max: 20, patternMismatch: "Некорректный логин, пример, login2022-5_5" });
    checkValidity(password, error_password, { min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру" });
    console.log(data);
}
function addEvent() {
    login.addEventListener("focus", () => {
        if (error_login) {
            error_login.classList.add("none");
        }
    });
    login.addEventListener("blur", () => {
        checkValidity(login, error_login, { min: 3, max: 20, patternMismatch: "Некорректный логин, пример, login2022-5_5" });
    });
    password.addEventListener("focus", () => {
        if (error_password) {
            error_password.classList.add("none");
        }
    });
    password.addEventListener("blur", () => {
        checkValidity(password, error_password, { min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру" });
    });
}
function addPattern() {
    if (login) {
        login.setAttribute("pattern", regular_login);
    }
    if (password) {
        password.setAttribute("pattern", regular_password);
    }
}
//# sourceMappingURL=login.js.map