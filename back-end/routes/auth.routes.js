const { verificarSignUp } = require("../middleware"); //importo index de middleware
const controller = require("../controllers/auth.controller");

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // app.post(
    //     "/api/auth/signup",
    //     [
    //         verificarSignUp.revisarUsuarioOEmailDuplicado,
    //         verificarSignUp.revisarExistenciaDeRoles
    //     ],
    //     controller.signup
    // );

    app.post("/api/auth/signin",controller.signin); 
}