import { closeScreen, openScreen } from "../util/openScreen.js";

let screenAlert = document.querySelector(".screen:has(.alert-box)")

function sendAlert(msg){
  openScreen(screenAlert)
  let alertMsg = document.querySelector(".alert-msg")
  alertMsg.innerHTML = msg;
}

export function validateBody(){
  let bodyMsg = document.querySelector("#msg-body").textContent
  
  if (bodyMsg.trim() === '') { 
    sendAlert("No pudes enviar un mensage sin cuerpo"); 
    return false;
  }
  
  return true;
}

export function getMsgInfo(){
    let title = document.querySelector("#msg-title").value
    let bodyMsg = document.querySelector("#msg-body").innerText
    let sesNum = document.querySelector(".ses-num").dataset.ses
    
    let msg = {
      title: title,
      message: bodyMsg,
      ses: sesNum,
      author: ""
    }
    
    
  return msg;    
}

function getMsgID(msg_elm){
  return msg_elm.dataset.id
}

export function removeMsg(id){
  let msg = document.querySelector(`.msg-box[data-id="${id}"`)
  msg.remove()
}

export function removeAllMsg(){
   let msgs = document.querySelectorAll(".msg-box")
   msgs.forEach(msg => msg.remove())
}

export function collectMsgSelectedIDs(){
  
  let msgs = document.querySelectorAll(".selected")
  let ids = []
  
  msgs.forEach(msg => {
    ids.push(getMsgID(msg))
  })
  
  return ids
}


export function cleanMsgInfo(){
  document.querySelector("#msg-title").value = ""
  document.querySelector("#msg-body").textContent = ""
}


export function warnEvent(txt){
  let warnInfo = document.querySelector(".warn-event")
  let span = warnInfo.querySelector("span")
  
  warnInfo.classList.add("down")
  span.innerText = txt
  
  setTimeout(()=>{
    warnInfo.classList.remove("down")
  }, 4500)
  
}


export let observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		entry.target.classList.toggle('show', entry.isIntersecting)
		if(entry.isIntersecting) observer.unobserve(entry.target)
	})
}, {
	threshold: 0.7
});


let msgs = document.querySelectorAll(".msg-box")
for (let msg of msgs) observer.observe(msg);