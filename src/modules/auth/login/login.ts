import { regular_login, regular_password } from "../../shared/regular_expressions";
import { Tprops } from "@types";
import { checkValidityElement, checkValidityForm } from "../../shared/validation-functions";
import { Button } from "../../shared/components/button/button";
import { Input } from "../../shared/components/input/input";
import Component from "../../shared/services/component";
import template from "./login.tmp";
import { Error } from "../../shared/components/error/error";
import { Label } from "../../shared/components/label/label";
import  Router  from "../../routing/router";
import { Link } from "../../shared/components/link/link";
import authService from "../auth.service";


export class LoginPage extends Component {
    constructor(props: Tprops) {
        super(props);
    }

    public render(): DocumentFragment {
        hint_auth.hide();
        return this.compile(template, this.props);
    }
}

const error_form = {
    login: true,
    password: true,
}

export const hint_auth = new Error({
    error: "Введите корректные данные!"
});

export const button = new Button({
    text: 'Вход',
    classes: 'btn btn_sigin-top-bottom',
    event: {
        click: function() {
            const data = {
                login: (input_login.getContent().lastChild as HTMLInputElement).value,
                password: (input_password.getContent().lastChild as HTMLInputElement).value,
            }
            if (checkValidityForm(error_form)) {
                authService.login(data);
            } else {
                hint_auth.show();
                setTimeout(() => hint_auth.hide(), 3000);
            }

        }
    },

});

export const error_password = new Error({
    error: ""
});

export const error_login = new Error({
    error: ""
});

export const label_login = new Label({
    class_label: "text-field__label",
    for_label: "login",
    text: "Логин"
});

export const label_password = new Label({
    class_label: "text-field__label",
    for_label: "password",
    text: "Пароль"
});

export const input_login = new Input({
    text: "Логин",
    input_type: "text",
    input_name:"login",
    min: "3",
    max: "20",
    class_input: "text-field__input",
    pattern: regular_login,
    event: {
        blur: function(event: Event) {
            let err = "";
            err = checkValidityElement(event.target as HTMLInputElement, {min: 3, max: 20, patternMismatch: "Некорректный логин, пример, login2022-5_5"});
            error_login.setProps({
                error: err
            });
            error_form.login = !!err;
            error_login.show();
            
        },
        focus: function() {
            error_login.hide();
        }
    }
});


export const input_password = new Input({
    text: "Пароль",
    input_type: "password",
    input_name:"password",
    min: "8",
    max: "40",
    class_input: "text-field__input",
    pattern: regular_password,
    event: {
        blur: function(event: Event) {
            let err = "";
            err = checkValidityElement(event.target as HTMLInputElement, {min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру"});
            error_password.setProps({
                error: err
            });
            error_form.password = !!err;
            error_password.show();
            
        },
        focus: function() {
            error_password.hide();
        }
    }
});

const link_sing_up = new Link({
    text: "Нет аккаунта?",
    event: {
        click: function() {
            Router.go("/sign-up");
        }
    },
    classes: "auth-form__href"
}); 

export const Components = {
    button,
    input_login,
    input_password,
    error_login,
    error_password,
    label_login,
    label_password,
    link_sing_up,
    hint_auth
};