import { Button } from "../../shared/components/button/button";
import { checkValidityElement, checkValidityForm } from "../../shared/validation-functions";
import { Input } from "../../shared/components/input/input";
import { Label } from "../../shared/components/label/label";
import { Error } from "../../shared/components/error/error";
import { regular_password } from "../../shared/regular_expressions";
import { Tprops } from "@types";
import Component from "../../shared/services/component";
import tmp from "./edit-password.tmp";
import Icon from "../../shared/components/icon/icon";
import { router } from "../../../index";
import profileService from "../profile.service";
import { Avatar } from "../../shared/components/avatar/avatar";

export class EditPasswordPage extends Component {
    constructor(props: Tprops) {
        super(props);
    }

    public render(): DocumentFragment {
        return this.compile(tmp, this.props);
    }
}


const error_form = {
    new_password: false,
    old_password: false,
    new_password_repeat: false
}


export const avatar = new Avatar({src_img:""});

export const button = new Button({
    text: "Сохранить",
    classes: "btn btn_width280",
    event: {
        click: function() {
            const data = {
                oldPassword: (input_old_password.getContent().lastChild as HTMLInputElement).value,
                newPassword: (input_new_password.getContent().lastChild as HTMLInputElement).value,

            }
            if (checkValidityForm(error_form)) {
                profileService.changeUserPassword(data).then(() => {
                    hint_password.setProps({error:  "Пароль успешно изменен!"});
                    hint_password.show();
                })
                .catch(() => {
                    hint_password.setProps({error:  "Не удалось изменить пароль!"});
                    hint_password.show();
                });
            } else {
                hint_password.setProps({error:  "Введите корректные данные!"});
                hint_password.show();
            }
        }
    }
});

export const hint_password = new Error({
    error: ""
});


export const label_old_password = new Label({
    class_label: "text-field-edit-info__label",
    for_label: "old_password",
    text: "Старый пароль"
});

export const error_old_password = new Error({
    error: ""
});

export const input_old_password = new Input({
    text: "Старый пароль",
    input_type: "password",
    input_name:"old_password",
    min: "8",
    max: "40",
    class_input: "text-field-edit-info__input",
    pattern: regular_password,
    event: {
        blur: function(event: Event) {
            let err = "";
            err = checkValidityElement(event.target as HTMLInputElement, {min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру"});
            error_old_password.setProps({
                error: err
            });
            error_form.old_password = !!err;
            error_old_password.show();
            
        },
        focus: function() {
            hint_password.hide();
            error_old_password.hide();
        }
    }
});

export const label_new_password = new Label({
    class_label: "text-field-edit-info__label",
    for_label: "new_password",
    text: "Новый пароль"
});

export const error_new_password = new Error({
    error: ""
});

export const input_new_password = new Input({
    text: "Новый пароль",
    input_type: "password",
    input_name:"new_password",
    min: "8",
    max: "40",
    class_input: "text-field-edit-info__input",
    pattern: regular_password,
    event: {
        blur: function(event: Event) {
            let err = "";
            err = checkValidityElement(event.target as HTMLInputElement, {min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру"});
            error_new_password.setProps({
                error: err
            });
            error_form.new_password = !!err;
            error_new_password.show();
            
        },
        focus: function() {
            error_new_password.hide();
        }
    }
});

export const label_new_password_repeat = new Label({
    class_label: "text-field-edit-info__label",
    for_label: "new_password_repeat",
    text: "Новый пароль"
});

export const error_new_password_repeat = new Error({
    error: ""
});

export const input_new_password_repeat = new Input({
    text: "Новый пароль (еще раз)",
    input_type: "password",
    input_name:"new_password_repeat",
    min: "8",
    max: "40",
    class_input: "text-field-edit-info__input",
    pattern: regular_password,
    event: {
        blur: function(event: Event) {
            let err = "";
            err = checkValidityElement(event.target as HTMLInputElement, {min: 8, max: 40, patternMismatch: "Пароль должен содержать хотя бы одну заглавную букву и цифру"});
            error_new_password_repeat.setProps({
                error: err
            });
            error_form.new_password_repeat = !!err;
            error_new_password_repeat.show();
            
        },
        focus: function() {
            error_new_password_repeat.hide();
        }
    }
});

const arrowIcon = new Icon({
    event: {
        click: function() {
            router.go("/settings");
        }
    },
    classes: "back"
});


export const Components = {
    button,
    arrowIcon,
    input_new_password,
    input_new_password_repeat,
    input_old_password,
    error_new_password,
    error_new_password_repeat,
    error_old_password,
    label_new_password,
    label_new_password_repeat,
    label_old_password,
    avatar,
    hint_password
};
