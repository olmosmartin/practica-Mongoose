const express = require('express');
const router = express.Router();

const Usuario = require('../modelo/Usuario.js')


router.get('/usuario/loguearse',(req, res)=>{
    res.render('usuario/loguearse.ejs', {datos:"loguearse"});
})

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