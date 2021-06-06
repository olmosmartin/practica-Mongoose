const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../modelo/Usuario.js')

/*passport.js es para crear y manejar las sessiones de usuario*/

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'contraseña'
//done es un callback
}, async (email,contraseña,done) => {
    const user = await Usuario.findOne({email:email});
    if(!user){
        console.log("el usuario existe");
        //el primer null es para retornar un error, null significa q no hubo error
        // y el false es para decir q no hay ningun usuario
        return done(null, false, {message:'usuario no encontrado'});
    } else {
        const contraseñaIgual = await user.esContraseñaIgual(contraseña);
        if(contraseñaIgual){
            return done(null, user);
        } else {
            return done(null, false, {message:'contraseña incorrecta'});
        }
    }
}));

//guarda el id del usuario en una session
passport.serializeUser( (user, done) =>{
    done (null, user.id);
});

//toma un id y genera un usuario
passport.deserializeUser( (id, done) =>{
    Usuario.findById(id, (err, user)=>{
        done(err, user);
    });
});