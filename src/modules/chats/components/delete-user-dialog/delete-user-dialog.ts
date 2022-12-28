import Component from "../../../shared/services/component";
import template from "./delete-user-dialog.tmp";
import { Tprops } from "@types";
import { Input } from "../../../shared/components/input/input";
import { Label } from "../../../shared/components/label/label";
import { Button } from "../../../shared/components/button/button";
import { Error } from "../../../shared/components/error/error";

export class DeleteUserDialog extends Component {
  constructor(props: Tprops) {
    super(props);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const input_name_user_delete = new Input({
  text: "Логин",
  input_type: "text",
  input_name:"name_user",
  class_input: "text-field__input",
});

export const label_name_user_delete = new Label({
  class_label: "text-field__label",
  for_label: "name_user",
  text: "Логин",
});

export const button_close_user_delete = new Button({
  text: 'Закрыть',
  classes: 'btn',
  event: {
      click: function() {
        closeDeleteUser();
      }
  },
});

export const error_user_delete = new Error({
  error: ""
});

export function closeDeleteUser() {
  const d = document.querySelector("#delete-user") as HTMLDialogElement;
  d?.close();
  input_name_user_delete.setProps({
    text: "Логин",
    input_type: "text",
    input_name:"name_chat",
    class_input: "text-field__input",
    value: ""
  });
}


