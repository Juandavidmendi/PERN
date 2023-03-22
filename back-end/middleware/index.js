const authJwt = require("../middleware/authJwt");
const verificarSignUp = require("../middleware/verificarSignUp");

module.exports = {
    authJwt,
    verificarSignUp
}