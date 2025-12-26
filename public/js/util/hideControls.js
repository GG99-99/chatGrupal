export function hideControls(){
  let controls = document.querySelector("div:has(.toolbox)")
  controls.classList.add("move")
}

export function showControls(){
  let controls = document.querySelector("div:has(.toolbox)")
  controls.classList.remove("move")
}