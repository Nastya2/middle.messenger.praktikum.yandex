import { regular_login, regular_password, regular_email, regular_name, regular_phone } from "../../shared/regular_expressions";
import { Tprops } from "@types";
import { checkValidity } from "../../shared/validation-functions";
import { Button } from "../../shared/components/button/button";
import { Input } from "../../shared/components/input/input";
import Component from "../../shared/services/component";
import template from "./sigin.tmp";
import { Error } from "../../shared/components/error/error";
import { Label } from "../../shared/components/label/label";


export class SigInPage extends Component {
    constructor(props: Tprops) {
        super(props);
    }

    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export const button = new Button({
    text: "Зарегистрироваться",
    classes: "btn btn_sigin-top-bottom",
    event: {
        click: function() {
            let data = {
                login: (input_login.getContent().lastChild as HTMLInputElement).value,
                password: (input_password.getContent().lastChild as HTMLInputElement).value,
                password_repeat: (input_password_repeat.getContent().lastChild as HTMLInputElement).value,
                email: (input_email.getContent().lastChild as HTMLInputElement).value,
                first_name: (input_first_name.getContent().lastChild as HTMLInputElement).value,
                second_name: (input_second_name.getContent().lastChild as HTMLInputElement).value,
                phone: (input_phone.getContent().lastChild as HTMLInputElement).value,
            }
            console.log(data);
        }
    },
});

export const label_email = new Label({
    class_label: "text-field__label",
    for_label: "email",
    text: "Email"
});

export const error_email = new Error({
    error: ""
});

export const input_email = new Input({
    text: "Почта",
    input_type: "email",
    input_name:"email",
    class_input: "text-field__input",
    pattern: regular_email,
    event: {
        blur: function(event: Event) {
            let err = "";
            err = checkValidity(event.target as HTMLInputElement, {patternMismatch: "Некорректный адресс, пример, address@yandex.ru"});
            error_email.setProps({
                error: err
            });
            error_email.show();
            
        },
        focus: function() {
            error_email.hide();
        }
    }
});


export const label_login = new Label({
    class_label: "text-field__label",
    for_label: "login",
    text: "Логин"
});

export const error_login = new Error({
    error: ""
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
            err = checkValidity(event.target as HTMLInputElement, {min: 3, max: 20, patternMismatch: "Некорректный логин, пример, login2022-5_5"});
            error_login.setProps({
                error: err
            });
            error_login.show();
            
        },
        focus: function() {
            error_login.hide();
        }
    }
});

export const label_first_name = new Label({
    class_label: "text-field__label",
    for_label: "first_name",
    text: "Имя"
});

export const error_first_name = new Error({
    error: ""
});

export const input_first_name = new Input({
    text: "Имя",
    input_type: "text",
    input_name:"first_name",
    class_input: "text-field__input",
    pattern: regular_name,
    event: {
        blur: function(event: Event) {
            let err = "";
            err = checkValidity(event.target as HTMLInputElement, {patternMismatch: "Некорректное имя, пример, Иван или Ivan."});
            error_first_name.setProps({
                error: err
            });
            error_first_name.show();
            
        },
        focus: function() {
            error_first_name.hide();
        }
    }
});

export const label_second_name = new Label({
    class_label: "text-field__label",
    for_label: "second_name",
    text: "Фамилия"
});

export const error_second_name = new Error({
    error: ""
});

export const input_second_name = new Input({
    text: "Фамилия",
    input_type: "text",
    input_name:"second_name",
    class_input: "text-field__input",
    pattern: regular_name,
    event: {
        blur: function(event: Event) {
            let err = "";
            err = checkValidity(event.target as HTMLInputElement, {patternMismatch: "Некорректная фамилия, пример, Иванов или Ivanov."});
            error_second_name.setProps({
                error: err
            });
            error_second_name.show();
            
        },
        focus: function() {
            error_second_name.hide();
        }
    }
});

export const label_phone = new Label({
    class_label: "text-field__label",
    for_label: "phone",
    text: "Телефон"
});

export const error_phone = new Error({
    error: ""
});

export const input_phone = new Input({
    text: "Телефон",
    input_type: "phone",
    input_name:"phone",
    min: "10",
    max: "15",
    class_input: "text-field__input",
    pattern: regular_phone,
    event: {
        blur: function(event: Event) {
            let err = "";
            err = checkValidity(event.target as HTMLInputElement, {patternMismatch: "Некорректный телефон"});
            error_phone.setProps({
                error: err
            });
            error_phone.show(); 
        },
        focus: function() {
            error_phone.hide();
        }
    }
});

export const label_password = new Label({
    class_label: "text-field__label",
    for_label: "password",
    text: "Пароль"
});

export const error_password = new Error({
    error: ""
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
            err = checkValidity(event.target as HTMLInputElement, {min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру"});
            error_password.setProps({
                error: err
            });
            error_password.show();
            
        },
        focus: function() {
            error_password.hide();
        }
    }
});

export const label_password_repeat = new Label({
    class_label: "text-field__label",
    for_label: "password",
    text: "Пароль"
});

export const error_password_repeat = new Error({
    error: ""
});

export const input_password_repeat = new Input({
    text: "Пароль (еще раз)",
    input_type: "password",
    input_name:"password_repeat",
    min: "8",
    max: "40",
    class_input: "text-field__input",
    pattern: regular_password,
    event: {
        blur: function(event: Event) {
            let err = "";
            err = checkValidity(event.target as HTMLInputElement, {min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру"});
            error_password_repeat.setProps({
                error: err
            });
            error_password_repeat.show();
            
        },
        focus: function() {
            error_password_repeat.hide();
        }
    }
});

export const Components = {
    button,
    input_email,
    input_first_name,
    input_login,
    input_password,
    input_password_repeat,
    input_phone,
    input_second_name,
    label_email,
    label_first_name,
    label_login,
    label_password,
    label_password_repeat,
    label_phone,
    label_second_name,
    error_email,
    error_first_name,
    error_login,
    error_password,
    error_password_repeat,
    error_phone,
    error_second_name
};

