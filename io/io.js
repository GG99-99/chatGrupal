const path = require('path')
const { Server, Socket } = require('socket.io')
const {dbOperator} = require(path.join(__dirname, "..", "operator", "dbOperator.js"))


const io = new Server();

io.on('connection', (socket)=>{
  
  
  socket.on("new", msg =>{
    io.emit("new", dbOperator.insert(msg)) ;
    
  })
  
  socket.on("inactive", msgs_ids =>{
    io.emit("inactive", dbOperator.removeMsg(msgs_ids))
  })
  
  
  
  socket.on("move-ses", new_ses => {
    if(new_ses > 0){
      let msgs = dbOperator.getMessagesBySes(new_ses)
      
      if (msgs.length > 0) {
        socket.emit("move-ses",
          {
            "msgs": msgs,
            "ses": new_ses,
            'ok': true
          })
        
      } else socket.emit("move-ses", { "ok": false, "ses": new_ses});
    }
  })
  

})

module.exports = {io}