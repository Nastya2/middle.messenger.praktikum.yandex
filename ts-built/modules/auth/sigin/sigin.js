import Button from "../../shared/components/button/button";
import { checkValidity } from "../../shared/validation-functions";
import { render } from "../../utils/renderDom";
import { regular_name, regular_login, regular_password, regular_email, regular_phone } from "../../shared/regular_expressions";
import Input from "../../shared/components/input/input";
const button = new Button({
    text: 'Зарегистрироваться',
    classes: 'btn btn_sigin-top-bottom',
    event: {
        click: function () {
            getDataForm();
        }
    }
});
const input_email = new Input({
    text: "Почта",
    for_label: "email",
    input_type: "email",
    input_name: "email",
    input_id: "email",
    input_placeholder: "Почта",
    class_error: "error-email",
    settings: { withInternalID: true },
    class_wrap: "text-field",
    class_label: "text-field__label",
    class_input: "text-field__input"
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
    max: "40",
    class_wrap: "text-field",
    class_label: "text-field__label",
    class_input: "text-field__input"
});
const input_password_repeat = new Input({
    text: "Пароль (еще раз)",
    for_label: "password_repeat",
    input_type: "password",
    input_name: "password_repeat",
    input_id: "password_repeat",
    input_placeholder: "Пароль (еще раз)",
    class_error: "error-password-repeat",
    settings: { withInternalID: true },
    min: "8",
    max: "40",
    class_wrap: "text-field",
    class_label: "text-field__label",
    class_input: "text-field__input"
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
    max: "20",
    class_wrap: "text-field",
    class_label: "text-field__label",
    class_input: "text-field__input"
});
const input_first_name = new Input({
    text: "Имя",
    for_label: "first_name",
    input_type: "text",
    input_name: "first_name",
    input_id: "first_name",
    input_placeholder: "Имя",
    class_error: "error-first-name",
    settings: { withInternalID: true },
    class_wrap: "text-field",
    class_label: "text-field__label",
    class_input: "text-field__input"
});
const input_second_name = new Input({
    text: "Фамилия",
    for_label: "second_name",
    input_type: "text",
    input_name: "second_name",
    input_id: "second_name",
    input_placeholder: "Фамилия",
    class_error: "error-second-name",
    settings: { withInternalID: true },
    class_wrap: "text-field",
    class_label: "text-field__label",
    class_input: "text-field__input"
});
const input_phone = new Input({
    text: "Телефон",
    for_label: "phone",
    input_type: "phone",
    input_name: "phone",
    input_id: "phone",
    input_placeholder: "Телефон",
    class_error: "error-phone",
    settings: { withInternalID: true },
    min: "10",
    max: "15",
    class_wrap: "text-field",
    class_label: "text-field__label",
    class_input: "text-field__input"
});
render(".btn-action", button);
render(".auth-form__field", input_email);
render(".auth-form__field", input_login);
render(".auth-form__field", input_first_name);
render(".auth-form__field", input_second_name);
render(".auth-form__field", input_phone);
render(".auth-form__field", input_password);
render(".auth-form__field", input_password_repeat);
const form = document.querySelector('.auth-form');
const error_first_name = form.querySelector('.error-first-name');
const error_second_name = form.querySelector('.error-second-name');
const error_login = form.querySelector('.error-login');
const error_password = form.querySelector('.error-password');
const error_password_repeat = form.querySelector('.error-password-repeat');
const error_email = form.querySelector('.error-email');
const error_phone = form.querySelector('.error-phone');
const first_name = form.elements.namedItem("first_name");
const second_name = form.elements.namedItem("second_name");
const login = form.elements.namedItem("login");
const password = form.elements.namedItem("password");
const password_repeat = form.elements.namedItem("password_repeat");
const email = form.elements.namedItem("email");
const phone = form.elements.namedItem("phone");
addPattern();
addEvent();
function addEvent() {
    first_name.addEventListener("focus", () => {
        if (error_first_name) {
            error_first_name.classList.add("none");
        }
    });
    first_name.addEventListener("blur", () => {
        checkValidity(first_name, error_first_name, { patternMismatch: "Некорректное имя, пример, Иван или Ivan." });
    });
    second_name.addEventListener("focus", () => {
        if (error_second_name) {
            error_second_name.classList.add("none");
        }
    });
    second_name.addEventListener("blur", () => {
        checkValidity(second_name, error_second_name, { patternMismatch: "Некорректная фамилия, пример, Иванов или Ivanov." });
    });
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
    password_repeat.addEventListener("focus", () => {
        if (error_password_repeat) {
            error_password_repeat.classList.add("none");
        }
    });
    password_repeat.addEventListener("blur", () => {
        checkValidity(password_repeat, error_password_repeat, { min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру" });
    });
    email.addEventListener("focus", () => {
        if (error_email) {
            error_email.classList.add("none");
        }
    });
    email.addEventListener("blur", () => {
        checkValidity(email, error_email, { patternMismatch: "Некорректный адресс, пример, address@yandex.ru" });
    });
    phone.addEventListener("focus", () => {
        if (error_phone) {
            error_phone.classList.add("none");
        }
    });
    phone.addEventListener("blur", () => {
        checkValidity(phone, error_phone, { patternMismatch: "Некорректный телефон" });
    });
}
function addPattern() {
    if (first_name) {
        first_name.setAttribute("pattern", regular_name);
    }
    if (second_name) {
        second_name.setAttribute("pattern", regular_name);
    }
    if (login) {
        login.setAttribute("pattern", regular_login);
    }
    if (password) {
        password.setAttribute("pattern", regular_password);
    }
    if (password_repeat) {
        password_repeat.setAttribute("pattern", regular_password);
    }
    if (phone) {
        phone.setAttribute("pattern", regular_phone);
    }
    if (email) {
        email.setAttribute("pattern", regular_email);
    }
}
function getDataForm() {
    const data = {
        login: login.value,
        password: password.value,
        email: email.value,
        first_name: first_name.value,
        second_name: second_name.value,
        phone: phone.value,
        password_repeat: password_repeat.value,
    };
    console.log(data);
    checkValidity(first_name, error_first_name, { patternMismatch: "Некорректное имя, пример, Иван или Ivan." });
    checkValidity(second_name, error_second_name, { patternMismatch: "Некорректная фамилия, пример, Иванов или Ivanov." });
    checkValidity(login, error_login, { min: 3, max: 20, patternMismatch: "Некорректный логин, пример, login2022-5_5" });
    checkValidity(password, error_password, { min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру" });
    checkValidity(password_repeat, error_password_repeat, { min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру" });
    checkValidity(email, error_email, { patternMismatch: "Некорректный адресс, пример, address@yandex.ru" });
    checkValidity(phone, error_phone, { patternMismatch: "Некорректный телефон" });
}
//# sourceMappingURL=sigin.js.map