import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";//servicio de autenticacion

import { withRouter } from "../common/with-router"; //pendiente por estudiar

const required = value => {
    if(!value){
        return(
            <div className="alert alert-danger" role={alert}>
                Este campo es requerido!
            </div>
        );
    }
};

class Login extends Component{
    constructor(props){
        super(props);
        //los campos se validan asi mismos 
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        //Declaramos un objeto vacio
        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeUsername(e){
        //empuje el valor del nombre de usuario cada vez que lo escriban
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e){
        //empuja el valor de la contraseña cada vez que la escriban
        this.setState({
            password: e.target.value
        });
    }

    //validar login
    handleLogin(e){
        //cancele la funcion por defecto del formulario submit
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });


        //funcion para que haga todas las validaciones
        this.form.validateAll();

        //si no hay errores llame al servicio de autenticacion y a la funcion login pasandole los parametros del arreglo state
        if(this.checkBtn.context._errors.length === 0){
            AuthService.login(this.state.username, this.state.password)
            .then(
                //segun la respuesta
                () => {
                    this.props.router.navigate("/home");
                    window.location.reload();
                },
                error => {
                    //validacion en unan constante // (si cumple esta condicion) pasa (sino) entrar al ||
                    const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    this.set({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        }else{
            this.set({
                loading: false,
            });
        }
    }


    //funcion render
    render(){
        return(
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <Form
                        onSubmit={this.handleLogin}
                        ref={c => {
                        this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="username">Nombre de usuario</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">contraseña</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                            >
                            {/* si el estado es loading muestre un gift de carga */}
                            {this.state.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                                <span>Login</span>
                            </button>
                        </div>
                        
                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        {/* este ceckbox solo es un input para nosotros validar */}
                        <CheckButton
                            style={{ display: "none"}}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                        
                    </Form>
                </div>
            </div>
        
        // fin return
        );
    }
}

export default withRouter(Login);



