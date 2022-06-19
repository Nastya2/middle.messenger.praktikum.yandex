const template = `.wrap-auth
                form.auth-form
                    h1.auth-form__title Вход
                    .auth-form__field
                        .text-field
                            #{input_login}
                        .text-field
                            #{input_password}
                    .auth-form__action
                        .btn-action
                            #{button}
                        a(href='#').auth-form__href Нет аккаунта?`

export default template;