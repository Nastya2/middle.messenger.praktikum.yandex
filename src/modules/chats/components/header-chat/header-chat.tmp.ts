export default  `.right-chats
                    if name
                        .right-chats-top
                            .right-chats__header
                                .right-chats__profile
                                    .avatar
                                    .right-chats__name #{name}
                        .right-chats__msg
                            #{all_messages}
                        .right-chats__input
                            #{input_msg}
                            #{btnSubmit}
                                
                    else
                        .no-chat Выберите чат`



