//este componente obtiene muestra la response del api el cual es un objeto con los datos del usuario y el token
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        //Declaramos el objeto state 
        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { username: "" }
        };
    }

    componentDidMount() {
        //usuario actual
        const currentUser = AuthService.getCurrentUser();

        //si no hay usuario actual
        if (!currentUser) this.setState({ 
            redirect: "/home" 
        });
        //de lo contrario
        this.setState({ 
            currentUser: currentUser, 
            userReady: true 
        })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }

        const { currentUser } = this.state;

        return (
            <div className="container">
                {(this.state.userReady) ?
                <div>
                    <header className="jumbotron">
                        <h3>
                            Perfil de  <strong>{currentUser.username}</strong> 
                        </h3>
                    </header>
                    <p>
                    {/* <strong>Token:</strong>{""}
                    {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)} */}
                    </p>
                    <p>
                        <strong>Id:</strong>{" "}
                        {currentUser.id}
                    </p>
                    <p>
                        <strong>Email:</strong>{" "}
                        {currentUser.email}
                    </p>
                    <strong>Authorities:</strong>
                    <ul>
                        {currentUser.roles &&
                        currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                    </ul>
                </div>: null}
            </div>
        );
    }
}