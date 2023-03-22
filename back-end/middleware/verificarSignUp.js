/* verificar que no este duplicado el nombre de usuario o email
*verificar si roles en la solicitud existe o no
*/

const db = require("../models");
const ROLES =db.ROLES;
const Empleado = db.empleado;

revisarUsuarioOEmailDuplicado = (req, res, next) => {
    Empleado.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(empleado => {
        if(empleado){
            res.status(400).send({
                message: `El nombre de usuario ya esta en uso!`
            });
            return;
        }

        //email
        Empleado.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(empleado =>{
            if(empleado){
                res.status(400).send({
                    message: `El correo electronico ya esta en uso!`
                });
                return;
            }

            next();
        });  
    });
};

revisarExistenciaDeRoles = (req, res, next) => {
    if(req.body.roles){
        // for(let i = 0; i < req.body.roles.length; i++){
            // if(!ROLES.includes(req.body.roles[i])){
            if(!ROLES.includes(req.body.roles)){
                res.status(400).send({
                    message: `Error, el rol ${req.body.roles} no existe`
                });
                return;
            }
        // }
    }

    next();
};


const verificarSignUp = {
    revisarUsuarioOEmailDuplicado: revisarUsuarioOEmailDuplicado,
    revisarExistenciaDeRoles: revisarExistenciaDeRoles
};

module.exports = verificarSignUp;


