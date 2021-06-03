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
        console.log('Hay errores en notas')
        res.render('notas/agregar.ejs', {errors: errors, titulo:titulo, descripcion:descripcion});
    }else{
        const nuevaNota = new Nota({titulo, descripcion});
        await nuevaNota.save();
        req.flash('success_msg','Nota agregada satisfactoriamente')
        res.redirect('/notas/notas')
    }
})

router.get('/notas/notas',async(req, res)=>{
    const notas=await Nota.find().sort({date:'desc'});
    res.render('notas/notas.ejs', {notas: notas});
})

router.get('/notas/editar/:id',async(req, res)=>{
    const id = req.params.id;
    const n = await Nota.findById(id);
    res.render('notas/editar.ejs', {nota: n});
})

router.put('/notas/editarNota/:id',async(req, res)=>{
    const {titulo, descripcion}=req.body;
    await Nota.findByIdAndUpdate(req.params.id,{titulo, descripcion});
    req.flash('success_msg','Nota actualizada satisfactoriamente')
    res.redirect('/notas/notas');
})

router.delete('/notas/eliminar/:id',async(req, res)=>{
    const id = req.params.id;
    await Nota.findByIdAndDelete(id);
    req.flash('success_msg','Nota eliminada satisfactoriamente')
    res.redirect('/notas/notas', );
})

module.exports=router