const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')
const {Schema} = mongoose;

const UsuarioSchema = new Schema({
    email: {type:String, required:true},
    contraseña: {type:String, required:true},
    fecha: {type:Date, default:Date.now}
});

UsuarioSchema.methods.encriptarContraseña = async (contraseña) => {
    const salt = await bcryptjs.genSalt(10);
    const hash = bcryptjs.hash(contraseña, salt);
    return hash;
};

UsuarioSchema.methods.esContraseñaIgual = async function (contraseña){
    return await bcryptjs.compare(contraseña, this.contraseña);
}

//primero le paso el nombre y despues el eschema
module.exports=mongoose.model('Usuario',UsuarioSchema)