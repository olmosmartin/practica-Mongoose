const express = require('express');
const router = express.Router();

router.get('/usuario/loguearse',(req, res)=>{
    res.render('usuario/loguearse.ejs', {datos: 'loguearse'});
})

router.get('/usuario/registrarse',(req, res)=>{
    res.render('usuario/registrarse.ejs', {datos: 'registrarse'});
})

module.exports=router