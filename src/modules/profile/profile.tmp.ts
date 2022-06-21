
 const tmp =  `.wrap
                .control
                    a(href="../chats/chats.pug")
                        img(src="../../../static/img/arrow.svg")
                .profile-wrap
                    .profile-title
                        .avatar
                            // img(src="/")
                        .name Иван
                    form.info
                        .text-field-edit-info
                            #{label_email}
                            div
                                #{input_email}
                                #{error_email}
                        .text-field-edit-info
                            #{label_login}
                            div
                                #{input_login}
                                #{error_login}
                        .text-field-edit-info
                            #{label_first_name}
                            div
                                #{input_first_name}
                                #{error_first_name}
                        .text-field-edit-info
                            #{label_second_name}
                            div
                                #{input_second_name}
                                #{error_second_name}
                        .text-field-edit-info
                            #{label_display_name}
                            div
                                #{input_display_name}
                                #{error_display_name}
                        .text-field-edit-info
                            #{label_phone}
                            div
                                #{input_phone}
                                #{error_phone}
                    .action
                        .info-block
                            a(href="./edit/edit-profile.pug").info-block__name.color-blue Изменить данные
                        .info-block
                            a(href="/").info-block__name.color-red Выйти`

export default tmp;