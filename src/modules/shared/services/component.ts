
import { EventBus } from "./event-bus";
import {v4 as makeUUID} from "uuid";
import { compile, compileTemplate } from "pug";

type Tprops = Record<string, any>;


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
  private wrap = "div";
  private id = "";
  private class_style: string | undefined;
  private children: Tprops;
  private compileTemplate: compileTemplate | undefined;

  constructor(wrap: string, propsAndChildren: Tprops = {}, class_style?: string) {
    const bus = new EventBus();
    this.eventBus = () => bus;
    this.wrap = wrap;
    this.class_style = class_style;
    const { children, props } = this.getChildren(propsAndChildren);
   
    this.props = this.makePropsProxy(props);
    this.children = children;

    this.registerEvents();
    // if (props?.settings?.withInternalID) {
    //   this.id = makeUUID();
    //   this.props = this.makePropsProxy({ ...props, __id: this.id });
    // }
    this.id = makeUUID();
    this.props = this.makePropsProxy({ ...props, __id: this.id });
 
    this.eventBus().emit(Component.EVENTS.INIT);
  }

  private registerEvents(): void {
    this.eventBus().on(Component.EVENTS.INIT, this.init.bind(this));
    this.eventBus().on(Component.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
    this.eventBus().on(Component.EVENTS.FLOW_RENDER, this.renderTmp.bind(this));
    this.eventBus().on(Component.EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
  }

  private getChildren(propsAndChildren: Tprops): {props: Tprops, children: Tprops} {
    const children: Tprops = {};
    const props: Tprops = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return {props, children};
  }

  private init(): void {
    this.element = this.createResources(this.wrap);
    if (this.class_style) {
      this.element.classList.add(this.class_style);
    }
    // if (this.props?.settings?.withInternalID) {
    //   this.element.setAttribute("data-id", this.id);
    // }
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  private createResources(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    return element;
  }

  private renderTmp(): void {
    const block = this.render();
    this.element.innerHTML = "";

    if (typeof block === "string") {
      this.element.innerHTML = block;
    }

    if (block instanceof DocumentFragment) {
      this.element.append(block);
    }
    
    this.addEvents();
  }

  abstract render(): DocumentFragment | string;

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

  public compile(template: string, props: Tprops): DocumentFragment {
    const propsAndStubs = { ...props };
 
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `div data-id="${child.id}"`;
    });

    console.log(propsAndStubs)
    
    //return this.compileTemplate(propsAndStubs);

    const fragment = this.createResources('template') as HTMLTemplateElement;
    if(!this.compileTemplate) {
      this.compileTemplate = compile(template);
    }
    fragment.innerHTML = this.compileTemplate(propsAndStubs);

    Object.values(this.children).forEach((child: Component) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      if (stub) {
        stub.replaceWith(child.getContent());
      } else {
        console.log("заглушка не найдена");
      }
    });

    return fragment.content;
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