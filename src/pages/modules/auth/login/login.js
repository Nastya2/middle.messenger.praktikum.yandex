import Button from "../../shared/components/button/button";
import { render } from "./../../utils/renderDom";

const button = new Button({
    text: 'Вход',
    clases: 'btn btn_sigin-top-bottom',
    event: {
        click: function() {
            getDataForm();
        }
    }
});

render(".btn-action", button);

function getDataForm() {
    const form = document.querySelector('.auth-form');
    const login = form.querySelector('[name="login"]');
    const password = form.querySelector('[name="password"]');
    const data = {
        login: login.value,
        password: password.value
    };
    console.log(data);
}

getDataForm();



