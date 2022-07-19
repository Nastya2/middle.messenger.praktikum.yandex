import Component from "../../../shared/services/component";
import template from "./add-user.tmp";
import { Tprops } from "@types";
import { Input } from "../../../shared/components/input/input";
import { Label } from "../../../shared/components/label/label";
import { Button } from "../../../shared/components/button/button";

export class AddUserDialog extends Component {
  constructor(props: Tprops) {
    super(props);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const input_name_user = new Input({
  text: "Логин",
  input_type: "text",
  input_name:"name_chat",
  class_input: "text-field__input",
});

export const label_name_user = new Label({
  class_label: "text-field__label",
  for_label: "name_chat",
  text: "Логин",
});

export const button_close_add_user = new Button({
  text: 'Закрыть',
  classes: 'btn',
  event: {
      click: function() {
        const d = document.querySelector("#add-user") as HTMLDialogElement;
        d?.close();
      }
  },
});

