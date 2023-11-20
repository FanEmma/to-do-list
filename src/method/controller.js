class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.handleListButtonEvent = this.handleListButtonEvent.bind(this);
    this.listModified = this.listModified.bind(this);

    /** 訂閱：listButtonEvent 和 listModifiedEvent 兩個事件會在 View 和 Model 發生變化時通知 Controller */
    view.listButtonEvent.subscribe(this.handleListButtonEvent);
    model.listModifiedEvent.subscribe(this.listModified);

    this.buttonActions = {
      add: (input) => this.model.addItem(new TodoItem(input)),
      remove: (id) => this.model.removeItem(id),
      complete: (id) => this.model.completeItem(id),
      edit: (id, input) => this.model.showEditItem(id, input),
      allList: () => this.model.showAll(),
      activeList: () => this.model.showActive(),
      completeList: () => this.model.showComplete(),
      clear: () => this.model.clear(),
      clearAll: () => this.model.clearAll(),
      listModifiedUnsubscribe: () => this.listModifiedEventUnsubscribe(),
    };
  }

  /** 取消訂閱： model.listModifiedEvent 事件發生變化時將不再通知 Controller */
  listModifiedEventUnsubscribe() {
    model.listModifiedEvent.unsubscribe(this.listModified);
  }

  /** 處理按鈕事件及要傳入的資料 */
  handleListButtonEvent(e, input) {
    let id = e.id;
    const action = this.buttonActions[e.name];
    if (input === '') {
      alert('請輸入文字');
      return;
    }
    action && e.name === 'edit' && action(id, input);
    action && e.name !== 'edit' && action(input || id);
  }

  /** 已最新的清單狀態更新視圖 */
  listModified(list) {
    this.view.render(list);
  }
}
