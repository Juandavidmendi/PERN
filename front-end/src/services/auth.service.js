import http from "../http-common";

class servicioAutenticacion {
    login(username, password){
        return http.post( "/auth/signin", {
            username,
            password
        })
        .then(response => {
            if(response.data.acessToken){
                //se crea una variable en el localStorage llamada user
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    logout(){
        //eliminamos la variable del localStorage user 
        localStorage.removeItem("user");
    }

    register(username, email, password){
        return http.post("/auth/signup", {
            username,
            email,
            password
        });
    }


    getCurrentUser(){
        //retorneme un json con el objeto usuario y su respectiva informacion
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new servicioAutenticacion();