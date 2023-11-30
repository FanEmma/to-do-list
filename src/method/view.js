class View {
  constructor() {
    // 確保 handleEvent 使用的 this 為 constructor
    let that = this;
    this.listButtonEvent = new Observable(this);

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

  tagsRender(list, filter) {
    // 分類按鈕
    let tagButtons = document.querySelectorAll('.tags .tag');

    // 篩選數量
    let allListNum = list.length;
    let activeListNum = list.filter((listItem) => {
      return listItem.isActive;
    }).length;
    let completeListNum = list.filter((listItem) => {
      return !listItem.isActive;
    }).length;

    // 組成物件
    let numObj = {
      all: `全部事項 ${allListNum}`,
      active: `待辦事項 ${activeListNum}`,
      complete: `完成事項 ${completeListNum}`,
    };

    // 樣式改動
    tagButtons.forEach((item) => {
      this.setTagStyle(item, filter === item.id);
      this.setTagText(item, numObj[item.id]);
    });
  }

  // 篩選按鈕選中樣式
  setTagStyle(button, isSelected) {
    button.classList.toggle('selected', isSelected);
  }

  // 篩選按鈕文字
  setTagText(button, numText) {
    button.innerHTML = numText;
  }
}
