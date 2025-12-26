import { selectBtnFunc } from "./selectMode.js";
import { observer } from "../index/manageMsg.js";

export function createMsg(msg){
  let msgBox = elm('div')
  msgBox.classList.add('msg-box')
  msgBox.classList.add('card')
  msgBox.setAttribute("data-id", msg.id)
  msgBox.setAttribute("data-ses", msg.ses)
  
  
  let msgTitle = elm('div')
  msgTitle.classList.add('msg-title')
  msgTitle.innerText = msg.title 
  
  
  let msgBody = elm('div')
  msgBody.classList.add('msg-body')
  msgBody.innerText = msg.message
  
  let delBtn = elm('div')
  delBtn.classList.add('select-btn')
  delBtn.addEventListener('click', (e) => selectBtnFunc(e))
  
  let innerCircle = elm('div')
  innerCircle.classList.add("inner")
  
  
  delBtn.appendChild(innerCircle)
  
  msgBox.appendChild(msgTitle)
  msgBox.appendChild(msgBody)
  msgBox.appendChild(delBtn)
  
  observer.observe(msgBox)
  document.querySelector('.msg-container').appendChild(msgBox)
  
  
  return msgBox
}

export function elm(e) {
    return document.createElement(`${e}`)
}

export function createManyMsg(msgs){
  for(let msg of msgs){
    createMsg(msg)
  }
}
