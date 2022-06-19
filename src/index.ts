import LoginPage from "./modules/auth/login/login";
import Button from "./modules/shared/components/button/button";
import { render } from "./modules/utils/renderDom";

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
        settings: {withInternalID: true},
    });
    const loginPage = new LoginPage({button: button, settings: {withInternalID: false}});
    render(".app", loginPage);
});