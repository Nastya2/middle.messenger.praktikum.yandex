const tmp = `.wrap.wrap_column
                .control
                    #{arrowIcon}
                .profile-wrap
                    .profile-title
                        .avatar
                            input(type="file", name="avatar")
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
                .btn-action
                    #{button}`

export default tmp;



// .text-field-edit-info
// #{label_old_password}
// div
//     #{input_old_password}
//     #{error_old_password}
// .text-field-edit-info
// #{label_new_password}
// div
//     #{input_new_password}
//     #{error_new_password}
// .text-field-edit-info
// #{label_new_password_repeat}
// div
//     #{input_new_password_repeat}
//     #{error_new_password_repeat}