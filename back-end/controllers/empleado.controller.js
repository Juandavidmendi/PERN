//traigame el array db llenado en modelos
const db = require('../models');
const Empleado = db.empleado;
const Op = db.Sequelize.Op;

//crear nuevo empleado
exports.crearEmpleado = (req, res) => {
    if(!req.body.nombre){
        res.status(400).send({
            message: "El nombre no puede ir vacio"
        });
        return;
    }
    
    //crear un objeto llamado usuario con todos los datos que vengan del front
    const empleado = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        documento: req.body.documento,
        fechaNacimiento: req.body.fechaNacimiento,
        estado: req.body.estado
    };

    //guardar empleado  en la base de datos
    Empleado.create(empleado)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Algo ha salidado mal mientras se creaba el empleado."
            });
        });
}

//busca todos los empleados
exports.buscaTodosLosEmpleados = (req, res) => {
    const nombre = req.query.nombre;
    //aqui dice si existe la condicion (like SQL) tomelo sino va a ser null
    var condition = nombre ? { title: { [Op.iLike]: `%${nombre}` } } : null;

    Empleado.findAll({ where : condition})
        .then(data => {
            res.send (data);
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || 'Algo ha ocurrido mientras se recibian los empleados.'
            });
        });
};

//funcion para buscar un empleado
exports.buscarEmpleado = (req, res) =>{
    const id = req.params.id;

    Empleado.findByPk(id)
    .then(data =>{
            if(data){
                res.send(data);
            }else{
                res.status(404).send({
                    message: `No se ha encontrado el empleado con el id ${id}`
                });
            }
        }
    )
    .catch(err =>{
        res.status(500).send({
            message: `Error al buscar el empleado con el id ${id}`
        });
    });
}
//actualizar empleado
exports.actualizarEmpleado = (req, res) => {
    const id = req.params.id;

    Empleado.update(req.body, {
        where: { id:id } 
    })
    //manejar respuesta
    .then(num => {

        if(num == 1){
            res.send({
                message: "El empleado ha sido actualizado correctamente."
            });
        }else{
            res.send({
                message: `No se puedo actualizar el empleado con id=${id}. ¡Tal vez no se encontró el empleado o req.body está vacío! `
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al actualizar el empleado con el id=" +id
        });
    });
}

exports.allAccess = (req, res) => {
    res.status(200).send("Contenido publico");
};

// exports.asesorBoard = (req, res) => {
//     res.status(200).send("Contenido asesor");
// };

// exports.adminBoard = (req, res) => {
//     res.status(200).send("Contenido admin");
// };

// exports.coordinadorBoard = (req, res) => {
//     res.status(200).send("Contenido coordinador");
// };

