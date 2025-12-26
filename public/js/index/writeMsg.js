import { counter } from "../util/counter.js";
import { openScreen, closeScreen } from "../util/openScreen.js";
import { showControls, hideControls } from "../util/hideControls.js";
import { validateBody, getMsgInfo, cleanMsgInfo } from "./manageMsg.js";
import {sendMsg } from "./ioEvents.js";


// close textWriter when you click the screen outside de editor
let insertScreen = document.querySelector('.screen:has(.insert-box)');
insertScreen.addEventListener('click', e => {
  if(e.target === e.currentTarget){
    closeScreen(insertScreen)
    showControls()
  }
})

let msgBody = document.getElementById("msg-body")
msgBody.addEventListener('paste', (e) => {
  e.preventDefault();
  
  const text = e.clipboardData.getData('text/plain');
  
  // Convertir saltos de línea a <br>
  const textWithBreaks = text.replace(/\n/g, '<br>');
  document.execCommand('insertHTML', false, textWithBreaks);
});

// btn for open write screen

let btn_write = document.querySelector(".write")
let mousedown;
let timer;



btn_write.addEventListener("mousedown", e =>{
  
  mousedown = true;
  e.preventDefault();
  timer = counter(()=>{}, 0.4)
})

btn_write.addEventListener("mouseup", e =>{
  e.preventDefault();
  mousedown = false;
  
  if(timer){
    timer.stop()
    openScreen(insertScreen)
    hideControls()
  } 
})

btn_write.addEventListener("mouseleave", e => {
  e.preventDefault();
  
  mousedown = false;
  
  if(timer){
    timer.stop();
    mousedown = false;
  }
})








// btn for send message
let btn_submit = document.querySelector('#submitMsg')
btn_submit.addEventListener('mousedown', e => {
  
  e.preventDefault();
  timer = counter(()=>{}, 0.4)
})


btn_submit.addEventListener('mouseup', e=>{
  e.preventDefault();
  
  if(timer){
    timer.stop()
  } 
  
  if(timer.gettime() < 0.3){
    if(!validateBody()){return}
    let msg = getMsgInfo();
    sendMsg(msg);
    cleanMsgInfo()
    closeScreen(insertScreen)
    showControls()
  }
})


//alert screen
let screenAlert = document.querySelector(".screen:has(.alert-box)")
screenAlert.addEventListener('click', e => { closeScreen(screenAlert)})
