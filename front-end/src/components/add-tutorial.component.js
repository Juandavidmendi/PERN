import React, { Component } from 'react';
//importar el data service que contiene las peticiones al api
import TutorialDataService from '../services/tutorial.service';

export default class addTutorial extends Component {
    constructor(props){
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveTutorial = this.saveTutorial.bind(this);
        this.newTutorial = this.newTutorial.bind(this);

        //se tiene una funcion para obtener el valor del formulario
        //objteto con los campos a enviar a la api
        this.state = {
            id: null,
            title: "",
            description: "",
            published: false,

            submitted: false
        };
    }


    //funciones que empujan datos al objeto state
    onChangeTitle(e){
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });        
    }

    saveTutorial(){
        var data = {
            title: this.state.title,
            description: this.state.description
        };

        TutorialDataService.create(data)
        .then(response =>{
            this.setState({
                id: response.data.id,
                title: response.data.title,
                description: response.data.description,
                published: response.data.published,

                submitted: true
            });
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    }

    newTutorial(){
        this.setState({
            id: null,
            title: "",
            description: "",
            published: false,

            submitted: false
        });
    }

    //validacion en render verificando el estado submitted
    render(){
        //...
        return(
            <div className="submit-form">
            {this.state.submitted? (
                <div>
                    <h4>Se envio con exito</h4>
                    <button className='btn btn-success' onClick={this.newTutorial}>
                        Añadir
                    </button>
                </div>
            ) : (
                <div>
                    <div className='form-group'>
                        <label htmlFor='title'>Titulo</label>
                        <input 
                            type="text"
                            className="form-control"
                            id='title'
                            required
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                            name="title"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            name="description"
                        />
                    </div>
                    <button onClick={this.saveTutorial} className="btn btn-success">
                        Enviar
                    </button>
                </div>
            )}
            </div>
        );
    }
}
