
export function openScreen(screen){ 
  screen.style.display = 'flex';  
}

export function closeScreen(screen){
  screen.style.display = 'none';
}

let getKeyScreen = document.querySelector(".screen.getKey")

export function openGetKeyScreen(accion, func){
  openScreen(getKeyScreen)
  getKeyScreen.dataset.accion = accion
  
}

export function closeGetKeyScreen(){
  closeScreen(getKeyScreen)
  getKeyScreen.dataset.accion = ""

}

// export function openScreenGetSes(screen, func){
//   openScreen(screen)
  
//   screen.addEventListener("keydown", e => {
//     if(e.key === 'Enter') {
//       e.preventDefaul()
//       console.log("se presiono enter")
//     }
//   })
// }



// module.exports = {openScreen, closeScreen}