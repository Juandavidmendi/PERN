const { authJwt } = require("../middleware"); // traiga el controlador de seguridad, con las funciones para validar tokens
const empleado = require("../controllers/empleado.controller");
var router = require("express").Router();
module.exports = app => {
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin. Content-Type, Accept"
        );
        next();
    });
    //recibir todos los tutoriales
    router.get("/", [authJwt.verificarToken],  empleado.buscaTodosLosEmpleados);
    //recibir un empleado por id
    router.get("/:id", [authJwt.verificarToken], empleado.buscarEmpleado);
    router.post("/", [authJwt.verificarToken], empleado.crearEmpleado);
    router.put("/:id",[authJwt.verificarToken], empleado.actualizarEmpleado);

    app.use('/api/empleados', router);
};

//rutas de ejemplo con autenticacion de token
// module.exports = function(app) {
//     app.use(function(req, res, next) {
//       res.header(
//         "Access-Control-Allow-Headers",
//         "x-access-token, Origin, Content-Type, Accept"
//       );
//       next();
//     });
  
//     app.get("/api/test/all", controller.allAccess);
  
//     app.get(
//       "/api/test/user",
//       [authJwt.verifyToken],
//       controller.userBoard
//     );
  
//     app.get(
//       "/api/test/mod",
//       [authJwt.verifyToken, authJwt.isModerator],
//       controller.moderatorBoard
//     );
  
//     app.get(
//       "/api/test/admin",
//       [authJwt.verifyToken, authJwt.isAdmin],
//       controller.adminBoard
//     );
//   };