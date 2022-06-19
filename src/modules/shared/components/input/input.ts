
import { Tprops } from "@types";
import Component from "../../../shared/services/component";
import template from "./input.tmp";


export class Input extends Component {

  constructor(props: Tprops) {
    super(props);
  }

  public render(): DocumentFragment{
    return this.compile(template, this.props);
  }
}


