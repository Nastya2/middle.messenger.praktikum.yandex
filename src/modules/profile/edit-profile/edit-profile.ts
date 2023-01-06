import { Button } from "../../shared/components/button/button";
import { checkValidityElement } from "../../shared/validation-functions";
import { Input } from "../../shared/components/input/input";
import { Label } from "../../shared/components/label/label";
import { Error } from "../../shared/components/error/error";
import { regular_name, regular_login, regular_email, regular_phone } from "../../shared/regular_expressions";
import { Tprops } from "@types";
import Component from "../../shared/services/component";
import tmp from "./edit-profile.tmp";
import { TUser, TUserAvatar } from "../profile.service";
import Icon from "../../shared/components/icon/icon";
import  Router from "../../routing/router";
import profileService from "../profile.service";
import store, { StoreEvent } from "../../shared/store";
import { AvatarUpload } from "../../shared/components/avatar-upload/avatar-upload";
import { Avatar } from "../../shared/components/avatar/avatar";
import { url } from "../../shared/consts";
import { RouterEvent } from "../../routing/route";

export class EditProfilePage extends Component {
    constructor(props: Tprops) {
        super(props);
    }

    public render(): DocumentFragment {
        updateInfo();
        subStore();
        return this.compile(tmp, this.props);
    }
}

export const avatar_upload = new AvatarUpload({});
export const avatar = new Avatar({src_img:"", alt_img: "Аватар"});

export const button_change_file = new Button({
    text: "Поменять",
    classes: "btn btn_width280",
    event: {
        click: function() {
            const avatar = document.getElementById('form-avatar') as HTMLFormElement;
            if (avatar) {
                const form = new FormData(avatar);
                profileService.changeAvatar(form);
            } 
        }
    }
});

export const button = new Button({
    text: "Сохранить",
    classes: "btn btn_width280",
    event: {
        click: function() {
            const data = {
                login: (input_login.getContent().lastChild as HTMLInputElement).value,
                email: (input_email.getContent().lastChild as HTMLInputElement).value,
                first_name: (input_first_name.getContent().lastChild as HTMLInputElement).value,
                second_name: (input_second_name.getContent().lastChild as HTMLInputElement).value,
                phone: (input_phone.getContent().lastChild as HTMLInputElement).value,
                display_name: (input_display_name.getContent().lastChild as HTMLInputElement).value,
                id: userInfo?.id || 0
            }
            profileService.changeUserInfo(data);
        }
    }
});

export const label_email = new Label({
    class_label: "text-field-edit-info__label",
    for_label: "email",
    text: "Email"
});

export const error_email = new Error({
    error: ""
});

export const input_email = new Input({
    value: "***",
    input_type: "email",
    input_name:"email",
    class_input: "text-field-edit-info__input",
    pattern: regular_email,
    event: {
        blur: function(event: Event) {
            let err = "";
            err = checkValidityElement(event.target as HTMLInputElement, {patternMismatch: "Некорректный адресс, пример, address@yandex.ru"});
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

function setEmail() {
    input_email.setProps({
        value: userInfo?.email || "***",
        input_type: "email",
        input_name:"email",
        class_input: "text-field-edit-info__input",
        pattern: regular_email,
        event: {
            blur: function(event: Event) {
                let err = "";
                err = checkValidityElement(event.target as HTMLInputElement, {patternMismatch: "Некорректный адресс, пример, address@yandex.ru"});
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
}


export const label_login = new Label({
    class_label: "text-field-edit-info__label",
    for_label: "login",
    text: "Логин"
});

export const error_login = new Error({
    error: ""
});

export const input_login = new Input({
    value: "***",
    input_type: "text",
    input_name:"login",
    min: "3",
    max: "20",
    class_input: "text-field-edit-info__input",
    pattern: regular_login,
    event: {
        blur: function(event: Event) {
            let err = "";
            err = checkValidityElement(event.target as HTMLInputElement, {min: 3, max: 20, patternMismatch: "Некорректный логин, пример, login2022-5_5"});
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

function setLogin() {
    input_login.setProps({
        value: userInfo?.login,
        input_type: "text",
        input_name:"login",
        min: "3",
        max: "20",
        class_input: "text-field-edit-info__input",
        pattern: regular_login,
        event: {
            blur: function(event: Event) {
                let err = "";
                err = checkValidityElement(event.target as HTMLInputElement, {min: 3, max: 20, patternMismatch: "Некорректный логин, пример, login2022-5_5"});
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
}

export const label_first_name = new Label({
    class_label: "text-field-edit-info__label",
    for_label: "first_name",
    text: "Имя"
});

export const error_first_name = new Error({
    error: ""
});

export const input_first_name = new Input({
    value: "***",
    input_type: "text",
    input_name:"first_name",
    class_input: "text-field-edit-info__input",
    pattern: regular_name,
    event: {
        blur: function(event: Event) {
            let err = "";
            err = checkValidityElement(event.target as HTMLInputElement, {patternMismatch: "Некорректное имя, пример, Иван или Ivan."});
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

function setName() {
    input_first_name.setProps({
        value: userInfo?.first_name,
        input_type: "text",
        input_name:"first_name",
        class_input: "text-field-edit-info__input",
        pattern: regular_name,
        event: {
            blur: function(event: Event) {
                let err = "";
                err = checkValidityElement(event.target as HTMLInputElement, {patternMismatch: "Некорректное имя, пример, Иван или Ivan."});
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
}

export const label_second_name = new Label({
    class_label: "text-field-edit-info__label",
    for_label: "second_name",
    text: "Фамилия"
});

export const error_second_name = new Error({
    error: ""
});

export const input_second_name = new Input({
    value: "***",
    input_type: "text",
    input_name:"second_name",
    class_input: "text-field-edit-info__input",
    pattern: regular_name,
    event: {
        blur: function(event: Event) {
            let err = "";
            err = checkValidityElement(event.target as HTMLInputElement, {patternMismatch: "Некорректная фамилия, пример, Иванов или Ivanov."});
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

function setSecondName() {
    input_second_name.setProps({
        value: userInfo?.second_name,
        input_type: "text",
        input_name:"second_name",
        class_input: "text-field-edit-info__input",
        pattern: regular_name,
        event: {
            blur: function(event: Event) {
                let err = "";
                err = checkValidityElement(event.target as HTMLInputElement, {patternMismatch: "Некорректная фамилия, пример, Иванов или Ivanov."});
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
}

export const label_phone = new Label({
    class_label: "text-field-edit-info__label",
    for_label: "phone",
    text: "Телефон"
});

export const error_phone = new Error({
    error: ""
});

export const input_phone = new Input({
    value: "***",
    input_type: "phone",
    input_name:"phone",
    min: "10",
    max: "15",
    class_input: "text-field-edit-info__input",
    pattern: regular_phone,
    event: {
        blur: function(event: Event) {
            let err = "";
            err = checkValidityElement(event.target as HTMLInputElement, {patternMismatch: "Некорректный телефон"});
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

function setPhone() {
    input_phone.setProps({
        value: userInfo?.phone,
        input_type: "phone",
        input_name:"phone",
        min: "10",
        max: "15",
        class_input: "text-field-edit-info__input",
        pattern: regular_phone,
        event: {
            blur: function(event: Event) {
                let err = "";
                err = checkValidityElement(event.target as HTMLInputElement, {patternMismatch: "Некорректный телефон"});
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
}

export const label_display_name = new Label({
    class_label: "text-field-edit-info__label",
    for_label: "display_name",
    text: "Никнейм"
});

export const error_display_name = new Error({
    error: ""
});

export const input_display_name = new Input({
    value: "***",
    input_type: "text",
    input_name: "display_name",
    class_input: "text-field-edit-info__input",
    event: {
        blur: function(event: Event) {
            let err = "";
            err = checkValidityElement(event.target as HTMLInputElement, {});
            error_display_name.setProps({
                error: err
            });
            error_display_name.show();
            
        },
        focus: function() {
            error_display_name.hide();
        }
    }

});

function setDisplayName() {
    input_display_name.setProps({
        value: userInfo?.display_name,
        input_type: "text",
        input_name: "display_name",
        class_input: "text-field-edit-info__input",
        event: {
            blur: function(event: Event) {
                let err = "";
                err = checkValidityElement(event.target as HTMLInputElement, {});
                error_display_name.setProps({
                    error: err
                });
                error_display_name.show();
                
            },
            focus: function() {
                error_display_name.hide();
            }
        }
    
    });
}

const arrowIcon = new Icon({
    event: {
        click: function() {
            Router.go("/settings");
        }
    },
    classes: "back"
});

let userInfo: TUser & TUserAvatar;
function updateInfo() {  
    userInfo = store.getState().user || {};
        avatar.setProps({src_img: `${url}/resources/${userInfo.avatar}`, name: userInfo.first_name});
        setName();
        setDisplayName();
        setEmail();
        setLogin();
        setPhone();
        setSecondName();
}

function subStore() {
    const cb = store.on(StoreEvent.Updated, () => {
        updateInfo();
    });

    Router.getRoute("/edit-profile")?.on(RouterEvent.Leave,()  => {
        store.off(StoreEvent.Updated, cb);
    });
}

export const Components = {
    button,
    input_display_name,
    input_email,
    input_first_name,
    input_login,
    arrowIcon,
    input_phone,
    input_second_name,
    error_display_name,
    error_email,
    error_first_name,
    error_login,
    error_phone,
    error_second_name,
    label_display_name,
    label_email,
    label_first_name,
    label_login,
    label_phone,
    label_second_name,
    avatar,
    avatar_upload,
    button_change_file
};