const express = require('express');
const router = express.Router();

router.get('/notas/agregar',(req, res)=>{
    res.render('notas/agregar.ejs', {errors: [], titulo:"", descripcion:""});
})

router.post('/notas/nuevanota',(req, res)=>{
    //console.log(req.body);
    const {titulo, descripcion} = req.body;
    const errors=[];
    if(!titulo){
        errors.push({text:"ingrese titulo"})
    }
    if(!descripcion){
        errors.push({text:"ingrese descripcion"})
    }
    if(errors.length > 0){
        console.log('errores')
        res.render('notas/agregar.ejs', {errors: errors, titulo:titulo, descripcion:descripcion});
    }else{
        res.send('ok')
    }
})

router.get('/notas',(req, res)=>{
    res.send("notas");
})

module.exports=router