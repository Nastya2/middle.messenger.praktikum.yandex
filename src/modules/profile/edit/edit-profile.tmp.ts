const tmp = `.wrap.wrap_column
                .control
                    a(href="#")
                        img(src="../../../../static/img/arrow.svg")
                .profile-wrap
                    .profile-title
                        .avatar
                            input(type="file", name="avatar")
                        .name Иван
                    form.info
                        .text-field-edit-info
                            #{label_email}
                            #{input_email}
                            #{error_email}
                        .text-field-edit-info
                            #{label_login}
                            #{input_login}
                            #{error_login}
                        .text-field-edit-info
                            #{label_first_name}
                            #{input_first_name}
                            #{error_first_name}
                        .text-field-edit-info
                            #{label_second_name}
                            #{input_second_name}
                            #{error_second_name}
                        .text-field-edit-info
                            #{label_display_name}
                            #{input_display_name}
                            #{error_display_name}
                        .text-field-edit-info
                            #{label_phone}
                            #{input_phone}
                            #{error_phone}
                        .text-field-edit-info
                            #{label_old_password}
                            #{input_old_password}
                            #{error_old_password}
                        .text-field-edit-info
                            #{label_new_password}
                            #{input_new_password}
                            #{error_new_password}
                        .text-field-edit-info
                            #{label_new_password_repeat}
                            #{input_new_password_repeat}
                            #{error_new_password_repeat}
                .btn-action
                    #{button}`

export default tmp;
