const express = require('express');
const router = express.Router();

const Nota=require('../modelo/Nota.js')

router.get('/notas/agregar',(req, res)=>{
    res.render('notas/agregar.ejs', {errors: [], titulo:"", descripcion:""});
})

router.post('/notas/nuevanota', async(req, res)=>{
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
        const nuevaNota = new Nota({titulo, descripcion});
        await nuevaNota.save();
        res.redirect('/notas')
        /*res.send('ok');*/
    }
})

router.get('/notas',(req, res)=>{
    res.send("notas");
})

module.exports=router