import Button from "../../shared/components/button/button";
import { render } from "./../../utils/renderDom";

const button = new Button({
    text: 'Зарегистрироваться',
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
    const email = form.querySelector('[name="email"]');
    const login = form.querySelector('[name="login"]');
    const first_name = form.querySelector('[name="first_name"]');
    const second_name = form.querySelector('[name="second_name"]');
    const phone = form.querySelector('[name="phone"]');
    const password = form.querySelector('[name="password"]');
    const password_repeat = form.querySelector('[name="password_repeat"]');
    const data = {
        login: login.value,
        password: password.value,
        email: email.value,
        first_name: first_name.value,
        second_name: second_name.value,
        phone: phone.value,
        password_repeat: password_repeat.value
    };
    console.log(data);
}

getDataForm();
