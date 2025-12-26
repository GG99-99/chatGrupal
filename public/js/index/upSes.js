import { moveSes } from "./ioEvents.js"
import { closeScreen, openScreen} from "../util/openScreen.js"

let sesNum = document.querySelector(".ses-num")
let upSesBtn = document.querySelector(".up-ses")
let downSesBtn = document.querySelector(".down-ses")

//screen get ses
let screenGetSes = document.querySelector(".screen.getSes")
let inputNewSes = screenGetSes.querySelector("#inputSes")
let btnSubmitSes = screenGetSes.querySelector("#submitNewSes")

upSesBtn.addEventListener('click', e => {
  let ses = parseInt(sesNum.dataset.ses)
  moveSes(ses+1)
})

downSesBtn.addEventListener('click', e => {
  let ses = parseInt(sesNum.dataset.ses)
  if (ses > 1) moveSes(ses-1);
  
})

// function for change the ses innerText
export function replaceSes(num){
  sesNum.dataset.ses = num;
  sesNum.innerText = num;
}

export function getSes(){
  return sesNum.dataset.ses
}

export function submitSes(){
  try {
    let ses = parseInt(inputNewSes.value)
    moveSes(ses)
    closeScreen(screenGetSes)
    inputNewSes.value = ""
  }catch (e) {}
}

// when the num will be clicked open the get new session screen
sesNum.addEventListener('click', e => {
  openScreen(screenGetSes)
})



// for close de getSes screen
screenGetSes.addEventListener("click", e => {
  if(e.target === e.currentTarget){
    closeScreen(screenGetSes)
  }
})

btnSubmitSes.addEventListener("click", e => {
  submitSes()
  
})