
import { EventBus } from "./event-bus";
import {v4 as makeUUID} from "uuid";

type Tprops = {[key: string]: any};


abstract class Component {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update"
  };

  private element: HTMLElement;
  public props: Tprops;
  private eventBus: () => EventBus;
  private wrap: string = "div";
  private id: string = "";
  private class_style: string | undefined;

  constructor(wrap: string, props: Tprops = {}, class_style?: string) {
    const bus = new EventBus();
    this.eventBus = () => bus;
    this.wrap = wrap;
    this.class_style = class_style;

   
    this.props = this.makePropsProxy(props);

    this.registerEvents();
    if (props?.settings?.withInternalID) {
      this.id = makeUUID();
      this.props = this.makePropsProxy({ ...props, __id: this.id });
    }
 
    this.eventBus().emit(Component.EVENTS.INIT);
  }

  private registerEvents(): void {
    this.eventBus().on(Component.EVENTS.INIT, this.init.bind(this));
    this.eventBus().on(Component.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
    this.eventBus().on(Component.EVENTS.FLOW_RENDER, this.renderTmp.bind(this));
    this.eventBus().on(Component.EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
  }

  private init(): void {
    this.createResources();
    if (this.props?.settings?.withInternalID) {
      this.element.setAttribute("data-id", this.id);
    }
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  private createResources(): void {
    this.element = document.createElement(this.wrap);
    if (this.class_style) {
      this.element.classList.add(this.class_style);
    }
  }

  private renderTmp(): void {
    const block = this.render();
    this.element.innerHTML = block;
    this.addEvents();
  }

  abstract render(): string;

  public dispatchComponentDidMount(): void { // external call render
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  private componentDidMount(): void {
    console.log("Component render into DOM");
  }

  private _componentDidUpdate(oldProps: Tprops, newProps: Tprops) {
    if(JSON.stringify(oldProps) !== JSON.stringify(newProps)) {
      return true;
    } else {
      return false;
    }
  }

  private componentDidUpdate() {
    console.log("update render");
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

  private addEvents(): void {
    /* eslint-disable */
    const events = this.props.event as any;

    if (events) {
      Object.keys(events).forEach(eventName => {
        this.element.addEventListener(eventName, events[eventName]);
      });
    }
  }

  private removeListener(): void {
    const events = this.props.event as any;
    if(events) {
      Object.keys(events).forEach(eventName => {
        this.element.removeEventListener(eventName, events[eventName]);
      });
    }
  }
}

export default Component;