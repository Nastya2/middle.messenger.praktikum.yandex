
import { EditProfilePage,button, input_email, input_first_name, input_login, input_new_password, input_old_password, input_display_name, input_new_password_repeat, input_phone,input_second_name,label_email,label_first_name,label_login,label_old_password,label_new_password, label_display_name, label_new_password_repeat,label_phone,label_second_name,error_email,error_first_name,error_login, error_display_name, error_new_password,error_new_password_repeat,error_old_password,error_phone,error_second_name } from "./modules/profile/edit/edit-profile";
// import { SigInPage, button, input_email, input_first_name, input_login, input_password, input_password_repeat, input_phone,input_second_name,label_email,label_first_name,label_login,label_password,label_password_repeat,label_phone,label_second_name,error_email,error_first_name,error_login,error_password,error_password_repeat,error_phone,error_second_name } from "./modules/auth/sigin/sigin";
// import { LoginPage, button, input_login, input_password, error_login, error_password, label_login, label_password } from "./modules/auth/login/login";

import { renderDOM } from "./modules/utils/renderDom";

document.addEventListener("DOMContentLoaded", () => {
    // const page = new LoginPage({button: button,
    //                                 input_password: input_password, input_login: input_login, 
    //                                 error_login: error_login, error_password: error_password,
    //                                 label_login: label_login, label_password: label_password
    //                             });
    // const page = new SigInPage({button: button,
    //     input_password: input_password, input_password_repeat: input_password_repeat, input_login: input_login, input_email: input_email, input_first_name: input_first_name, input_second_name: input_second_name, input_phone: input_phone,
    //     error_login: error_login, error_password: error_password, error_email:error_email, error_first_name:error_first_name, error_second_name:error_second_name, error_phone:error_phone, error_password_repeat: error_password_repeat,
    //     label_login: label_login, label_password: label_password, label_email:label_email, label_first_name:label_first_name, label_second_name: label_second_name, label_phone:label_phone,label_password_repeat:label_password_repeat
    // });

    const page = new EditProfilePage({button: button,
        input_old_password, input_new_password, input_new_password_repeat,input_login, input_email, input_first_name, input_second_name, input_phone,
        error_login, error_old_password, error_new_password,error_new_password_repeat, error_email, error_first_name, error_second_name, error_phone,
        label_login, label_new_password, label_email, label_first_name, label_second_name, label_phone, label_display_name, label_new_password_repeat, label_old_password
    });
    renderDOM(".app", page);
});