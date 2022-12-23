
import { Input } from "../shared/components/input/input";
import { Label } from "../shared/components/label/label";
import { Tprops } from "@types";
import Component from "../shared/services/component";
import tmp from "./profile.tmp";
import { Link } from "../shared/components/link/link";
import { authService, router } from "../../index";
import Icon from "../shared/components/icon/icon";
import { ProfileService, TUser, TUserAvatar } from "./profile.service";

const service = new ProfileService();

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
    value: ""
});

function setEmail() {
    input_email.setProps({
        text: "Почта",
        input_type: "email",
        input_name:"email",
        class_input: "text-field-edit-info__input",
        readonly: true,
        value: userInfo.email
    });
}


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
    value: ""
});

function setLogin() {
    input_login.setProps({
        text: "Логин",
        input_type: "text",
        input_name:"login",
        class_input: "text-field-edit-info__input",
        readonly: true,
        value: userInfo.login
    });
}

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
    value: ""
});

function setNameUser() {
    input_first_name.setProps({
        text: "Имя",
        input_type: "text",
        input_name:"first_name",
        class_input: "text-field-edit-info__input",
        readonly: true,
        value: userInfo.first_name
    });
}

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
    value: ""
});

function setSecondName() {
    input_second_name.setProps({
        text: "Фамилия",
        input_type: "text",
        input_name:"second_name",
        class_input: "text-field-edit-info__input",
        readonly: true,
        value: userInfo.second_name
    });
}

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

function setPhone() {
    input_phone.setProps({
        text: "Телефон",
        input_type: "phone",
        input_name:"phone",
        class_input: "text-field-edit-info__input",
        readonly: true,
        value: userInfo.phone
    });
}

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
    value: ""
});

function setDisplayName() {
    input_display_name.setProps({
        text: "Никнейм",
        input_type: "text",
        input_name: "display_name",
        class_input: "text-field-edit-info__input",
        readonly: true,
        value: userInfo.display_name
    });
}

const logout = new Link({
    text: "Выйти",
    classes: "logout",
    event: {
        click: function() {
            authService.logout().then(() => router.go("/login"));
            localStorage.clear();
        }
    }
});

const link_edit_profile = new Link({
    text: "Изменить данные",
    event: {
        click: function() {
            router.go("/edit-profile");
        }
    },
    classes: "info-block__name"
});

const arrowIcon = new Icon({
    event: {
        click: function() {
            router.go("/messenger");
        }
    },
    classes: "back"
});

let userInfo: TUser & TUserAvatar;
function getUserInfo() {
    service.getUserInfo().then((info) => {
        userInfo = info;
        localStorage.setItem("userInfo", JSON.stringify(info));
        setNameUser();
        setDisplayName();
        setEmail();
        setLogin();
        setPhone();
        setSecondName();
    });
}

if(window.location.pathname === "/settings") {
    getUserInfo(); 
}


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
    label_second_name,
    logout,
    link_edit_profile,
    arrowIcon
}


