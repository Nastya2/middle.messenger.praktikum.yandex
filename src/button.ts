import Block from "./block";
import { compile, compileTemplate } from "pug";
import template from "./button.tmp"


export default class Button extends Block {
  private fn: compileTemplate | undefined;
  constructor(props: {[key: string]: string}) {
    super("div", props);
  }

  public render(): string {
    if(!this.fn) {
      this.fn = compile(template);
    } 
    return this.fn(this.props);
  }
}


