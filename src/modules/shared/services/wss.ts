export class Socket {
    private socket: WebSocket;
    constructor() {}
    
    public socketConnect(user_id: number, chat_id:number, token: string) {
        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user_id}/${chat_id}/${token}`);
        this.subSocket();
    }

    public sendMsg(msg: string) {
        if (this.socket.OPEN) {
            this.socket.send(JSON.stringify({
                content: msg,
                type: 'message',
            }));
        } else {
            console.log("соединение не установлено");
        }
    }

    public getSocket(): WebSocket {
        return this.socket;
    }

    private subSocket(): void {
        this.socket.addEventListener('open', () => {
            console.log('Соединение установлено', this.socket.OPEN);
        });
          
        this.socket.addEventListener('close', event => {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения');
        }
        
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });
          
        this.socket.addEventListener('message', event => {
            console.log('Получены данные', event.data);
        });
        
        this.socket.addEventListener('error', event => {
            console.log('Ошибка', event);
        }); 
    }
}





