import ChatItem from "./components/chat-item/chat-item";
import { render } from "./../utils/renderDom";
const chat_item = new ChatItem({
    name: "Андрей",
    msg: "Друзья, у меня для вас особенный выпуск новостей!",
    time: "10:49",
    count: "5",
    event: {
        click: function () {
            console.log("lick");
        }
    },
    settings: { withInternalID: true },
});
render(".chats", chat_item);
//# sourceMappingURL=chats.js.map