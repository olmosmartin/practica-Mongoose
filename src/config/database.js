const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notas-db',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology: true
})
.then (db => console.log('conectado a la base de datos'))
.catch(err=>console.error(err));