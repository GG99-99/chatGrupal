import { closeScreen, openScreen, openGetKeyScreen, closeGetKeyScreen } from "../util/openScreen.js";
import { collectMsgSelectedIDs } from "./manageMsg.js";
import {removeMsgs} from "./ioEvents.js";
import { showControls,hideControls } from "../util/hideControls.js";
import { closeSelectMode, openSelectMode, countSelectsNum } from "../util/selectMode.js";



// btn erase
let btnErase = document.querySelector(".clear")
btnErase.addEventListener('click', e => { 
  
  openSelectMode()
  hideControls()
})


// btn for inactive selecteds msg 

let trashBtn = document.querySelector("#send-trash")
trashBtn.addEventListener("click", e => {
  if (countSelectsNum() > 0) openGetKeyScreen("r");
})

let screenSelect = document.querySelector(".screen.select")

export function removeMsg(){
  removeMsgs(collectMsgSelectedIDs())
  closeScreen(screenSelect)
  closeGetKeyScreen()
  showControls();
  closeSelectMode()
}

