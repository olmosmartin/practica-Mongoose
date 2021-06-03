const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

//inializaciones------------------------------------------
const app = express();
require('./config/database.js');

//SETTINGS--------------------------------------------------------
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//MIDDLEWARES------------------------------------------
app.use(express.urlencoded({extended:false})); // cuando me envien datos del form lo voy a poder entender con esto
app.use(methodOverride('_method'));//methodOverride hace que los form pueden enviar put y delete tambien
app.use(session({
    secret:'palabrasecreta',
    resave: true,
    saveUninitialized:true
}));
app.use(flash());

//variables globales-----------------------------------------
app.use((req, res, next) => {
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    next();
});

//ROUTES-----------------------------------------------
app.use(require('./routes/index_routes.js'));
app.use(require('./routes/notas.js'));
app.use(require('./routes/autenticacion.js'));
//STATIC-FILES-----------------------------------------
//esta linea hace q public sea publico al navegador y cualquier
//archivo de public va a poder ser accedido desde el navegador
app.use(express.static(path.join(__dirname,'public')));

//inicio el server-------------------------------------
app.listen(app.get('port'),()=>{
    console.log('escuchando el puerto', app.get('port'))
})