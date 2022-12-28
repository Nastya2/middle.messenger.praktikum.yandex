import { TUser, TUserAvatar } from "../profile/profile.service";
import { set } from "../utils/set";
import { EventBus } from "./services/event-bus";

export enum StoreEvent {
    Updated = "updated"
}

class Store extends EventBus {
    private state: {[user: string]: TUser & TUserAvatar} = {};
  
    public getState() {
      return this.state;
    }
  
    public set(path: string, value: unknown) {
      set(this.state, path, value);
      this.emit(StoreEvent.Updated, this.getState());
    }
}

export default new Store();