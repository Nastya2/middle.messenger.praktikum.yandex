import ChatItem from "./components/chat-item/chat-item";
import { render } from "./../utils/renderDom";
import Message from "./components/message/message";

const chat_item_1 = new ChatItem({
    name: "Андрей",
    msg: "Друзья, у меня для вас особенный выпуск новостей!",
    time: "10:49",
    count: "5",
    event: {
        click: function() {
            console.log("lick")
        }
    },
    settings: {withInternalID: true},
});

const chat_item_2 = new ChatItem({
    name: "Андрей",
    msg: "Друзья, у меня для вас особенный выпуск новостей!",
    time: "10:49",
    count: "5",
    event: {
        click: function() {
            console.log("lick")
        }
    },
    settings: {withInternalID: true},
});

const chat_item_3 = new ChatItem({
    name: "Андрей",
    msg: "Друзья, у меня для вас особенный выпуск новостей!",
    time: "10:49",
    count: "5",
    event: {
        click: function() {
            console.log("lick")
        }
    },
    settings: {withInternalID: true},
});

const msg_to_1 = new Message({
    text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.",
    time: "10:49",
    settings: {withInternalID: true},
    class_position: "msg_from"
});

const msg_to_2 = new Message({
    text: "Привет!",
    time: "14:49",
    settings: {withInternalID: true},
    class_position: "msg_to"
});

const msg_from_1 = new Message({
    text: "Привет! Как дела?",
    time: "15:49",
    settings: {withInternalID: true},
    class_position: "msg_from"
});

const msg_from_2 = new Message({
    text: "Ау!",
    time: "15:58",
    settings: {withInternalID: true},
    class_position: "msg_to"
});




render(".chats", chat_item_1);
render(".chats", chat_item_2);
render(".chats", chat_item_3);
render(".right-chats__msg", msg_to_1);
render(".right-chats__msg", msg_to_2);
render(".right-chats__msg", msg_from_1);
render(".right-chats__msg", msg_from_2);