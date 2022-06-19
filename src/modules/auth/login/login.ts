
// import { checkValidity } from "../../shared/validation-functions";
// import { regular_login, regular_password } from "../../shared/regular_expressions";
// import Input from "../../shared/components/input/input";

import { Tprops } from "@types";
import Component from "../../shared/services/component";
import template from "./login.tmp";

export default class LoginPage extends Component {
    constructor(props: Tprops) {
        super(props);
    }

    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }

}


// const input_password = new Input({
//     text: "Пароль",
//     for_label: "password",
//     input_type: "password",
//     input_name:"password",
//     input_id: "password",
//     input_placeholder: "Пароль",
//     class_error: "error-password",
//     settings: {withInternalID: true},
//     min: "8",
//     max: "40",
//     class_wrap: "text-field",
//     class_label: "text-field__label",
//     class_input: "text-field__input"
// });

// const input_login = new Input({
//     text: "Логин",
//     for_label: "login",
//     input_type: "text",
//     input_name:"login",
//     input_id: "login",
//     input_placeholder: "Логин",
//     class_error: "error-login",
//     settings: {withInternalID: true},
//     min: "3",
//     max: "20",
//     class_wrap: "text-field",
//     class_label: "text-field__label",
//     class_input: "text-field__input"
// });



// render(".auth-form__field", input_login);
// render(".auth-form__field", input_password);

// const form = document.querySelector('.auth-form') as HTMLFormElement;
// const login = form.elements.namedItem("login") as HTMLInputElement;
// const password = form.elements.namedItem("password") as HTMLInputElement;
// const error_login = form.querySelector('.error-login');
// const error_password = form.querySelector('.error-password');
// addPattern();
// addEvent();

// function getDataForm() {
//     const data = {
//         login: login.value,
//         password: password.value
//     };
//     checkValidity(login, error_login, {min: 3, max: 20, patternMismatch: "Некорректный логин, пример, login2022-5_5"});
//     checkValidity(password, error_password, {min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру"});
//     console.log(data);
// }

// function addEvent(): void {
//     login.addEventListener("focus", () => {
//         if (error_login) {
//             error_login.classList.add("none");
//         }
//     });
    
//     login.addEventListener("blur", () => {
//         checkValidity(login, error_login, {min: 3, max: 20, patternMismatch: "Некорректный логин, пример, login2022-5_5"});
//     });

//     password.addEventListener("focus", () => {
//         if (error_password) {
//             error_password.classList.add("none");
//         }
//     });
    
//     password.addEventListener("blur", () => {
//         checkValidity(password, error_password, {min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру"});
//     });
// }

// function addPattern(): void {
//     if (login) {
//         login.setAttribute("pattern", regular_login);
//     }

//     if (password) {
//         password.setAttribute("pattern", regular_password);
//     }
// }






