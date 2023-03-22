//este modulo recibe los parametros de la conexion(sequelize) y el llamado a la libreria Sequelize
module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });

    return Role; 
}
