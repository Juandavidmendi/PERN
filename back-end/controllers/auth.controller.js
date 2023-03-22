const db = require("../models");

//palabra secreta que solo conoc eel servidor
const config = require("../config/auth.config")
const Empleado = db.empleado;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



// exports.signup =(req, res) =>{
//     //guardar usuario en la base de datps
//     Empleado.create({
//         username: req.body.username,
//         email: req.body.email,
//         password: bcrypt.hashSync(req.body.password, 8)
//     })
//     .then(user =>{
//         //si trae el rol por el cuerpo entre aqui
//         if(user){
//             Role.findAll({
//                 where: {
//                     name: req.body.roles
//                 }
//             }).then(roles =>{
//                 user.setRoles(roles)
//                 .then(() =>{
//                     res.send({
//                         message: "El usuario fue registrado de manera satisfactoria!"
//                     });
//                 });
//             });
//         }else{
//             //de lo contrario el rol va a ser = 3 asesor
//             res.send({ 
//                 message: "No se pudo guardar el usuario" 
//             });
            
//         }
//     })
//     .catch(err => {
//         res.status(500).send({ message: err.message });
//     });
// };

exports.signin = (req, res) =>{
    Empleado.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        //si no encuentra el usuario
        if(!user){
            return res.status(404).send({ message: "Usuario no encontrado."});
        }
        
        //comparar la contraseña que viene en el body, con la que se obtuvo en la consulta
        var validarPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        //si no es valida la contraseña
        if(!validarPassword){
            return res.status(401).send({
                accessToken: null,
                message: "Contraseña Invalida"
            });
        };

        var token = jwt.sign({ id: user.id }, config.secreto, {
            expiresIn: 86400 //24 Horas
        });

        //se crea un array autoridades para llenarlo con todos los roles del sistema
        var autoridades = [];
        user.getRoles().then(roles =>{
            //se llena el arreglo auroridades con los roles existentes
            for(let i = 0; i < roles.length; i++ ){
                autoridades.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: autoridades,
                acessToken: token
            });
        });
    })
    .catch(err =>{
        res.status(500).send({ message: err.message });
    });
};


