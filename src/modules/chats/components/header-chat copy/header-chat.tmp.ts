export default  `.right-chats
                    if name
                        .right-chats-top
                            .right-chats__header
                                .right-chats__profile
                                    .avatar
                                    .right-chats__name #{name}
                            .right-chats__msg
                                
                        
                            .submit-msg 
                                img(src="../../../static/img/arrow.svg")
                                
                    else
                        .no-chat Выберите чат`



