export default  `dialog(aria-labeledby="subscribe-header", aria-describedby="subscribe-content", id="delete-user")
                h2(id="subscribe-header") Удалить пользователя
                .text-field(id="subscribe-content")
                    #{label_name_user_delete}
                    #{input_name_user_delete}
                    #{error_user_delete}
                .btn-action.between
                    #{button_action_user_delete}
                    #{button_close_user_delete}`



