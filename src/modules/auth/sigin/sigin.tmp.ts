const template = `.wrap-auth
                form.auth-form
                    h1.auth-form__title Регистрация
                    .auth-form__field
                        .text-field
                            #{label_email}
                            #{input_email}
                            #{error_email}
                        .text-field
                            #{label_login}
                            #{input_login}
                            #{error_login}
                        .text-field
                            #{label_first_name}
                            #{input_first_name}
                            #{error_first_name}
                        .text-field
                            #{label_second_name}
                            #{input_second_name}
                            #{error_second_name}
                        .text-field
                            #{label_phone}
                            #{input_phone}
                            #{error_phone}
                        .text-field
                            #{label_password}
                            #{input_password}
                            #{error_password}
                        .text-field
                            #{label_password_repeat}
                            #{input_password_repeat}
                            #{error_password_repeat}
                    .auth-form__action
                        .btn-action
                            #{button}
                        #{link_sing_in}`

export default template;