const template = `.wrap-auth
                form.auth-form
                    h1.auth-form__title Вход
                    .auth-form__field
                        .text-field
                            #{label_login}
                            #{input_login}
                            #{error_login}
                        .text-field
                            #{label_password}
                            #{input_password}
                            #{error_password}
                    #{hint_auth}
                    .auth-form__action
                        .btn-action
                            #{button}
                        #{link_sing_up}`

export default template;