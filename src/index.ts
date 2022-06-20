
import { LoginPage, button, input_login, input_password, error_login, error_password } from "./modules/auth/login/login";

import { renderDOM } from "./modules/utils/renderDom";

document.addEventListener("DOMContentLoaded", () => {
    const loginPage = new LoginPage({button: button, input_password: input_password,
                                    input_login: input_login, error_login: error_login, error_password: error_password});
    renderDOM(".app", loginPage);
});