const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{
    res.render('index.ejs', {datos: 'index'});
})

router.get('/about',(req, res)=>{
    res.render('about.ejs', {datos: 'about'});
})

module.exports=router