import { render } from "../utils/renderDom";
import Input from "../shared/components/input/input";


const input_email = new Input({
    text: "Почта",
    for_label: "email",
    input_type: "email",
    input_name:"email",
    input_id: "email",
    input_placeholder: "Почта",
    class_error: "error-email",
    settings: {withInternalID: true},
    class_wrap: "text-field-edit-info",
    class_label: "text-field-edit-info__label",
    class_input: "text-field-edit-info__input",
    value: "ya@yandex.ru",
    readonly: true
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
    class_wrap: "text-field-edit-info",
    class_label: "text-field-edit-info__label",
    class_input: "text-field-edit-info__input",
    value: "Login",
    readonly: true
});

const input_first_name = new Input({
    text: "Имя",
    for_label: "first_name",
    input_type: "text",
    input_name:"first_name",
    input_id: "first_name",
    input_placeholder: "Имя",
    class_error: "error-first-name",
    settings: {withInternalID: true},
    class_wrap: "text-field-edit-info",
    class_label: "text-field-edit-info__label",
    class_input: "text-field-edit-info__input",
    value: "Ivan",
    readonly: true
});

const input_second_name = new Input({
    text: "Фамилия",
    for_label: "second_name",
    input_type: "text",
    input_name:"second_name",
    input_id: "second_name",
    input_placeholder: "Фамилия",
    class_error: "error-second-name",
    settings: {withInternalID: true},
    class_wrap: "text-field-edit-info",
    class_label: "text-field-edit-info__label",
    class_input: "text-field-edit-info__input",
    value: "Ivanov",
    readonly: true
});

const input_display_name = new Input({
    text: "Имя в чате",
    for_label: "display_name",
    input_type: "text",
    input_name:"display_name",
    input_id: "display_name",
    input_placeholder: "Имя в чате",
    class_error: "error-display_name",
    settings: {withInternalID: true},
    class_wrap: "text-field-edit-info",
    class_label: "text-field-edit-info__label",
    class_input: "text-field-edit-info__input",
    value: "flash",
    readonly: true
});

const input_phone = new Input({
    text: "Телефон",
    for_label: "phone",
    input_type: "phone",
    input_name:"phone",
    input_id: "phone",
    input_placeholder: "Телефон",
    class_error: "error-phone",
    settings: {withInternalID: true},
    min: "10",
    max: "15",
    class_wrap: "text-field-edit-info",
    class_label: "text-field-edit-info__label",
    class_input: "text-field-edit-info__input",
    value: "+79991457721",
    readonly: true
});


render(".info", input_email);
render(".info", input_login);
render(".info", input_first_name);
render(".info", input_second_name);
render(".info", input_display_name);
render(".info", input_phone);
