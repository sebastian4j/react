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
      <div className='App'>
        <Search
          valor={busca}
          cambio={this.busqueda}
        >
          <h1>Texto </h1>
        </Search>
        <Table
          list={listado}
          pattern={busca}
          quitar={this.quitar}
        />
        {this.state.inicio.toISOString()}
      </div>
    );
  }
}

class Button extends Component {
  render() {
    // clase tiene '' por defecto y no undefined
    const { click, clase = '', children } = this.props;
    return (
      <button className={clase} onClick={click}>
        {children}
      </button>
    );
  }
}

// ******************************
// Functional Stateless Components
// ******************************
// recibe las propiedades 
// no guarda estado (no hay this)
// no tiene eventos del ciclo de vida

/** 
// opcion 1sin usar destructuring
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
// usando destructuring
function Search({ valor, cambio, children }) {
  return (
    <form>
      {children}
      <input type='text' value={valor} onChange={cambio} />
    </form>
  );
}
**/

const Search = ({ valor, cambio, children }) =>
  // si es necesario se puede agregar {...} para tener mas operaciones y no solo input-output
  // {return ( 
  <form>
    {children}
    <input type='text' value={valor} onChange={cambio} />
  </form>
// )}
class Table extends Component {
  filtrar(searchTerm) {
    return function (item) {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
  }
  render() {
    const { list, pattern, quitar } = this.props;
    return (
      <div>
        {list.filter(this.filtrar(pattern)).map(item =>
          <div key={item.objectID}>
            <div>url: {item.url}</div>
            <div>autor: {item.author}</div>
            <div>titulo: {item.title}</div>
            <div>
              <Button click={() => quitar(item.objectID)}>Quitar</Button>
            </div>
          </div>
        )}
      </div>
    );
  };
}
export default App;
