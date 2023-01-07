export default  `dialog(aria-labeledby="subscribe-header", aria-describedby="subscribe-content", id="delete-chat")
                h2(id="subscribe-header") Удалить чат
                .text-field(id="subscribe-content") Вы действительно хотите удалить чат?
                .btn-action.between
                    #{button_action_delete_chat}
                    #{button_close_delete_chat}`



