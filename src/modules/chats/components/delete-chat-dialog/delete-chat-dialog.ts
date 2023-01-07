import Component from "../../../shared/services/component";
import template from "./delete-chat-dialog.tmp";
import { Tprops } from "@types";
import { Button } from "../../../shared/components/button/button";

export default class DeleteChatDialog extends Component {
  constructor(props: Tprops) {
    super(props);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const button_close_delete_chat = new Button({
  text: 'Закрыть',
  classes: 'btn',
  event: {
      click: function() {
        const d = document.querySelector("#delete-chat") as HTMLDialogElement;
        d?.close();
      }
  },
});

