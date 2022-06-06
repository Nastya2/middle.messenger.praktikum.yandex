
import { EventBus } from "./event-bus";

type Tprops = {[key: string]: any};


abstract class Component {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update"
  };

  private element: HTMLElement;
  private meta: null | {"wrap": string, props: Tprops} = null;
  public props: Tprops;
  private eventBus: () => EventBus; 

  constructor(wrap = "div", props: Tprops = {}) {
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

  private registerEvents(): void {
    this.eventBus().on(Component.EVENTS.INIT, this.init.bind(this));
    this.eventBus().on(Component.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
    this.eventBus().on(Component.EVENTS.FLOW_RENDER, this.renderTmp.bind(this));
    this.eventBus().on(Component.EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
  }

  private createResources(): void {
    this.element = document.createElement(this.meta?.wrap || "div");
  }

  private init(): void {
    this.createResources();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  private componentDidMount(): void {
    console.log("Component render into DOM");
  }

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Tprops, newProps: Tprops) {
    if(JSON.stringify(oldProps) !== JSON.stringify(newProps)) {
      return true;
    } else {
      return false;
    }
  }

  public componentDidUpdate() {
    console.log("update");
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  public setProps = (nextProps: Tprops) => {
    if (!nextProps) {
      return;
    }

    this.removeListener();

    if(this._componentDidUpdate(this.props, nextProps)) {
      Object.assign(this.props, nextProps);
      this.eventBus().emit(Component.EVENTS.FLOW_CDU, nextProps, this.props);
    }
  };

  private renderTmp(): void {
    const block = this.render();
    this.element.innerHTML = block;
    this.addEvents();
  }

  abstract render(): string;

  private makePropsProxy(props: Tprops): Tprops {
      return new Proxy(props, {
          get(target: Tprops, prop: string) {
            return target[prop];
          },
          set(target: Tprops, prop: string, value: string) {
            target[prop] = value;
            return true;
          },
          deleteProperty() {
            throw new Error("нет доступа");
          }
    });
  }

  public getContent(): HTMLElement {
    return this.element;
  }

  public show(): void {
    this.getContent().style.display = "block";
  }

  public hide(): void {
    this.getContent().style.display = "none";
  }

  private addEvents() {
    /* eslint-disable */
    const events = this.props.event as any;

    if (events) {
      Object.keys(events).forEach(eventName => {
        this.element.addEventListener(eventName, events[eventName]);
      });
    }
  }

  private removeListener() {
    const events = this.props.event as any;
    if(events) {
      Object.keys(events).forEach(eventName => {
        this.element.removeEventListener(eventName, events[eventName]);
      });
    }
  }
}

export default Component;