import Button from "../../shared/components/button/button";
import { checkValidity } from "../../shared/validation-functions";
import { render } from "../../utils/renderDom";
import { regular_login, regular_password } from "../../shared/regular_expressions";
import Input from "../../shared/components/input/input";
const button = new Button({
    text: 'Вход',
    classes: 'btn btn_sigin-top-bottom',
    event: {
        click: function () {
            getDataForm();
        }
    },
    settings: { withInternalID: true },
});
const input_password = new Input({
    text: "Пароль",
    for_label: "password",
    input_type: "password",
    input_name: "password",
    input_id: "password",
    input_placeholder: "Пароль",
    class_error: "error-password",
    settings: { withInternalID: true },
    min: "8",
    max: "40"
});
const input_login = new Input({
    text: "Логин",
    for_label: "login",
    input_type: "text",
    input_name: "login",
    input_id: "login",
    input_placeholder: "Логин",
    class_error: "error-login",
    settings: { withInternalID: true },
    min: "3",
    max: "20"
});
render(".btn-action", button);
render(".auth-form__field", input_login);
render(".auth-form__field", input_password);
const form = document.querySelector('.auth-form');
const login = form.elements.namedItem("login");
const password = form.elements.namedItem("password");
const error_login = form.querySelector('.error-login');
const error_password = form.querySelector('.error-password');
addPattern();
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