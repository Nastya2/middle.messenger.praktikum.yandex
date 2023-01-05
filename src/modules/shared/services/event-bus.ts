type Tcallback = (...args: unknown[]) => void;

export class EventBus {
    private listeners: {[key: string]: Array<Tcallback>} = {};
 
    public on(event: string, callback: Tcallback): Tcallback | undefined{
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);

        return this.listeners[event].find((clb) => clb === callback);

    }

    public off(event: string, callback: Tcallback | undefined) {
        if (!this.listeners[event]) {
            return;
        }

        if(callback) {
            this.listeners[event] = this.listeners[event].filter((listener) => {
                return listener !== callback;
            });
        }
    }

    public emit(event: string, ...args:unknown[]) {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event].forEach(listener => {
            listener(...args);
        });
    }
}