import { EventBus } from './event-bus';

export enum WSTransportEvents {
  Connected = 'connected',
  Error = 'error',
  Message = 'message',
  Close = 'close',
}

export  class WSTransport extends EventBus {
  private socket: WebSocket | null = null;
  private idInterval: NodeJS.Timer;

  constructor(private url: string, public id: number) {
    super();
  }

  public send(data: unknown, type?: string) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send(JSON.stringify({
                        content: data,
                        type: type,
                    }))
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    this.setupPing();

    return new Promise((resolve) => {
      this.on(WSTransportEvents.Connected, () => {
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
  }

  private setupPing() {
    this.idInterval = setInterval(() => {
      this.send(0, "ping");
    }, 5000)

    this.on(WSTransportEvents.Close, () => {
      clearInterval(this.idInterval);
    })
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.send("0", "get old");
      this.emit(WSTransportEvents.Connected)
    });
    socket.addEventListener('close', () => {
      this.emit(WSTransportEvents.Close)
    });

    socket.addEventListener('error', (e) => {
      this.emit(WSTransportEvents.Error, e)
    });

    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);
      if (!data?.content?.type && data.type === "message") {
        this.emit(WSTransportEvents.Message, data);
      }

    });
  }
}





