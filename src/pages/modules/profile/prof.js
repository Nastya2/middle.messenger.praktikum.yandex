import Button from "../shared/components/button/button";
import { render } from "./../utils/renderDom";

const button = new Button({
    text: 'Сохранить',
    clases: 'btn btn_width280'
});

console.log(button);

render(".btn-action", button);
