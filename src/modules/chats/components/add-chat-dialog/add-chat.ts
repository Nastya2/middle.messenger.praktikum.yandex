import Component from "../../../shared/services/component";
import template from "./add-chat.tmp";
import { Tprops } from "@types";
import { Input } from "../../../shared/components/input/input";
import { Label } from "../../../shared/components/label/label";
import { Button } from "../../../shared/components/button/button";

export default class AddChatDialog extends Component {
  constructor(props: Tprops) {
    super(props);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const input_name_chat = new Input({
  text: "Название чата",
  input_type: "text",
  input_name:"name_chat",
  class_input: "text-field__input",
});

export const label_name_chat = new Label({
  class_label: "text-field__label",
  for_label: "name_chat",
  text: "Название чата",
});

export const button_close = new Button({
  text: 'Закрыть',
  classes: 'btn',
  event: {
      click: function() {
        const d = document.querySelector("#add_chat") as HTMLDialogElement;
        d?.close();
      }
  },
});

