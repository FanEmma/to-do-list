class Observable {
  /** 觀察者 */
  constructor(notifier) {
    this.notifier = notifier;
    this.observers = [];
  }

  /** 訂閱 */
  subscribe(func) {
    this.observers.push(func);
  }

  /** 通知 */
  notify(val1, val2) {
    this.observers.forEach((observer) => {
      observer.call(this.notifier, val1, val2);
    });
  }

  /** 取消訂閱 */
  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }
}
