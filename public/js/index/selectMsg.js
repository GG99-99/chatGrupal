import { showControls } from "../util/hideControls.js";
import { selectBtnFunc, closeSelectMode, selectAll } from "../util/selectMode.js";


let screenSelect = document.querySelector(".screen.select")
screenSelect.addEventListener('click', e => {
  if(e.target === e.currentTarget){
    showControls();
    closeSelectMode()
  }
})


// btn for select
let select_btn = document.querySelectorAll(".select-btn")
select_btn.forEach(btn => {
  btn.addEventListener('click', selectBtnFunc)
})


// btn select all
let selectAllBtn = document.querySelector(".btn-select-all")
selectAllBtn.addEventListener('click', e => {
  selectAll()
})