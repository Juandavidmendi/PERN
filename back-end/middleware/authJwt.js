const jwt = require("jsonwebtoken");
const config = require("../config/auth.config"); //palabra secreta que solo conoce el servidor
const db = require("../models");
const Empleado = db.empleado;

verificarToken = (req, res, next) =>{
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
          message: "No se ha suministrado un token"  
        });
    }

    /*funcion propia para probar y validar las credenciales
        * pruebe el token que viene en el encabezado y la palabra secreta que solo nosotros sabemos y un callback
    */
    jwt.verify(token, config.secreto, (err, decoded) =>{
        if(err){
            return res.status(401).send({
                message: `No autorizado`
            });
        }
        req.empleadoId = decoded.id;
        next(); 
    });
};

esAdministrador = (req, res, next) =>{
    Empleado.findByPk(req.empleadoId)
    .then(empleado =>{
        empleado.getRoles()
        .then(roles =>{
            for(let i = 0; i < roles.length; i++){
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }

            //sino esta el rol enviado => Estado prohibido
            res.status(403).send({
                message: `Se necesitan permisos de Administrador`
            });
            return;
        });


    })
    .catch() 
}

esCoordinador = (req, res, next) => {
    Empleado.findByPk(req.empleadoId)
    .then(empleado => {
        empleado.getRoles()
        .then(roles =>{
            for(let i = 0; i < roles.length; i++){
                if(roles[i].name === "coordinador"){
                    next();
                    return;
                }
            }

            //sino esta el rol enviado => Estado prohibido
            res.status(403).send({
                message: `Se necesitan permisos de Coordinador`
            });
        });
    });
};

//funcion para saber si es coordi o admin?
esCoordinadorOAdministrador = (req, res, next) =>{
    Empleado.findByPk(req.empleadoId)
    .then(empleado => {
        empleado.getRoles().then(roles =>{
            for(let i = 0; i < roles.length; i++){
                if(roles[i].name === "coordinador"){
                    next();
                    return;
                }else if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }

            //sino encontro ninguno o el rol enviado Estado prohibido
            res.status(403).send({
                message: `Se necesitan permisos de Coordinador o Administrador`
            });
        });
    });
};

const authJwt = {
    verificarToken: verificarToken,
    esAdministrador: esAdministrador,
    esCoordinador: esCoordinador,
    esCoordinadorOAdministrador: esCoordinadorOAdministrador
}

module.exports = authJwt;