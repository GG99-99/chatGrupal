var express = require("express");
var router = express.Router();
const path = require("path");

let { dbOperator } = require(path.join(__dirname, "..", "operator", "dbOperator.js"));

router.route('/')
  .get(function (req, res, next) {
  res.render('index', {messages: dbOperator.getMessages(), ses: 1});
  })
  
  .post( async function(req, res){
    
    try {
      
      let key = req.body.key
      let isValid = await dbOperator.validateKey(key)
      res.json({ "iskey": isValid })
      
    }catch (error) {
        console.error('Error validating key:', error);
        res.status(500).json({ error: "Internal server error" });
      }
    
  })

module.exports = router;
