import ChatItem, { chat_avatar } from "./components/chat-item/chat-item";
import { Tprops } from "@types";
import Component from "../shared/services/component";
import tmp from "./chats.tmp";
import ChatItems from "./components/chat-items/chat-items";
import AddChatDialog from "./components/add-chat-dialog/add-chat";
import {input_name_chat, button_close, label_name_chat} from "./components/add-chat-dialog/add-chat";
import { Button } from "../shared/components/button/button";
import {AddUserDialog, input_name_user, label_name_user, button_close_add_user, error_add_user, closeAddUser} from "./components/add-user-dialog/add-user";
import HeaderChat from "./components/header-chat/header-chat";
import { Link } from "../shared/components/link/link";
import  Router from "../routing/router";
import { WSTransport, WSTransportEvents } from "../shared/services/wss";
import { Input } from "../shared/components/input/input";
import Message from "./components/message/message";
import Messages from "./components/messages/messages";
import { DeleteUserDialog, input_name_user_delete, button_close_user_delete, label_name_user_delete, error_user_delete, closeDeleteUser } from "./components/delete-user-dialog/delete-user-dialog";
import Icon from "../shared/components/icon/icon";
import chatsService from "./chats.service";
import store from "../shared/store";
import { ChangeAvatarDialog, button_close_change_avatar, chat_avatar_upload, closeChangeAvatar } from "./components/change_avatar_dialog/change_avatar_dialog";
import { Avatar } from "../shared/components/avatar/avatar";
import { BASE_URL } from "../shared/consts";
import DeleteChatDialog, {button_close_delete_chat} from "./components/delete-chat-dialog/delete-chat-dialog";


export class ChatsPage extends Component {
    constructor(props: Tprops) {
        super(props);
    }

    public render(): DocumentFragment {
        getAllChatsAndUpdate();
        return this.compile(tmp, this.props);
    }
}

let usersOpenChat = "";
let infoUsersOpenChat: {login: string, user_id: number}[];
let chat_id_active: number | null = null;
let chat_items = new ChatItems({chats: []});
let chats_id: number[] = [];
let chats_id_avatar: {id: number, avatar: string | null | undefined}[] = [];
let sockets: {socket: WSTransport, chat_id: number, messages: Message[]}[] = [];
let chats_token:{token: string, chat_id: number}[] = [];

const linkProfile = new Link({
    text: "Профиль",
    event: {
        click: function() {
            Router.go("/settings");
        }
    }
});


export const avatar_right = function(avatar: string | null | undefined) {
    return new Avatar({
      src_img: avatar ? `${BASE_URL}/resources/${avatar}` : "", 
      alt_img:"Аватар"
  });
}


const add_chat_icon = new Icon({
    event: {
        click: function() {
            const d = dialog_add_chat.getContent().lastChild as HTMLDialogElement;
            d?.showModal();
        }
    },
    classes: "add_chat"
});

const add_user_icon = new Icon({
    event: {
        click: function() {
            const d = dialog_add_user.getContent().lastChild as HTMLDialogElement;
            d?.showModal();
        },
    },
    classes: "add_user"
});


const delete_chat_icon = new Icon({
    event: {
        click: function() {
            const d = dialog_delete_chat.getContent().lastChild as HTMLDialogElement;
            d?.showModal();
        }
    },
    classes: "delete_chat_icon"
});

const input_msg = new Input({
    text: "Сообщение",
    input_type: "text",
    input_name:"msg",
    event: {
        change: function() {
            const msg = (input_msg.getContent().lastChild as HTMLInputElement).value;
            updateInputMsg(msg);
        }
    }
});

function updateInputMsg(value: string): void {
    input_msg.setProps({ 
        text: "Сообщение",
        input_type: "text",
        input_name:"msg",
        value: value,
        event: {
            change: function() {
                const msg = (input_msg.getContent().lastChild as HTMLInputElement).value;
                updateInputMsg(msg);
            }
        }
    });
}

const btnSubmit = new Button({
    text: 'Отправить',
    classes: 'btn',
    event: {
        click: function() {
            const msg = (input_msg.getContent().lastChild as HTMLInputElement).value;
            const socket_active = sockets.find((socket) => socket.chat_id === chat_id_active);

            if (socket_active && msg) {
                socket_active.socket.send(msg, "message");
                updateInputMsg("");
            }
            
        }
    },

});

const all_messages = new Messages({messages: []});


const delete_user_icon = new Icon({
    event: {
        click: function() {
            const d = dialog_delete_user.getContent().lastChild as HTMLDialogElement;
            d?.showModal();
        },
    },
    classes: "delete_user"
});


const button_action_add_chat = new Button({
    text: 'Добавить',
    classes: 'btn',
    event: {
        click: function() {
          const value = (input_name_chat.getContent().lastChild as HTMLInputElement).value;
          const data = {
            title: value
          }
          chatsService.createChat(data).then(() => getAllChatsAndUpdate());
          const d = document.querySelector("#add_chat") as HTMLDialogElement;
          d?.close();
        }
    },
});

const button_action_delete_chat = new Button({
    text: 'Удалить',
    classes: 'btn',
    event: {
        click: function() {
            const data = {
                chatId: chat_id_active || 0
            }
            if (data.chatId) {
                chatsService.deleteChat(data).then(() => getAllChatsAndUpdate()).catch(() => alert("При удалении чата произошла ошибка."));
                const d = document.querySelector("#delete-chat") as HTMLDialogElement;
                d?.close();
            }
        }
    },
});

const button_action_add_user = new Button({
    text: 'Добавить',
    classes: 'btn',
    event: {
        click: function() {
          const value = (input_name_user.getContent().lastChild as HTMLInputElement).value;
          const data1 = {
            login: value
          };

          chatsService.searchUser(data1).then((res) => {
            if(res.length && chat_id_active) {
                const data2 = {
                    users: [res[0].id],
                    chatId: chat_id_active
                };
                chatsService.addUsersToChat(data2).then(() => getUsersChatAndUpdate(data2.chatId, true));
                const d = document.querySelector("dialog");
                d?.close();
            } else {
                error_add_user.setProps({error: "Пользователь не найден"});
                setTimeout(() => error_add_user.setProps({error: ""}), 2000);
            }
          });
        }
    },
});

const button_action_user_delete = new Button({
    text: 'Удалить',
    classes: 'btn',
    event: {
        click: function() {
          const value = (input_name_user_delete.getContent().lastChild as HTMLInputElement).value;
          const user = infoUsersOpenChat.find((user) => user.login.trim() === value);
          if (user && chat_id_active) {
            const data = {users: [user.user_id], chatId: chat_id_active}
            chatsService.deleteUsers(data).then(() => {
                if (chat_id_active) {
                    getUsersChatAndUpdate(chat_id_active);
                    closeDeleteUser();
                }
            });
          } else {
            error_user_delete.setProps({error: "Пользователь не найден"});
            setTimeout(() => error_user_delete.setProps({error: ""}), 2000);
          }
         
        }
    },
});

const button_action_change_avatar = function() {
    return new Button({
        text: 'Изменить',
        classes: 'btn',
        event: {
            click: function(e: Event) {
              e.stopPropagation();
              const avatar = document.getElementById('form-avatar') as HTMLFormElement;
              if (avatar) {
                const form = new FormData(avatar);
                form.append("chatId", String(chat_id_active));
                chatsService.changeAvatarChat(form).then((chat) => {
                    closeChangeAvatar();
                    getAllChatsAndUpdate();
                    updateHeaderChat(chat?.avatar);
                }).catch(() => alert("Не удалось загрузить аватар."));
                
              } 
            }
        },
    });    
}

const dialog_add_chat = new AddChatDialog({input_name_chat, button_close, label_name_chat, button_action_add_chat});
const dialog_delete_chat = new DeleteChatDialog({button_action_delete_chat, button_close_delete_chat});
const dialog_add_user = new AddUserDialog({error_add_user, input_name_user, label_name_user, button_close_add_user, button_action_add_user});
const dialog_delete_user = new DeleteUserDialog({error_user_delete, input_name_user_delete, label_name_user_delete, button_close_user_delete, button_action_user_delete});

export const dialog_change_avatar = function() {
    return new ChangeAvatarDialog({button_action_change_avatar: button_action_change_avatar(), button_close_change_avatar: button_close_change_avatar(), chat_avatar_upload: chat_avatar_upload(),
    event: {
        click: function(e: Event) {
            e.stopPropagation();
        }
    }});
}

const headerChat = new HeaderChat({
    name: usersOpenChat,
    input_msg,
    btnSubmit,
    all_messages,
    add_user_icon,
    delete_user_icon,
    avatar_right: avatar_right(null),
    delete_chat_icon,
});

function updateHeaderChat(avatar: null | string | undefined): void {
    headerChat.setProps({
        name: usersOpenChat,
        input_msg,
        btnSubmit,
        all_messages,
        add_user_icon,
        delete_user_icon,
        avatar_right: avatar_right(avatar),
        delete_chat_icon,
    });

    setScrollPosition();
}

function getAllChatsAndUpdate() {
    chatsService.getAllChats().then((chats) => {
        chats_id = chats.map((chat) => chat.id);

        chats_id_avatar = chats.map((chat) => {
            return  {
                id: chat?.id,
                avatar: chat?.avatar
            }
        });

        const all_chats = chats.map((chat) => {
            return new ChatItem({
                name: chat.title,
                msg: chat?.last_message?.content || "",
                time: chat?.last_message?.time ?  new Date(Date.parse(chat?.last_message?.time || "")) : "",
                count: chat.unread_count,
                chat_avatar: chat_avatar(chat.avatar),
                dialog_change_avatar: dialog_change_avatar(),
                event: {
                    click: function() {
                        chat_id_active = chat.id;
                        getUsersChatAndUpdate(chat.id);
                        updateChat();
                    }
                }
        })});

        chat_items.setProps({chats: all_chats});
        getTokenChat();
    });
}

function updateChat(): void {
    const active_msg = sockets.find((msg) => msg.chat_id === chat_id_active);
    const avatar = chats_id_avatar.find((chat) => chat.id === chat_id_active);
    if (active_msg) {
        all_messages.setProps({messages: [...active_msg.messages]});
        updateHeaderChat(avatar?.avatar);
    }
}


function getUsersChatAndUpdate(chat_id: number, add_user?: boolean): void {
    const avatar = chats_id_avatar.find((chat) => chat.id === chat_id_active);
    chatsService.getUsersChat(chat_id).then((res) => {
        infoUsersOpenChat = res.map((user) => ({login: user.login, user_id: user.id}));
        usersOpenChat = res.map((user) => {
            return user.login;
        }).join(",");
        updateHeaderChat(avatar?.avatar);
        if (add_user) {
            closeAddUser();
        }
    });
}

function getTokenChat(): void {
    let promise: Promise<{token: string, chat_id: number}>[] = [];
    chats_id.forEach((id) => {
        promise.push(chatsService.getToken(id).then((res) => {
            return {
                chat_id: id,
                token: res.token
            }
        }));
    });

    Promise.all(promise).then((res) => {
        chats_token = res;
        connectSockets();
    })
}


function connectSockets() {
    const user_id = store.getState().user.id;
    if (user_id) {
        chats_token.forEach((token) => {
            if(sockets.find((s) => s.chat_id === token.chat_id)) {
                return;
            }
            const socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${user_id}/${token.chat_id}/${token.token}`, token.chat_id);
            socket.connect().then(() => {
                sockets.push({socket: socket, chat_id: token.chat_id, messages: []});
                subSocket(socket, token.chat_id);
            });
        });
    }
}

function subSocket(socket: WSTransport, chat_id: number) {
    const socketMessage = sockets.find((soc) => soc.chat_id === socket.id);
        socket.on(WSTransportEvents.Message, (data: any) => {
            if (Array.isArray(data)) {
                data.reverse();
                data.forEach((d) => {
                    if (socketMessage) {
                        socketMessage.messages.push(createMsg(d));
                    }
                });
            } else {
                if (socketMessage) {
                    socketMessage.messages.push(createMsg(data));
                }
            }
    
            updateChat();
        });

        socket.on(WSTransportEvents.Close, () => {
            const index = sockets.findIndex((soc) => soc.chat_id === chat_id);
            if (index !== -1) {
                sockets.splice(index,1);
            }
        });
}


function createMsg(data: {user_id: number, time: string, content: string}): Message {
    if(data.user_id === store.getState().user.id) {
        return new Message({
            text: data.content,
            time: new Date(Date.parse(data.time)),
            class_position: "msg_from"
        });
    } else {
       return new Message({
            text: data.content,
            time: new Date(Date.parse(data.time)),
            class_position: "msg_to"
        });
    }
}

function setScrollPosition():void {
    const block_msgs = document.querySelector(".right-chats__msg");
    if (block_msgs) {
        block_msgs.scrollTop = block_msgs.scrollHeight;
    }
}

export const Components = {
    chat_items,
    dialog_add_chat,
    add_chat_icon,
    dialog_add_user,
    headerChat,
    linkProfile,
    dialog_delete_user,
    dialog_delete_chat
};



