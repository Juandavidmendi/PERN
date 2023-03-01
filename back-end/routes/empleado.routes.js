module.exports = app => {
    const empleado = require("../controllers/empleado.controller");

    var router = require("express").Router();

    //recibir todos los tutoriales
    router.get("/", empleado.buscaTodosLosEmpleados);
    router.post("/", empleado.crearEmpleado);
    router.put("/:id", empleado.actualizarEmpleado);

    app.use('/api/empleados', router);
};