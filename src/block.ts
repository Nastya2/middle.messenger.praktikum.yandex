import { EventBus } from "./pages/mvc/event-bus";

type Tprops = {[key: string]: string};

abstract class Block {
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
    this.eventBus().emit(Block.EVENTS.INIT);
  }

  private registerEvents(): void {
    this.eventBus().on(Block.EVENTS.INIT, this.init.bind(this));
    this.eventBus().on(Block.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
    this.eventBus().on(Block.EVENTS.FLOW_RENDER, this.renderTmp.bind(this));
    this.eventBus().on(Block.EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
  }

  private createResources(): void {
    this.element = document.createElement(this.meta?.wrap || "div");
  }

  private init(): void {
    this.createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private componentDidMount(): void {
    console.log("Component render into DOM");
  }

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private componentDidUpdate(...args: unknown[]) {
    const [oldValue, newValue] = args;
    if(oldValue !== newValue) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
      console.log(oldValue, newValue, "update");
      return true;
    } else {
      return false;
    }
  }

  public setProps = (nextProps: Tprops) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private renderTmp(): void {
    const block = this.render();
    this.element.innerHTML = block;
  }

  abstract render(): string;

  private makePropsProxy(props: Tprops): Tprops {
      const self = this;
      return new Proxy(props, {
          get(target: Tprops, prop: string) {
            return target[prop];
          },
          set(target: Tprops, prop: string, value: string) {
            const oldValue = target[prop];
            target[prop] = value;
            self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, value);
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
}

export default Block; 