
import LoginPage from "./modules/auth/login/login";
import { Button } from "./modules/shared/components/button/button";
import { Input } from "./modules/shared/components/input/input";

import { renderDOM } from "./modules/utils/renderDom";

document.addEventListener("DOMContentLoaded", () => {
    const button = new Button({
        text: 'Вход',
        classes: 'btn btn_sigin-top-bottom',
        event: {
            click: function() {
                //getDataForm();
                console.log("la");
            }
        },

    });

    const input_login = new Input({
        text: "Логин",
        for_label: "login",
        input_type: "text",
        input_name:"login",
        input_id: "login",
        input_placeholder: "Логин",
        class_error: "error-login",
        settings: {withInternalID: true},
        min: "3",
        max: "20",
        class_wrap: "text-field",
        class_label: "text-field__label",
        class_input: "text-field__input"
    });
    
    const input_password = new Input({
        text: "Пароль",
        for_label: "password",
        input_type: "password",
        input_name:"password",
        input_id: "password",
        input_placeholder: "Пароль",
        class_error: "error-password",
        min: "8",
        max: "40",
        class_wrap: "text-field",
        class_label: "text-field__label",
        class_input: "text-field__input"
    });

    const loginPage = new LoginPage({button: button, input_password: input_password, input_login: input_login});
    renderDOM(".app", loginPage);
});