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
                    .auth-form__action
                        .btn-action
                            #{button}
                        a(href='/chats').auth-form__href Нет аккаунта?`

export default template;