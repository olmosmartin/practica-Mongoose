const funciones={};

funciones.isAuthenticated =(req, res, next)=>{
    if(req.isAuthenticated ()){
        return next();
    }else{
        req.flash('error_msg', 'No autorizado')
        res.redirect('/usuario/loguearse');
    }
};

module.exports=funciones;