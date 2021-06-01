const express = require('express');
const router = express.Router();

router.get('/notas',(req, res)=>{
    res.send("notas");
})

module.exports=router