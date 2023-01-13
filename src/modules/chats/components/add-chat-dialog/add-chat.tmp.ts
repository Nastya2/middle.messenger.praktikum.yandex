export default  `dialog(aria-labeledby="subscribe-header", aria-describedby="subscribe-content", id="add_chat")
                h2(id="subscribe-header") Добавить чат
                .text-field(id="subscribe-content")
                    #{label_name_chat}
                    #{input_name_chat}
                .btn-action.between
                    #{button_action_add_chat}
                    #{button_close}`



