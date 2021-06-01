const mongoose = require('mongoose');
const {Schema} = mongoose;

const NoteSchema = new Schema({
    titulo: {type:String, required:true},
    descripcion: {type:String, required:true},
    fecha: {type:Date, default:Date.now}
});

//primero le paso el nombre y despues el eschema
module.exports=mongoose.model('Nota',NoteSchema)