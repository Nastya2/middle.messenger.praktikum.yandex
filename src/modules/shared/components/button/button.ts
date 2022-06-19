import Component from "../../services/component";
import template from "./button.tmp"


export default class Button extends Component {
  constructor(props: {[key: string]: any}) {
    super("div", props);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}


