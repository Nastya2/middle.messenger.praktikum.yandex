import { Tprops } from "@types";
import Component from "../../services/component";

import template from "./link.tmp"


export class Link extends Component {
  constructor(props: Tprops) {
    super(props);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}


