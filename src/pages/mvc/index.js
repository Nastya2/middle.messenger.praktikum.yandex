import { EventBus } from "../modules/shared/services/event-bus";
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




// class Block {
//     static EVENTS = {
//       INIT: "init",
//       FLOW_CDM: "flow:component-did-mount",
//       FLOW_CDU: "flow:component-did-update",
//       FLOW_RENDER: "flow:render"
//     };
  
//     _element = null;
//     _meta = null;
  
  
    
//     /** JSDoc
//      * @param {string} tagName
//      * @param {Object} props
//      *
//      * @returns {void}
//      */
  
//     constructor(tagName = "div", props = {}) {
//       const bus = new EventBus();
//       this.eventBus = () => bus;
  
//       this._meta = {
//         tagName,
//         props
//       };
  
//       this.props = this.makePropsProxy(props);
  
//       this.registerEvents();
//       this.eventBus().emit(Block.EVENTS.INIT);
//     }
  
//     registerEvents() {
//       this.eventBus().on(Block.EVENTS.INIT, this.init.bind(this));
//       this.eventBus().on(Block.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
//       this.eventBus().on(Block.EVENTS.FLOW_RENDER, this.renderTmp.bind(this));
//       this.eventBus().on(Block.EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
//     }
  
//     createResources() {
//       this._element = document.createElement(this._meta?.tagName || "div");
//     }
  
//     init() {
//       this.createResources();
//       this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
//     }
  
//     componentDidMount() {
//       console.log("Component render into DOM");
//     }
  
//     dispatchComponentDidMount() {
//       this.eventBus().emit(Block.EVENTS.FLOW_CDM);
//     }
  
//     componentDidUpdate(...args) {
//       const [oldValue, newValue] = args;
//       if(oldValue !== newValue) {
//         this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
//         console.log(oldValue, newValue, "update");
//         return true;
//       } else {
//         return false;
//       }
//     }
  
//     setProps = (nextProps) => {
//       if (!nextProps) {
//         return;
//       }
      
//       Object.assign(this.props, nextProps);
//     };
  
//     renderTmp() {
//       const block = this.render();
//       console.log(block);
//       this._element.innerHTML = block;
//     }
  
//     render(){}
  
//    makePropsProxy(props) {
//         const self = this;
//         return new Proxy(props, {
//             get(target, prop) {
//               return target[prop];
//             },
//             set(target, prop, value) {
//               const oldValue = target[prop];
//               target[prop] = value;
//               self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, value);
//               return true;
//             },
//             deleteProperty() {
//               throw new Error("нет доступа");
//             }
//       });
//     }
  
//     getContent() {
//       return this._element;
//     }
  
//     show() {
//       this.getContent().style.display = "block";
//     }
  
//     hide(){
//       this.getContent().style.display = "none";
//     }
//   }