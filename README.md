# to-do-list

## controller.js
---
控制器，用來處理使用者的互動與處理資料模型物件，負責改變 Model 的狀態或是改變 View 的顯示。
在此做訂閱、取消訂閱與通知動作。

## view
---
處理畫面 UI 渲染，表示應用程式中的使用者介面 ( UI ) 所要顯示的各個元件。
列表的渲染、篩選的渲染。

## model.js
---
資料的變動模組，用來表示與實作出應用程式內的各種資料物件，並且包含了商業處理邏輯。
透過 Observable 通知機制將事件傳遞給 Controller 和 View，以通知其他元件進行更新。

## mvc.js
---
網頁載入時初始化 Model、View、Controller，並在網頁即將關閉或重新整理時保存資料到本地。
處理頁面初始渲染及離開時的動作。

## observable.js
---
觀察者模式，機制定義。

## item.js
---
list item 資料定義。
