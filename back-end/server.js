// importar las bibliotecas
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// console.log(fetch);
// inicializo las bibliotecas
const app = express();

//lista blanca de sitios que van a poder acceder a mi api
// var listaBlanca = ['http://localhost/8081'];

// var corsOptions = {
//   // origin: "http://localhost/8081"
//   origin: function(origin, callback){
//     if(listaBlanca.indexOf(origin) != -1){
//       callback(null, true);
//     }else{
//       callback(new Error('No permitido por CORS'))
//     }
//   }
// };

app.use(cors());

// analizar solicitudes de tipo de contenido - application/json
app.use(bodyParser.json());

// analiza solicitudes de tipo de contenido - application/x-www-form-urlenco
app.use(bodyParser.urlencoded( {extended: true }));


//ruta simple 
//ruta con la validacion de lista blanca
app.get("/", (req, res) => {
// app.get('/', cors(corsOptions), (req,res) => {
  // res.json(listaBlanca);
  res.json({ message: "Bienvenido a la aplicación de Juan"});
})

//incluir el ruteo de la tabla tutoriales
require("./routes/tutorial.routes")(app);
// require("./routes/empleado.routes")(app);


//colocar puerto, escuchar solicitudes
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}.`);
});

//constante que importa los modelos y su conexion con la db
const db = require("./models");

db.sequelize.sync()
  .then(() => {
    console.log("base de datos sincrinizada.");
  })
  .catch((err) => {
    console.log("Error al conectar a la base de datos: " + err.message);
  });

//solo en productiva importar constructor sequelize y agregarle la funcion sincronizar();, ademas que elimina las tablas y volver a sincronizar
// db.sequelize.sync({ force:true }).then(() =>{
//     console.log("Borrar y re sincronizar db");
// });
