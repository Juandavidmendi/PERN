//  crear variable con los datos de la conexion, archivo de conexion
 const dbConfig = require("../config/db.config");

 //importar sequelize 
 const Sequelize = require("sequelize");
//  instanciar sequelize y pasarle los datos de la conexion a la base de datos
 const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        mas: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    //ocultar o mostrar el log de las consultas
    logging: process.env.NODE_ENV != 'production' ? false : console.log,
 });

 //validar el estado de conexion mediante sequalize
//  sequelize.authenticate()
//  .then(() => {
//    console.log('Conectado')
//  })
//  .catch(err => {
//    console.log('No se conecto')
//  })

// inicializamos la constante db como un array vacio
const db = {};

//llenamos el array db de la siguiente manera
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//tambien llenamos el array db con el modelo de tutoriales
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.empleados = require("./empleado.model")(sequelize, Sequelize);


module.exports = db;
