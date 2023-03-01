//traigame el array db llenado en modelos
const db = require('../models');
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

//crear y guardar un nuevo tutorial
exports.create = (req, res) => {
    //validar la peticion o request 
    if(!req.body.title){
        res.status(400).send({
            message: "El contenido no puede ir vacio"
        });
        return ;
    }
    //crear un objeto del tutorial con los datos que vengan del front (postman)
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    //guardar tutorial en la base de datos
    Tutorial.create(tutorial)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Algo ha ocurrido mientras se creaba el tutorial."
        });
    });
};

// consulta Read busca todos
exports.findAll = (req, res) => {
    const title = req.query.title;
    //aqui dice si existe la condicion (like SQL) tomelo sino va a ser null
    var condition = title ? { title: { [Op.iLike]: `%${title}` } } : null;

    Tutorial.findAll({ where : condition})
        .then(data => {
            res.send (data);
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || 'Algo ha ocurrido mientras se recibian los tutoriales.'
            });
        });
};

// buscar tutorial por ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    
    Tutorial.findByPk(id)
        .then(data => {
            if(data){
                //entregue los datos
                res.send(data);
            }else{
                res.status(404).send({
                    message: `No se encontro tutorial con id=${id}.`
                });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al buscar tutorial con id=" +id
            });
        });
};

//actualizar un tutorial por id
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: { id:id }
    })
    //respuesta de la anterior consulta
    .then(num =>{
        if(num == 1){
            res.send({
                message: "El tutorial ha sido actualizado correctamente."
            });
        }else{
            res.send({
                message: `No se puede actualizar Tutorial con id=${id}. ¡Tal vez no se encontró el tutorial o req.body está vacío!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al actualizar tutorial con id=" +id
        });
    });
};

//borrar tutorial con id especificado en la req (solicitud)
exports.delete = (req, res) => {
    const id = req.params.id;
    
    Tutorial.destroy({
        where: { id: id }
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "El tutorial ha sido eliminado satisfactoriamente"
            });
        }else{
            res.send({
                message: `No se pudo eliminar el tutorial cobn id=${id}. Tal vez el tutorial no se encontro el tutorial `
            });
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "Error al eliminar tutorial con id=" +id
        });
    });
}

//borrar todos los tutoriales de la tabla
exports.deleteAll = (req, res) =>{
    // se instancia el modelo Tutorial y mediante sequalize se usa la funcion destroy 
    Tutorial.destroy({
        where: {},
        truncate: false
    })
    .then(num => {
        res.send({ 
            message: `${num} Lo tutoriales han sido eliminados satisfactoriamente`
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "algo ha ocurrido mientras se removian todos los tutoriales." 
        });
    });
};

// buscar todos los tutoriales publicados o sea por estado publicado
exports.findAllPublished = (req, res) =>{
    Tutorial.findAll({ where: {published: true } })
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Algo ha ocurrido mientras se recibian los tutoriales."
        });
    });
};