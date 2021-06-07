const express = require('express');
const router = express.Router();

const Nota=require('../modelo/Nota.js')
const {isAuthenticated}= require('../funciones/auth.js')

router.get('/notas/agregar',isAuthenticated,(req, res)=>{
    res.render('notas/agregar.ejs', {errors: [], titulo:"", descripcion:""});
})

router.post('/notas/nuevanota',isAuthenticated , async(req, res)=>{
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
        nuevaNota.usuario = req.user.id;
        await nuevaNota.save();
        req.flash('success_msg','Nota agregada satisfactoriamente')
        res.redirect('/notas/notas')
    }
})

router.get('/notas/notas',isAuthenticated ,async(req, res)=>{
    const notas=await Nota.find({usuario: req.user.id}).sort({date:'desc'});
    res.render('notas/notas.ejs', {notas: notas});
})

router.get('/notas/editar/:id',isAuthenticated,async(req, res)=>{
    const id = req.params.id;
    const n = await Nota.findById(id);
    res.render('notas/editar.ejs', {nota: n});
})

router.put('/notas/editarNota/:id',isAuthenticated,async(req, res)=>{
    const {titulo, descripcion}=req.body;
    await Nota.findByIdAndUpdate(req.params.id,{titulo, descripcion});
    req.flash('success_msg','Nota actualizada satisfactoriamente')
    res.redirect('/notas/notas');
})

router.delete('/notas/eliminar/:id',isAuthenticated,async(req, res)=>{
    const id = req.params.id;
    await Nota.findByIdAndDelete(id);
    req.flash('success_msg','Nota eliminada satisfactoriamente')
    res.redirect('/notas/notas', );
})

module.exports=router