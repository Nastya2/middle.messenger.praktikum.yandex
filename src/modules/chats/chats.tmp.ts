
const tmp = `.wrap-chats 
                .left-chats
                    .left-chats__header
                        .left-chats__profile
                            #{linkProfile}
                        .left-chats__search
                            input(type="text", placeholder="Поиск").search
                    #{chat_items}
                    #{addChatIcon}

                #{headerChat}

                #{dialog}
                #{dialog_add_user}`;
export default tmp;

    
