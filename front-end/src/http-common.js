// se importa el modulo que va a contener la url de la api en este caso la api esta en el puerto 8080
import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
});
