class View {
  constructor() {
    // 確保 handleEvent 使用的 this 為 constructor
    let that = this;
    this.listButtonEvent = new Observable(this);
    this.currentFilter = 'all';

    document.body.addEventListener('keypress', handleEvent);
    document.body.addEventListener('click', handleEvent);

    function handleEvent(event) {
      const e = event.target;
      let input = null;
      const keyupEvent = event.code === 'Enter' && e.nodeName === 'INPUT';
      const clickEvent = e.nodeName === 'BUTTON';
      const addEvent = e.name === 'add';
      const editEvent = e.name === 'edit';

      if (keyupEvent) {
        input = addEvent ? that.addInput() : null;
        that.listButtonEvent.notify(e, input);
      } else if (clickEvent) {
        input = addEvent
          ? that.addInput()
          : editEvent
          ? that.editInput(e.id)
          : null;
        that.listButtonEvent.notify(e, input);
      }
    }
  }

  addInput() {
    const inputElement = document.getElementById('input');
    const output = inputElement.value;
    // 清空 input value
    inputElement.value = '';
    return output;
  }

  editInput(id) {
    return document.getElementById(`editInput-${id}`).value;
  }

  render(list) {
    // list 項目
    let ul = document.getElementById('list');
    ul.innerHTML = '';
    list.forEach((listItem, i) => {
      if (listItem.visible) {
        let value = listItem.item;
        let li = document.createElement('li');

        li.innerHTML = `
        <li class="item">
          <button class="p-2 group/check" name="complete" id="${i}">
            <i class="fas fa-check-circle done btn-check"></i>
          </button>
          <div class="item-text">${value}</div>
          <textarea class="edit-textarea min-h-2 hidden"  id="editInput-${i}">${value}</textarea>
          <button class="p-2 group/modify" name="edit" id="${i}">
            <i class="fas fa-pen modify btn-edit"></i>
          </button>
          <button class="p-2 group/delete" name="remove" id="${i}">
            <i class="fas fa-trash delete btn-delete"></i>
          </button>
        </li>`;

        /** 完成狀態 toggle */
        if (!listItem.isActive) {
          const doneIcon = li.querySelector('.done');
          if (doneIcon) {
            doneIcon.classList.add('btn-check-done');
          }
          li.style.setProperty('text-decoration', 'line-through');
        }
        /** 編輯狀態 toggle */
        if (listItem.isEdit) {
          const textItem = li.querySelector('.item-text');
          const editItem = li.querySelector('.edit-textarea');
          textItem.classList.add('hidden');
          editItem.classList.remove('hidden');
        }

        ul.appendChild(li);
      }
    });
  }

  tagRender(list, filter) {
    // 分類按鈕文字
    let allButton = document.getElementById('all');
    let activeButton = document.getElementById('active');
    let completeButton = document.getElementById('complete');

    // 篩選列表
    let activeListNum = list.filter((listItem) => {
      return listItem.isActive;
    }).length;
    let completeListNum = list.filter((listItem) => {
      return !listItem.isActive;
    }).length;

    // 項目數量文字
    allButton.innerHTML = `全部事項 ${list.length}`;
    activeButton.innerHTML = `待辦事項 ${activeListNum}`;
    completeButton.innerHTML = `完成事項 ${completeListNum}`;

    // tag style
    this.setTagStyle(allButton, filter === 'all');
    this.setTagStyle(activeButton, filter === 'active');
    this.setTagStyle(completeButton, filter === 'complete');
  }

  // 設定按鈕樣式
  setTagStyle(button, isSelected) {
    button.classList.toggle('selected', isSelected);
  }
}
