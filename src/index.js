import {render} from "./pages/home/modules/utils/renderDom";
import Button from "./button";

const button = new Button({
    text: 'Click me',
});
render(".app", button);
setTimeout(() => {
    button.setProps({
        text: 'Click me2',
    })
}, 5000);

console.log(button);

class A {
    b; c;
}

console.log(new A());
