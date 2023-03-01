module.exports = app => {
    const tutorial = require("../controllers/tutorial.controller");

    var router = require("express").Router();

    //crear nuevo tutorial
    router.post("/", tutorial.create);

    //recibir todos los tutoriales
    router.get("/", tutorial.findAll);

    //Recibir todos los tutoriales publicados
    router.get("/published", tutorial.findAllPublished);
    
    //recibir un tutorial por id
    router.get("/:id", tutorial.findOne);

    //actualizar un tutorial con id
    router.put("/:id", tutorial.update);
    
    //eliminar un tutorial con id
    router.delete("/:id", tutorial.delete);
    
    //eliminar todos los tutoriales
    router.delete("/", tutorial.deleteAll);

    app.use('/api/tutorials', router);
};