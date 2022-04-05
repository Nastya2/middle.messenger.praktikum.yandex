import Button from "../../shared/components/button/button";
import { render } from "./../../utils/renderDom";

const button = new Button({
    text: 'Зарегистрироваться',
    clases: 'btn btn_sigin-top-bottom'
});

render(".btn-action", button);
