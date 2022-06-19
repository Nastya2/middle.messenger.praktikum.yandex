import { Tprops } from "@types";
import Component from "../../../shared/services/component";

import template from "./button.tmp"


export class Button extends Component {
  constructor(props: Tprops) {
    super(props);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}


