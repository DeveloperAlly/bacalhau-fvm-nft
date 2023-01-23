// class responsible for handling all the different (contract?) events
type Callback = () => void;

export class Events {
  events: { [key: string]: Function[] } = {};

  on(eventName: string, callback: Callback) {
    const eventHandlers = this.events[eventName] || [];
    eventHandlers.push(callback);
    this.events[eventName] = eventHandlers; //Function or undefined
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((callback) => {
      callback();
    });
  }
}
