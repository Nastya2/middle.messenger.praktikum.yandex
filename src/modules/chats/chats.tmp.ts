
const tmp = `.wrap-chats 
                .left-chats
                    .left-chats__header
                        .left-chats__profile
                            a(href="./../profile/profile.pug") Профиль
                        .left-chats__search
                            input(type="text", placeholder="Поиск").search
                    #{chat_items}
                    .add_chat
                        img(src="./../../src/static/img/add-chat.svg")
                .right-chats
                    .right-chats-top
                        .right-chats__header
                            .right-chats__profile
                                .avatar
                                .right-chats__name Андрей
                        .right-chats__msg
                            #{msg_to_1}
                            #{msg_to_2}
                            #{msg_from_1}
                            #{msg_from_2}
                    .right-chats__input
                        input(type="text", required, placeholder="Сообщение")
                        .submit-msg 
                            img(src="../../../static/img/arrow.svg")`;
export default tmp;

    
