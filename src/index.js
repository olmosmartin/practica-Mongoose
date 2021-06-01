const express = require('express')
const path = require('path')

const app = express()

//variables globales-----------------------------------------

//SETTINGS--------------------------------------------------------
app.set('port', process.env.PORT || 3000)
app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')

//MIDDLEWARES------------------------------------------

//ROUTES-----------------------------------------------
app.use(require('./routes/index_routes.js'))

//STATIC-FILES-----------------------------------------
//esta linea hace q public sea publico al navegador y cualquier archivo de public
//va a poder ser accedido desde el navegador

//inicio el server-------------------------------------
app.listen(app.get('port'),()=>{
    console.log('escuchando el puerto', app.get('port'))
})