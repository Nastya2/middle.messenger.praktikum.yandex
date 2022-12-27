const tmp = `.wrap.wrap_column
                .control
                    #{arrowIcon}
                .profile-wrap
                    form.info
                        .text-field-edit-info
                            #{label_old_password}
                            div
                                #{input_old_password}
                                #{error_old_password}
                        .text-field-edit-info
                            #{label_new_password}
                            div
                                #{input_new_password}
                                #{error_new_password}
                        .text-field-edit-info
                            #{label_new_password_repeat}
                            div
                                #{input_new_password_repeat}
                                #{error_new_password_repeat}
                .btn-action
                    #{button}
                #{hint_password}`

export default tmp;