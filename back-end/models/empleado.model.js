//este modulo recibe los parametros de la conexion(sequelize) y el llamado a la libreria Sequelize
module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define("empleado", {
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
           type: Sequelize.STRING
        },
        documento: {
            type: Sequelize.STRING
        },
        fechaNacimiento: {
            type: Sequelize.DATE
        },
        estado: {
            type: Sequelize.BOOLEAN
        }
    });

    return Empleado; 
}

