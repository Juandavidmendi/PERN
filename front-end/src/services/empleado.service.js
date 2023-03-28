//servicio para acceder a los datos.
import authHeader from "./auth-header";
import http from "../http-common";

class EmpleadoService {
    obtenerTodosLosEmpleados(){
        return http.get('/empleados/', { headers: authHeader() })
    }
    // router.get("/", [authJwt.verificarToken],  empleado.buscaTodosLosEmpleados);
    
    obtenerContenidoPublico(){
        return http.get('/empleados/all');
    }
   
    obtenerEmpleadoPorId(id){
        return http.get(`/empleados/${id}`, { headers: authHeader() });
    }
    
    crearEmpleado(data){
        return http.post('/empleados/', data, { headers: authHeader() });
    }

    actualizarEmpleado(id, data){
        return http.put(`/empleados/${id}`, data, { headers: authHeader() });
    }
}

export default new EmpleadoService();
