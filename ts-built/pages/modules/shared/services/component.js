import { EventBus } from "./event-bus";
class Component {
    constructor(wrap = "div", props = {}) {
        this.meta = null;
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
        this.meta = {
            wrap,
            props
        };
        this.props = this.makePropsProxy(props);
        this.registerEvents();
        this.eventBus().emit(Component.EVENTS.INIT);
    }
    registerEvents() {
        this.eventBus().on(Component.EVENTS.INIT, this.init.bind(this));
        this.eventBus().on(Component.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
        this.eventBus().on(Component.EVENTS.FLOW_RENDER, this.renderTmp.bind(this));
        this.eventBus().on(Component.EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
    }
    createResources() {
        var _a;
        this.element = document.createElement(((_a = this.meta) === null || _a === void 0 ? void 0 : _a.wrap) || "div");
    }
    init() {
        this.createResources();
        this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
    componentDidMount() {
        console.log("Component render into DOM");
    }
    dispatchComponentDidMount() {
        this.eventBus().emit(Component.EVENTS.FLOW_CDM);
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
        console.log("update");
        this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
    renderTmp() {
        const block = this.render();
        this.element.innerHTML = block;
        this.addEvents();
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