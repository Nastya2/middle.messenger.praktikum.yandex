export default  `dialog(aria-labeledby="subscribe-header", aria-describedby="subscribe-content", id="change_avatar")
                h2(id="subscribe-header") Изменить аватар чата
                .text-field(id="subscribe-content")
                    #{chat_avatar_upload}
                .btn-action.between
                    #{button_action_change_avatar}
                    #{button_close_change_avatar}`



