import { closeScreen, openScreen } from "./openScreen.js";
import { hideControls } from "./hideControls.js";

 let screenSelect = document.querySelector(".screen.select")
 
export function openSelectMode(){
  openScreen(screenSelect) 
  countSelects()
  showCount()
  showSelectBtn();
  hideControls();
}

export function closeSelectMode(){
 
  
  closeScreen(screenSelect)
  hideCount()
  hideSelectBtns();
  desSelectedAll();
  countSelects()
  
}

function showCount(){
  let countSel = document.querySelector(".selected-count")
  countSel.classList.add("down")
}

function hideCount(){
  let countSel = document.querySelector(".selected-count")
  countSel.classList.remove("down")
}


function showSelectBtn(){
   let all_btn = document.querySelectorAll(".select-btn")
   all_btn.forEach(elm => {
    elm.classList.add("active")
   })
}

function hideSelectBtns(){
   let all_btn = document.querySelectorAll(".select-btn")
   all_btn.forEach(elm => {
    elm.classList.remove("active")
   })
   
}


export function selectBtnFunc(event){
  let btnTarget = event.target;
  let msgBox = btnTarget.parentElement;
  
  if(msgBox.classList.contains("selected")){
    msgBox.classList.remove("selected")
    countSelects()
    return
  }
  
  msgBox.classList.add("selected")
  countSelects()
}

export function countSelectsNum(){
  let counts = document.querySelectorAll(".selected")
  return counts.length
}

function countSelects(){
  let countText = document.querySelector(".selected-count span")
  countText.innerHTML = countSelectsNum()
}


export function desSelectedAll(){
  let all_selecteds = document.querySelectorAll(".selected")
  all_selecteds.forEach(elm => {
    elm.classList.remove("selected")
  })
}

export function selectAll(){
  let msgs = document.querySelectorAll(".msg-box")
  for(let msg of msgs){
    msg.classList.add("selected")
  }
  countSelects()
}


