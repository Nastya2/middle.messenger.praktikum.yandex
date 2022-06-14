import { EventBus } from "./event-bus";
import { v4 as makeUUID } from "uuid";
class Component {
    constructor(wrap, props = {}, class_style) {
        var _a;
        this.wrap = "div";
        this.id = "";
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            this.removeListener();
            if (this._componentDidUpdate(this.props, nextProps)) {
                Object.assign(this.props, nextProps);
                this.eventBus().emit(Component.EVENTS.FLOW_CDU, nextProps, this.props);
            }
        };
        const bus = new EventBus();
        this.eventBus = () => bus;
        this.wrap = wrap;
        this.class_style = class_style;
        this.props = this.makePropsProxy(props);
        this.registerEvents();
        if ((_a = props === null || props === void 0 ? void 0 : props.settings) === null || _a === void 0 ? void 0 : _a.withInternalID) {
            this.id = makeUUID();
            this.props = this.makePropsProxy(Object.assign(Object.assign({}, props), { __id: this.id }));
        }
        this.eventBus().emit(Component.EVENTS.INIT);
    }
    registerEvents() {
        this.eventBus().on(Component.EVENTS.INIT, this.init.bind(this));
        this.eventBus().on(Component.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
        this.eventBus().on(Component.EVENTS.FLOW_RENDER, this.renderTmp.bind(this));
        this.eventBus().on(Component.EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
    }
    init() {
        var _a, _b;
        this.createResources();
        if ((_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.settings) === null || _b === void 0 ? void 0 : _b.withInternalID) {
            this.element.setAttribute("data-id", this.id);
        }
        this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
    createResources() {
        this.element = document.createElement(this.wrap);
        if (this.class_style) {
            this.element.classList.add(this.class_style);
        }
    }
    renderTmp() {
        const block = this.render();
        this.element.innerHTML = block;
        this.addEvents();
    }
    dispatchComponentDidMount() {
        this.eventBus().emit(Component.EVENTS.FLOW_CDM);
    }
    componentDidMount() {
        console.log("Component render into DOM");
    }
    _componentDidUpdate(oldProps, newProps) {
        if (JSON.stringify(oldProps) !== JSON.stringify(newProps)) {
            return true;
        }
        else {
            return false;
        }
    }
    componentDidUpdate() {
        console.log("update render");
        this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
    makePropsProxy(props) {
        return new Proxy(props, {
            get(target, prop) {
                return target[prop];
            },
            set(target, prop, value) {
                target[prop] = value;
                return true;
            },
            deleteProperty() {
                throw new Error("нет доступа");
            }
        });
    }
    getContent() {
        return this.element;
    }
    show() {
        this.getContent().style.display = "block";
    }
    hide() {
        this.getContent().style.display = "none";
    }
    addEvents() {
        /* eslint-disable */
        const events = this.props.event;
        if (events) {
            Object.keys(events).forEach(eventName => {
                this.element.addEventListener(eventName, events[eventName]);
            });
        }
    }
    removeListener() {
        const events = this.props.event;
        if (events) {
            Object.keys(events).forEach(eventName => {
                this.element.removeEventListener(eventName, events[eventName]);
            });
        }
    }
}
Component.EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update"
};
export default Component;
//# sourceMappingURL=component.js.map