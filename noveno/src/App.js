import React, { Component } from 'react';
import './App.css';

// https://reactjs.org/docs/state-and-lifecycle.html
// https://reactjs.org/docs/handling-events.html

const listado = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/d',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 1,
  },
  {
    title: 'tcaer',
    url: 'https://google.cl/e',
    author: 'otro autor',
    num_comments: 3,
    points: 4,
    objectID: 0,
  }
];

// ES6 Class Components
class App extends Component {
  constructor(props) { // obligatorio porque extiende Component
    super(props);
    this.state = { // cada vez que se cambia el estado render es lanzado
      listado,
      inicio: new Date(),
      busca: ''
    };
    // es necesario porque no es automatico el binding this con la instancia de la clase
    this.quitar = this.quitar.bind(this);
    this.busqueda = this.busqueda.bind(this);
  }

  quitar(id) {
    // con filter obtiene una nueva lista inmutable (que es lo que le agregada a react...), no cambia la actual
    this.setState({ listado: this.state.listado.filter(item => item.objectID !== id) });
  }

  componentDidMount() { // luego de ser renderizado en el DOM
    console.log('post renderizado');
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
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
          list={listado}
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
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
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

const Table = ({ list, pattern, quitar }) =>
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
