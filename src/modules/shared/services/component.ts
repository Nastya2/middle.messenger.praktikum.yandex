
import { EventBus } from "./event-bus";
import {v4 as makeUUID} from "uuid";
import { compile, compileTemplate } from "pug";
import { Tprops } from "@types";


abstract class Component {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update"
  };

  private element: DocumentFragment;
  public props: Tprops;
  private eventBus: () => EventBus;
  private id = "";
  private children: Tprops;
  private compileTemplate: compileTemplate | undefined;

  constructor(propsAndChildren: Tprops = {}) {
    const bus = new EventBus();
    this.eventBus = () => bus;

    const { children, props } = this.getChildren(propsAndChildren);
   
    this.props = this.makePropsProxy(props);
    this.children = children;

    this.registerEvents();
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
    this.element = new DocumentFragment();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  private createResources(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    return element;
  }

  private renderTmp(): void {
    const block = this.render();

    if (block instanceof DocumentFragment) {
      this.element.append(block);
    }
    this.addEvents();
  }

  abstract render(): DocumentFragment;

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

    // console.log(propsAndStubs)
    
    //return this.compileTemplate(propsAndStubs);

    const fragment = this.createResources('template') as HTMLTemplateElement;
    if(!this.compileTemplate) {
      this.compileTemplate = compile(template);
    }
    fragment.innerHTML = this.compileTemplate(propsAndStubs);
     console.log(this.children)
    Object.values(this.children).forEach((child: Component) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      if (stub) {
        stub.replaceWith(child.getContent());
        // console.log(child.getContent(), "kk")
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

  public getContent(): DocumentFragment {
    return this.element;
  }

  // public show(): void {
  //   if (this.getContent()) {
  //     this.getContent().textContent.style.display = "block";
  //   }
  // }

  // public hide(): void {
  //   if (this.getContent()) {
  //     this.getContent().style.display = "none";
  //   }
  // }

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