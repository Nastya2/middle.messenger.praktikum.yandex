import { EventBus } from "./event-bus";
import { compileFile } from 'pug';

const eventBus = new EventBus();

const callback = () => {
    console.log('Event emitted');
}

eventBus.on('myEvent', callback);
eventBus.emit('myEvent');

console.log(__dirname);


const compiledFunction = compileFile(`./button.pug`);
console.log(compiledFunction);

// console.log(compiledFunction({
//     text: 'Timothy'
// }));