let model = new Model();
let view = new View();
let controller = new Controller(model, view);

/** 當整個網頁載入完成時 */
window.addEventListener('load', () => {
  model.getFromLocal();
  model.showAll();
});

/** 即將離開或重新整理網頁時觸發 */
window.addEventListener('beforeunload', () => {
  model.saveToLocal();
});
