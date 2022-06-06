import Button from "../../shared/components/button/button";
import { render } from "./../../utils/renderDom";

const form = document.querySelector('.auth-form');

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
    const data = {
        login: form.elements.login.value,
        password: form.elements.password.value
    };
    console.log(data);
}

getDataForm();






