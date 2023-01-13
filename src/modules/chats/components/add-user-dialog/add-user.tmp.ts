export default  `dialog(aria-labeledby="subscribe-header", aria-describedby="subscribe-content", id="add-user")
                h2(id="subscribe-header") Добавить пользователя
                .text-field(id="subscribe-content")
                    #{label_name_user}
                    #{input_name_user}
                    #{error_add_user}
                .btn-action.between
                    #{button_action_add_user}
                    #{button_close_add_user}`



