import Button from "./button";

const button = new Button({
    text: 'Click me',
});

setTimeout(() => {
    button.setProps({
        text: 'Click me',
    })
}, 5000);
console.log(button);
setTimeout(() => {
    delete button.props.text;
}, 5000);

console.log(button);

