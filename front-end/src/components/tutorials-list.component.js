

// export default class TutorialsList extends Component {

//     // constructor que va ligado a la vista 
//     constructor(props){
//         super(props);
//         this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
//         this.retrieveTutorials = this.retrieveTutorials.bind(this);
//         this.refreshList = this.refreshList.bind(this);
//         this.setActiveTutorial = this.setActiveTutorial.bind(this);
//         this.removeAllTutorials = this.removeAllTutorials.bind(this);
//         this.searcTitle = this.searcTitle.bind(this);
        
//         //objeto state inicializado por defecto
//         this.state = {
//             tutorials: [],
//             currentTutorial: null,
//             currentIndex: -1,
//             searchTitle: ""
//         };
//     }

//     componentDidMount() {
//         this.retrieveTutorials();
//     }

//     //funcion que escucha el valor del input de busqueda
//     onChangeSearchTitle(e){
//         const searchTitle = e.target.value;

//         //coloca el dato en el objeto state
//         this.setState({
//             searchTitle: searchTitle
//         });
//     }

//     //recibir tutoriales
//     retrieveTutorials() {
//         TutorialDataService.getAll()
//         .then(response =>{
//             this.setState({
//                 tutorials: response.data
//             });
//         })
//         .catch(e => {
//             console.log(e);
//         });
//     }

//     //refrescar lista
//     refreshList() {
//         this.retrieveTutorials();
//         this.setState({
//             currentTutorial: null,
//             currentIndex: -1
//         });
//     }


//     //borrar todos los tutoriales
//     removeAllTutorials(){
//         TutorialDataService.deleteAll()
//         .then(response => {
//             console.log(response.data);
//             this.refreshList();
//         })
//         .catch(e => {
//             console.log(e);
//         });
//     }


//--
import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  //refrescar lista
  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }
  //cambiar estado a tutorial
  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  //borrar todos los tutoriales
  removeAllTutorials() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  //buscar por titulo
  searchTitle() {
    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por titulo"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista de tutoriales</h4>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Borrarlos todos
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Titulo:</strong>
                </label>{" "}
                {currentTutorial.title}
              </div>
              <div>
                <label>
                  <strong>Descripcion:</strong>
                </label>{" "}
                {currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Estado:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Por favor selecciona un tutorial...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}