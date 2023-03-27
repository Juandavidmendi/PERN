const { authJwt } = require("../middleware"); // traiga el controlador de seguridad, con las funciones para validar tokens
const tutorial = require("../controllers/tutorial.controller");
var router = require("express").Router();

module.exports = app => {

    //crear nuevo tutorial
    router.post("/", [authJwt.verificarToken], tutorial.create);

    //recibir todos los tutoriales
    router.get("/", [authJwt.verificarToken], tutorial.findAll);

    //Recibir todos los tutoriales publicados
    router.get("/published", [authJwt.verificarToken], tutorial.findAllPublished);
    
    //recibir un tutorial por id
    router.get("/:id", [authJwt.verificarToken], tutorial.findOne);

    //actualizar un tutorial con id
    router.put("/:id", [authJwt.verificarToken], tutorial.update);
    
    //eliminar un tutorial con id
    router.delete("/:id", [authJwt.verificarToken],tutorial.delete);
    
    //eliminar todos los tutoriales
    router.delete("/", [authJwt.verificarToken], tutorial.deleteAll);

    app.use('/api/tutorials', router);
};