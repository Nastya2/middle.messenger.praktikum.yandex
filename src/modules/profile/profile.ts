
import { Input } from "../shared/components/input/input";
import { Label } from "../shared/components/label/label";
import { Tprops } from "@types";
import Component from "../shared/services/component";
import tmp from "./profile.tmp";

export class ProfilePage extends Component {
    constructor(props: Tprops) {
        super(props);
    }

    public render(): DocumentFragment {
        return this.compile(tmp, this.props);
    }
}

const label_email = new Label({
    class_label: "text-field-edit-info__label",
    for_label: "email",
    text: "Email"
});


const input_email = new Input({
    text: "Почта",
    input_type: "email",
    input_name:"email",
    class_input: "text-field-edit-info__input",
    readonly: true,
    value: "ya.yandex.ru"
});


const label_login = new Label({
    class_label: "text-field-edit-info__label",
    for_label: "login",
    text: "Логин"
});

const input_login = new Input({
    text: "Логин",
    input_type: "text",
    input_name:"login",
    class_input: "text-field-edit-info__input",
    readonly: true,
    value: "Ivan007"
});

export const label_first_name = new Label({
    class_label: "text-field-edit-info__label",
    for_label: "first_name",
    text: "Имя"
});


const input_first_name = new Input({
    text: "Имя",
    input_type: "text",
    input_name:"first_name",
    class_input: "text-field-edit-info__input",
    readonly: true,
    value: "Ivan"
});

const label_second_name = new Label({
    class_label: "text-field-edit-info__label",
    for_label: "second_name",
    text: "Фамилия"
});

const input_second_name = new Input({
    text: "Фамилия",
    input_type: "text",
    input_name:"second_name",
    class_input: "text-field-edit-info__input",
    readonly: true,
    value: "Ivanov"
});

const label_phone = new Label({
    class_label: "text-field-edit-info__label",
    for_label: "phone",
    text: "Телефон"
});


const input_phone = new Input({
    text: "Телефон",
    input_type: "phone",
    input_name:"phone",
    class_input: "text-field-edit-info__input",
    readonly: true,
    value: "+79991239839"
});

const label_display_name = new Label({
    class_label: "text-field-edit-info__label",
    for_label: "display_name",
    text: "Никнейм"
});

const input_display_name = new Input({
    text: "Никнейм",
    input_type: "text",
    input_name: "display_name",
    class_input: "text-field-edit-info__input",
    readonly: true,
    value: "Ivan007"
});

export const Components = {
    input_display_name,
    input_email,
    input_first_name,
    input_second_name,
    input_login,
    input_phone,
    label_display_name,
    label_email,
    label_first_name,
    label_login,
    label_phone,
    label_second_name
}


