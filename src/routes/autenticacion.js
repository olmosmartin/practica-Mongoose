const express = require('express');
const router = express.Router();
const Usuario = require('../modelo/Usuario.js')
const passport = require('passport');


router.get('/usuario/loguearse',(req, res)=>{
    res.render('usuario/loguearse.ejs', {errors: []});
})

/*
router.post('/usuario/loguearse', async(req, res)=>{
    const {email, contraseña} = req.body;
    console.log(req.body);
})
*/

router.post('/usuario/loguearse',passport.authenticate('local', {
    successRedirect:'/notas/notas',
    failureRedirect:'/usuario/loguearse',
    failureFlash: true
}));


router.get('/usuario/registrarse',(req, res)=>{

    res.render('usuario/registrarse.ejs', {errors: [], email:"", contraseña:"", rcontraseña:""});
})

router.post('/usuario/registrarse', async(req, res)=>{
    const {email, contraseña, rcontraseña} = req.body;
    const errors=[];
    console.log(req.body);
    if (contraseña!==rcontraseña){
        errors.push({text:'Las contraseñas no coinciden'});
    }
    if(contraseña.length<4){
        errors.push({text:'Contraseña demasiado corta'});
    }
    if(errors.length > 0){
        console.log('Hay errores')
        res.render('usuario/registrarse.ejs', {errors: errors, email:email, contraseña:contraseña, rcontraseña:rcontraseña});
    }else{
        const usuarioEmail = await Usuario.findOne({email:email});
        if(usuarioEmail){
            req.flash('error_msg','El email está en uso')
            res.redirect('/usuario/registrarse');
        }else{
            const nuevoUsuario = new Usuario({email, contraseña});
            nuevoUsuario.contraseña = await nuevoUsuario.encriptarContraseña(contraseña)
            await nuevoUsuario.save();
            req.flash('success_msg','Usuario agregada satisfactoriamente')
            res.redirect('/usuario/loguearse');
        }
    }
})

module.exports=router