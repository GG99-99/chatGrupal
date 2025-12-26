import { io } from '../cdn/socket.io.esm.min.js';
import { createMsg, createManyMsg } from '../util/createMsg.js';
import { removeMsg, removeAllMsg, warnEvent } from './manageMsg.js'
import { replaceSes, getSes } from './upSes.js';

let socket = io();

export function sendMsg(msg){
  socket.emit('new', msg)
} 

export function removeMsgs(msgs_IDs){
  socket.emit('inactive', msgs_IDs)
}


// for manage the sessions

export function moveSes(sesNum){
  socket.emit('move-ses', sesNum)
}





// handler the events from the server

socket.on('new', msg =>{
  if (msg.ses == getSes()) {
    createMsg(msg)
    warnEvent("Se agrego un mensaje a esta sesión")
  }
})

socket.on('inactive', msgs => {
  
  let count = 0;
  msgs.forEach(msg=> {
    if (msg.ses == getSes()) {
      removeMsg(msg.id)
      count++
    }
  })
  
  if (count > 0) warnEvent(`Se eliminaron ${count} mensajes de esta sesión`);
})

socket.on("move-ses", res => {
  removeAllMsg()
  
  if(res.ok){
    createManyMsg(res.msgs)
  }
   replaceSes(res.ses)
})

