import Component from "../../../shared/services/component";
import { compile, compileTemplate } from "pug";
import template from "./message.tpm"


export default class Message extends Component {
  private fn: compileTemplate | undefined;
  constructor(props: {[key: string]: any}) {
    super("div", props);
  }

  public render(): string {
    if(!this.fn) {
      this.fn = compile(template);
    }
    return this.fn(this.props);
  }
}
