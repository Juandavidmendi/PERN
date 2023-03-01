//este modulo recibe los parametros de la conexion(sequelize) y el llamado a la libreria Sequelize
module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
        title: {
            type: Sequelize.STRING
        },
        description: {
           type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Tutorial; 
}

