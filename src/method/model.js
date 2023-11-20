class Model {
  constructor() {
    this.list = [];
    this.listModifiedEvent = new Observable(this);
  }

  /** 增加待辦事項 */
  addItem(item) {
    this.list.push(item);
    this.listModifiedEvent.notify(this.list);
  }

  /** 刪除待辦事項 */
  removeItem(id) {
    this.list.splice(id, 1);
    this.listModifiedEvent.notify(this.list);
  }

  /** 完成項目 */
  completeItem(id) {
    const item = this.list[id];
    item.isActive = !item.isActive;
    this.listModifiedEvent.notify(this.list);
  }

  /** 顯示編輯狀態項目 */
  showEditItem(id, input) {
    const item = this.list[id];
    if (item.isActive) {
      if (item.isEdit) {
        item.item = input;
      }
      item.isEdit = !item.isEdit;
    }
    this.listModifiedEvent.notify(this.list);
  }

  saveEditItem(id) {}

  /** 顯示全部事項 */
  showAll() {
    this.list.forEach((item) => {
      item.visible = true;
    });
    this.listModifiedEvent.notify(this.list);
  }

  /** 顯示待辦事項 */
  showActive() {
    this.list.forEach((item) => {
      item.visible = item.isActive;
    });
    this.listModifiedEvent.notify(this.list);
  }

  /** 顯示完成事項 */
  showComplete() {
    this.list.forEach((item) => {
      item.visible = !item.isActive;
    });
    this.listModifiedEvent.notify(this.list);
  }

  /** 清除完成事項 */
  clear() {
    this.list = this.list.filter((item) => {
      return item.isActive;
    });
    this.listModifiedEvent.notify(this.list);
  }

  /** 清除所有事項 */
  clearAll() {
    this.list = [];
    this.listModifiedEvent.notify(this.list);
  }

  /** list 資料儲存在 localStorage */
  saveToLocal() {
    localStorage.setItem('todoItemsList', JSON.stringify(this.list));
  }

  /** 取得 localStorage 中的 list 資料 */
  getFromLocal() {
    const localStore = localStorage.getItem('todoItemsList');
    if (localStore) {
      this.list = JSON.parse(localStore);
    }
  }
}
