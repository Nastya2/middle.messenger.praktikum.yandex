import Button from "../shared/components/button/button";
import { render } from "../utils/renderDom";

const button = new Button({
    text: 'Сохранить',
    clases: 'btn btn_width280'
});


render(".btn-action", button);
