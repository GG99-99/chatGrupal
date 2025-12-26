import { closeScreen} from "../util/openScreen.js";
import {removeMsg} from "./trashMsg.js"


let summitBtn = document.querySelector("#submitMasterKey")
let getKeyScreen = document.querySelector(".screen.getKey")
let key = document.querySelector("#masterKey")
let badtxt = getKeyScreen.querySelector(".input-wrapper p")



getKeyScreen.addEventListener('click', e => {
  if(e.target === e.currentTarget){
    closeScreen(getKeyScreen)
    cleanInputGetKey()
  }
})


summitBtn.addEventListener('click',async (e) => {
 
  
  try{ await fetchMasterKey(key.value) }
  catch (error) { console.error('Error:', error) }
  
})

async function fetchMasterKey(key){
  let accion = getKeyScreen.dataset.accion
  const response = await fetch('', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({'key': key})
  })
  
  cleanInputGetKey()
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  
  let data = await response.json()  
  if(data.iskey && accion === "r"){ 
    removeMsg()
    goodKey()
    return
  }
  
  badKey()
  
}

function cleanInputGetKey(){
  key.value = ""
}


function goodKey(){
  badtxt.style.opacity = "0"
}

function badKey(){
  badtxt.style.opacity = "1"
}