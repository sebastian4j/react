import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

// https://reactjs.org/docs/state-and-lifecycle.html
// https://reactjs.org/docs/handling-events.html

// ES6 Class Components
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { // cada vez que se cambia el estado (setState) render es lanzado
      result: null,
      listado: [],
      inicio: new Date(),
      busca: DEFAULT_QUERY
    };
    // es necesario porque no es automatico el binding this con la instancia de la clase
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.quitar = this.quitar.bind(this);
    this.busqueda = this.busqueda.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    const { busca } = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${busca}`)
      .then(response => response.json()) // sacar el json es obligatorio con el native fetch al tratar con json
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }
  setSearchTopStories(result) {
    console.log(result);
    this.setState({ listado: result });
  }

  quitar(id) {
    console.log(id);
    // con filter obtiene una nueva lista inmutable (que es lo que le agregada a react...), no cambia la actual
    const listadoActual = this.state.listado;
    listadoActual.hits = this.state.listado.hits.filter(item => item.objectID !== id);

    this.setState({ listado: listadoActual });
  }


  componentWillUnmount() { // se elimina
    console.log('eliminado');
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ inicio: new Date() });
  }

  // synthetic React event
  busqueda(evento) {
    const busca = evento.target.value;
    this.setState({ busca });
    console.log(busca)
  }

  // cada vez que el estado cambia se invoca
  render() {
    const { listado, busca } = this.state; // destructured, similar a: var listado = this.state.listado;
    if (!listado) { return null; }
    return (
      <div className='page'>
        <div className='interactions'>
          <Search
            valor={busca}
            cambio={this.busqueda}>
            <h1>Texto </h1>
          </Search>
        </div >
        <Table
          list={listado.hits}
          pattern={busca}
          quitar={this.quitar}
        />
        {this.state.inicio.toISOString()}
      </div >
    );
  }
}


// ******************************
// Functional Stateless Components
// ******************************
// recibe las propiedades 
// no guarda estado (no hay this)
// no tiene eventos del ciclo de vida

// clase tiene '' por defecto y no undefined
const Button = ({ click, clase = '', children }) =>
  <button className={clase} onClick={click}>
    {children}
  </button>

/** 
// opcion 1: sin usar destructuring
function Search (props) {
  const { valor, cambio, children } = props; // tiene todas las propiedades que se le pasan al componente
  return (
    <form>
      {children}
      <input type='text' value={valor} onChange={cambio} />
    </form>
  );
}
**/

/**
// opcion 2: usando destructuring
function Search({ valor, cambio, children }) {
  return (
    <form>
      {children}
      <input type='text' value={valor} onChange={cambio} />
    </form>
  );
**/
// opciona 3: arrow
const Search = ({ valor, cambio, children }) =>
  // si es necesario se puede agregar {...} para tener mas operaciones y no solo input-output
  // {return ( 
  <form>
    {children}
    <input type='text' value={valor} onChange={cambio} />
  </form>
// )}
// ******************************
// ******************************

function filtrar(searchTerm) {
  return function (item) {
    return item.title ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) : false;
  }
}

const largeColumn = {
  width: '40%',
};
const midColumn = {
  width: '30%',
};
const smallColumn = {
  width: '10%',
};

const Table = ({ list = [], pattern, quitar }) =>
  <div className='table'>
    {list.filter(filtrar(pattern)).map(item =>
      <div key={item.objectID} className='table-row'>
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}>
          {item.author}
        </span>
        <span style={smallColumn}>
          {item.num_comments}
        </span>
        <span style={smallColumn}>
          {item.points}
        </span>
        <span style={smallColumn}>
          <Button click={() => quitar(item.objectID)} clase='button-inline'>Quitar</Button>
        </span>
      </div>
    )}
  </div>

export default App;
