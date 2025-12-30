let path = require('path');
const bcrypt = require("bcrypt");
const Database = require('better-sqlite3');
const db = new Database(path.join(__dirname, "..", "db", "message.db"));

const createTableKey = `
  CREATE TABLE Key (
      id integer primary key,
      key string not null);`;

// db.exec(createTableKey)
// 
// const masterKey = bcrypt.hashSync("1234", 10)
// const insertKey = db.prepare("insert into Key (key) values (@key)")
// insertKey.run({key: masterKey})


const createTable = `CREATE TABLE message (
    id integer primary key,
    message string not null,
    author string,
    title text,
    date DATE DEFAULT (date('now')),
    ses int default 1);`


// for db Key 
const selectAllKey = db.prepare("select * from Key")

// for db message
const insert = db.prepare("insert into message (title, author, message, ses) values (@title, @author, @message, @ses)")
const selectAll = db.prepare("select * from message where DATE(date) = date('now', '-4 hours') AND active = 1 AND ses = 1")
const selectAll2 = db.prepare("select * from message where active = 1 AND ses = 1")
const inactiveState = db.prepare("UPDATE message SET active = 0 WHERE id = @id")
const selectAllbySes = db.prepare("select * from message where DATE(date) = date('now', '-4 hours') AND active = 1 AND ses = @ses")
const selectById = db.prepare("SELECT * FROM message WHERE id = ?");


 class dbOperator{
   
   static insert(msg){
     let added = insert.run({ title: msg.title, author: msg.author, message:  msg.message, ses: msg.ses });
     return selectById.get(added.lastInsertRowid);
     
   }
   
   static getMessages(){
     return selectAll.all().reverse()
     
   }
   
   static getMessagesBySes(ses){
     return selectAllbySes.all({ses: ses})
     
   }
   
   static removeMsg(IDs){
     let msgs = []
     IDs.forEach( ID => {
       msgs.push(selectById.get(ID))
       inactiveState.run({id: ID})
     })
     
     
     
     return msgs
   }
   
   static async validateKey(key){
     let keys = selectAllKey.all()
     
     for(const keyDB of keys){
       const isKey = await bcrypt.compare(key, keyDB.key)
       if (isKey) return true;
     }
     
     return false;
   }
   
   
 }
 
 
 
 module.exports = {dbOperator}