import Button from "../../shared/components/button/button";
import { render } from "../../utils/renderDom";
import { checkValidity } from "../../shared/validation-functions";
import Input from "../../shared/components/input/input";
import { regular_name, regular_login, regular_password, regular_email, regular_phone } from "../../shared/regular_expressions";
const button = new Button({
    text: 'Сохранить',
    classes: 'btn btn_width280',
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
    class_wrap: "text-field-edit-info",
    class_label: "text-field-edit-info__label",
    class_input: "text-field-edit-info__input"
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
    class_wrap: "text-field-edit-info",
    class_label: "text-field-edit-info__label",
    class_input: "text-field-edit-info__input"
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
    class_wrap: "text-field-edit-info",
    class_label: "text-field-edit-info__label",
    class_input: "text-field-edit-info__input"
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
    class_wrap: "text-field-edit-info",
    class_label: "text-field-edit-info__label",
    class_input: "text-field-edit-info__input"
});
const input_display_name = new Input({
    text: "Имя в чате",
    for_label: "display_name",
    input_type: "text",
    input_name: "display_name",
    input_id: "display_name",
    input_placeholder: "Имя в чате",
    class_error: "error-display_name",
    settings: { withInternalID: true },
    class_wrap: "text-field-edit-info",
    class_label: "text-field-edit-info__label",
    class_input: "text-field-edit-info__input"
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
    class_wrap: "text-field-edit-info",
    class_label: "text-field-edit-info__label",
    class_input: "text-field-edit-info__input"
});
const input_old_password = new Input({
    text: "Старый пароль",
    for_label: "old_password",
    input_type: "old_password",
    input_name: "old_password",
    input_id: "old_password",
    input_placeholder: "Старый пароль",
    class_error: "error-old-password",
    settings: { withInternalID: true },
    min: "8",
    max: "40",
    class_wrap: "text-field-edit-info",
    class_label: "text-field-edit-info__label",
    class_input: "text-field-edit-info__input"
});
const input_new_password = new Input({
    text: "Новый пароль",
    for_label: "new_password",
    input_type: "new_password",
    input_name: "new_password",
    input_id: "new_password",
    input_placeholder: "Новый пароль",
    class_error: "error-new-password",
    settings: { withInternalID: true },
    min: "8",
    max: "40",
    class_wrap: "text-field-edit-info",
    class_label: "text-field-edit-info__label",
    class_input: "text-field-edit-info__input"
});
const input_repeat_new_password = new Input({
    text: "Повторите новый пароль",
    for_label: "repeat_new_password",
    input_type: "repeat_new_password",
    input_name: "repeat_new_password",
    input_id: "repeat_new_password",
    input_placeholder: "Повторите новый пароль",
    class_error: "error-repeat-new-password",
    settings: { withInternalID: true },
    min: "8",
    max: "40",
    class_wrap: "text-field-edit-info",
    class_label: "text-field-edit-info__label",
    class_input: "text-field-edit-info__input"
});
render(".btn-action", button);
render(".info", input_email);
render(".info", input_login);
render(".info", input_first_name);
render(".info", input_second_name);
render(".info", input_display_name);
render(".info", input_phone);
render(".info", input_old_password);
render(".info", input_new_password);
render(".info", input_repeat_new_password);
const form = document.querySelector('.info');
const error_first_name = form.querySelector('.error-first-name');
const error_second_name = form.querySelector('.error-second-name');
const error_login = form.querySelector('.error-login');
const error_old_password = form.querySelector('.error-old-password');
const error_new_password = form.querySelector('.error-new-password');
const error_repeat_new_password = form.querySelector('.error-repeat-new-password');
const error_email = form.querySelector('.error-email');
const error_phone = form.querySelector('.error-phone');
const first_name = form.elements.namedItem("first_name");
const second_name = form.elements.namedItem("second_name");
const login = form.elements.namedItem("login");
const old_password = form.elements.namedItem("old_password");
const new_password = form.elements.namedItem("new_password");
const new_password_repeat = form.elements.namedItem("repeat_new_password");
const email = form.elements.namedItem("email");
const phone = form.elements.namedItem("phone");
const display_name = form.elements.namedItem("display_name");
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
    old_password.addEventListener("focus", () => {
        if (error_old_password) {
            error_old_password.classList.add("none");
        }
    });
    old_password.addEventListener("blur", () => {
        checkValidity(old_password, error_old_password, { min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру" });
    });
    new_password.addEventListener("focus", () => {
        if (error_new_password) {
            error_new_password.classList.add("none");
        }
    });
    new_password.addEventListener("blur", () => {
        checkValidity(new_password, error_new_password, { min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру" });
    });
    new_password_repeat.addEventListener("focus", () => {
        if (error_repeat_new_password) {
            error_repeat_new_password.classList.add("none");
        }
    });
    new_password_repeat.addEventListener("blur", () => {
        checkValidity(new_password_repeat, error_repeat_new_password, { min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру" });
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
    if (new_password_repeat) {
        new_password_repeat.setAttribute("pattern", regular_password);
    }
    if (old_password) {
        old_password.setAttribute("pattern", regular_password);
    }
    if (new_password) {
        new_password.setAttribute("pattern", regular_password);
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
        old_password: old_password.value,
        new_password: new_password.value,
        new_password_repeat: new_password_repeat.value,
        email: email.value,
        first_name: first_name.value,
        second_name: second_name.value,
        phone: phone.value,
        display_name: display_name.value
    };
    console.log(data);
    checkValidity(first_name, error_first_name, { patternMismatch: "Некорректное имя, пример, Иван или Ivan." });
    checkValidity(second_name, error_second_name, { patternMismatch: "Некорректная фамилия, пример, Иванов или Ivanov." });
    checkValidity(login, error_login, { min: 3, max: 20, patternMismatch: "Некорректный логин, пример, login2022-5_5" });
    checkValidity(old_password, error_old_password, { min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру" });
    checkValidity(new_password, error_new_password, { min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру" });
    checkValidity(new_password_repeat, error_repeat_new_password, { min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру" });
    checkValidity(email, error_email, { patternMismatch: "Некорректный адресс, пример, address@yandex.ru" });
    checkValidity(phone, error_phone, { patternMismatch: "Некорректный телефон" });
}
//# sourceMappingURL=edit-profile.js.map